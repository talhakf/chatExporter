import { findByPropsLazy } from "@webpack";
import { ChannelStore, FluxDispatcher, MessageStore, UserStore } from "@webpack/common";
import { Logger } from "@utils/Logger";
import { ExportOptions } from "../types";
import { downloadFile } from "../utils/fileUtils";
import { generateHtmlContent } from "../components/HtmlExport";

const logger = new Logger("ChatExporter");
const RestAPI = findByPropsLazy("get", "post", "put", "patch", "delete");
const TokenModule = findByPropsLazy("getToken");

const isMessageWithinDateRange = (timestamp: string, dateRange: string): boolean => {
    if (dateRange === "all") return true;
    
    const now = new Date();
    const messageTime = new Date(timestamp).getTime();
    const timeDiff = now.getTime() - messageTime;
    
    switch (dateRange) {
        case "day":
            return timeDiff < 86400000; // 24 hours
        case "week":
            return timeDiff < 604800000; // 7 days
        case "month":
            return timeDiff < 2592000000; // 30 days
        default:
            return true;
    }
};

export const exportChat = async (channelId: string, options: ExportOptions) => {
    logger.info("Starting chat export with options:", { channelId, options });
    try {
        const channel = ChannelStore.getChannel(channelId);
        
        if (!channel) {
            logger.error("Channel not found:", channelId);
            return;
        }

        let retryCount = 0;
        let messages;
        
        while (retryCount < 3) {
            try {
                FluxDispatcher.dispatch({
                    type: "LOAD_MESSAGES",
                    channelId: channelId,
                    jump: undefined,
                    limit: 50
                });

                await new Promise(resolve => setTimeout(resolve, 1000));
                
                messages = MessageStore.getMessages(channelId);
                if (messages?.toArray()?.length > 0) {
                    logger.info(`Successfully loaded ${messages.toArray().length} initial messages`);
                    break;
                }
                
                logger.warn("No messages loaded, retrying...");
                retryCount++;
            } catch (error) {
                logger.error("Error pre-loading messages:", error);
                retryCount++;
            }
        }

        if (!messages?.toArray()?.length) {
            logger.error("Failed to load any messages after retries");
            return;
        }
        
        logger.info("Loading full message history...");
        try {
            const initialRes = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages?limit=50`, {
                headers: {
                    "Authorization": TokenModule.getToken()
                }
            });

            if (!initialRes.ok) {
                logger.error(`Failed to get initial messages: ${initialRes.status} ${initialRes.statusText}`);
                return;
            }

            const initialData = await initialRes.json();
            if (!Array.isArray(initialData) || !initialData.length) {
                logger.error("No messages found in channel");
                return;
            }

            let allMessages = initialData;
            let lastMessageId = initialData[initialData.length - 1]?.id;
            let totalFetched = initialData.length;
            let consecutiveEmptyResponses = 0;
            let reachedDateLimit = false;
            
            logger.info(`Loaded initial ${totalFetched} messages starting from newest`);
            
            while (lastMessageId && consecutiveEmptyResponses < 3 && !reachedDateLimit) {
                logger.info(`Fetching messages before ${lastMessageId}...`);
                
                try {
                    const endpoint = `https://discord.com/api/v9/channels/${channelId}/messages?before=${lastMessageId}&limit=50`;
                    logger.info(`Making request to: ${endpoint}`);
                    
                    const res = await fetch(endpoint, {
                        headers: {
                            "Authorization": TokenModule.getToken()
                        }
                    });

                    if (!res.ok) {
                        logger.error(`HTTP Error: ${res.status} ${res.statusText}`);
                        consecutiveEmptyResponses++;
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        continue;
                    }

                    const data = await res.json();
                    const olderMessages = Array.isArray(data) ? data : [];
                    logger.info(`Received ${olderMessages.length} messages in response`);

                    if (!olderMessages.length) {
                        consecutiveEmptyResponses++;
                        logger.warn(`No messages found in batch, attempt ${consecutiveEmptyResponses}/3`);
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        continue;
                    }

                    consecutiveEmptyResponses = 0;
                    
                    const processedMessages = olderMessages.map(msg => {
                        // Log each message object
                        // console.log("Message Object:", JSON.stringify(msg, null, 2));
                        
                        MessageStore.getMessages(channelId).receiveMessage(msg);
                        
                        if (msg.messageReference) {
                            const reference = MessageStore.getMessage(
                                msg.messageReference.channel_id,
                                msg.messageReference.message_id
                            );
                            if (reference) {
                                MessageStore.getMessages(channelId).receiveMessage(reference);
                            }
                        }
                        
                        return MessageStore.getMessage(channelId, msg.id) || msg;
                    });

                    if (options.dateRange !== "all") {
                        const oldestMessageInBatch = olderMessages[olderMessages.length - 1];
                        if (!isMessageWithinDateRange(oldestMessageInBatch.timestamp, options.dateRange)) {
                            logger.info("Reached messages outside date range, stopping fetch");
                            reachedDateLimit = true;
                            // only add msg that are within date range
                            const withinRange = processedMessages.filter(msg => 
                                isMessageWithinDateRange(msg.timestamp, options.dateRange)
                            );
                            allMessages = [...allMessages, ...withinRange];
                            break;
                        }
                    }

                    allMessages = [...allMessages, ...processedMessages];
                    lastMessageId = olderMessages[olderMessages.length - 1]?.id;
                    totalFetched += processedMessages.length;
                    
                    await new Promise(resolve => setTimeout(resolve, 250));
                } catch (fetchError) {
                    logger.error("Error fetching messages:", fetchError);
                    consecutiveEmptyResponses++;
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
            
            messages = { toArray: () => allMessages };
            logger.info(`Finished loading ${allMessages.length} total messages`);
        } catch (error) {
            logger.error("Error loading full history:", error);
        }

        let filteredMessages = messages.toArray();
        logger.info("Initial message count:", filteredMessages.length);

        // in case some older messages were loaded during initial load
        filteredMessages = filteredMessages.filter(m => isMessageWithinDateRange(m.timestamp, options.dateRange));
        filteredMessages = filteredMessages.reverse();
        
        logger.info("Filtered message count:", filteredMessages.length);

        const fileName = `discord-chat-${channel.name}-${new Date().toISOString().split("T")[0]}`;

        switch (options.format) {
            case "txt":
                const textContent = filteredMessages
                    .map(m => {
                        const user = UserStore.getUser(m.author.id) || m.author;
                        const timestamp = new Date(m.timestamp).toLocaleString();
                        let messageText = `[${timestamp}] ${user.username}: ${m.content}`;
                        
                        if (m.messageReference) {
                            const reference = MessageStore.getMessage(
                                m.messageReference.channel_id,
                                m.messageReference.message_id
                            );
                            
                            if (reference) {
                                const replyUser = UserStore.getUser(reference.author.id) || reference.author;
                                messageText = `[${timestamp}] ${user.username} (replying to ${replyUser.username}): ${m.content}`;
                            }
                        }
                        return messageText;
                    })
                    .join("\n");
                downloadFile(textContent, `${fileName}.txt`, "text/plain");
                break;

            case "json":
                const jsonContent = JSON.stringify(
                    filteredMessages.map(m => {
                        const messageData = {
                            author: {
                                id: m.author.id,
                                username: UserStore.getUser(m.author.id)?.username || m.author.username
                            },
                            content: m.content,
                            timestamp: m.timestamp,
                            attachments: options.includeImages ? m.attachments : [],
                            reactions: m.reactions || [],
                            sticker_items: m.sticker_items || []
                        };

                        if (m.messageReference) {
                            const reference = MessageStore.getMessage(
                                m.messageReference.channel_id,
                                m.messageReference.message_id
                            );
                            
                            if (reference) {
                                messageData["replyTo"] = {
                                    messageId: reference.id,
                                    content: reference.content,
                                    author: {
                                        id: reference.author.id,
                                        username: UserStore.getUser(reference.author.id)?.username || reference.author.username
                                    }
                                };
                            }
                        }
                        return messageData;
                    }),
                    null,
                    2
                );
                downloadFile(jsonContent, `${fileName}.json`, "application/json");
                break;

            case "html":
                const htmlContent = generateHtmlContent(channel, filteredMessages, options);
                downloadFile(htmlContent, `${fileName}.html`, "text/html");
                break;
        }
    } catch (error) {
        logger.error("Error during export:", error);
    }
}; 