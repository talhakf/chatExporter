import { UserStore } from "@webpack/common";
import { Message } from "discord-types/general";
import { ExportOptions } from "../types";

export const generateHtmlContent = (channel: any, filteredMessages: Message[], options: ExportOptions) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Discord Chat Export - ${channel.name}</title>
            <style>
                :root {
                    --background-primary: #313338;
                    --background-secondary: #2B2D31;
                    --background-tertiary: #1E1F22;
                    --text-normal: #F2F3F5;
                    --text-muted: #949BA4;
                    --text-link: #00A8FC;
                    --header-primary: #F2F3F5;
                    --interactive-normal: #B5BAC1;
                    --channeltextarea-background: #383A40;
                    --brand-experiment: #5865F2;
                    --font-primary: "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
                }
                
                body {
                    font-family: var(--font-primary);
                    background: var(--background-primary);
                    color: var(--text-normal);
                    margin: 0;
                    padding: 0;
                    line-height: 1.4;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .header {
                    background: var(--background-tertiary);
                    padding: 16px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                }

                .header h1 {
                    color: var(--header-primary);
                    font-size: 20px;
                    margin: 0;
                }

                .chat {
                    padding: 16px;
                    background: var(--background-primary);
                }

                .message {
                    display: flex;
                    padding: 8px 0;
                    margin: 0;
                    position: relative;
                }

                .message:hover {
                    background: var(--background-secondary);
                }

                .avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 16px;
                    flex-shrink: 0;
                }

                .message-content {
                    flex-grow: 1;
                    min-width: 0;
                }

                .message-header {
                    display: flex;
                    align-items: baseline;
                    margin-bottom: 4px;
                }

                .username {
                    color: var(--header-primary);
                    font-size: 1rem;
                    font-weight: 500;
                    margin-right: 8px;
                }

                .timestamp {
                    color: var(--text-muted);
                    font-size: 0.75rem;
                }

                .content {
                    color: var(--text-normal);
                    font-size: 1rem;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                }

                .attachments {
                    margin-top: 8px;
                    display: grid;
                    grid-gap: 4px;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                }

                .attachments img {
                    max-width: 100%;
                    max-height: 350px;
                    border-radius: 4px;
                    object-fit: contain;
                }

                .system-message {
                    color: var(--text-muted);
                    font-style: italic;
                    padding: 8px 0;
                }

                .embed {
                    margin-top: 8px;
                    padding: 8px 16px;
                    background: var(--background-secondary);
                    border-left: 4px solid var(--brand-experiment);
                    border-radius: 4px;
                }

                .reply-container {
                    display: flex;
                    align-items: center;
                    margin-bottom: 4px;
                    padding: 2px 8px;
                    background-color: var(--background-secondary);
                    border-radius: 4px;
                    max-width: fit-content;
                    border: 2px solid #5865F2;
                }

                .reply-avatar {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    margin-right: 4px;
                    flex-shrink: 0;
                }

                .reply-username {
                    color: var(--header-primary);
                    font-weight: 500;
                    margin-right: 4px;
                    font-style: normal;
                }

                .reply-content {
                    color: var(--text-muted);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 300px;
                    font-style: normal;
                }

                .reply-icon {
                    width: 16px;
                    height: 16px;
                    margin-right: 4px;
                    transform: scaleX(-1);
                    flex-shrink: 0;
                    color: var(--text-muted);
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Chat Export: ${channel.name}</h1>
            </div>
            <div class="container">
                <div class="chat">
                    ${filteredMessages.map(m => {
                        const user = UserStore.getUser(m.author.id) || m.author;
                        const timestamp = new Date(m.timestamp);
                        const timeString = timestamp.toLocaleString();
                        const avatarUrl = user.avatar 
                            ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=80`
                            : `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator || 0) % 5}.png`;

                        if (m.type !== 0 && m.type !== 19) {
                            return `
                                <div class="system-message">
                                    ${m.content}
                                </div>
                            `;
                        }

                        let replyHtml = '';
                        if (m.messageReference || m.type === 19) {
                            const referencedMessage = m.referenced_message || MessageStore.getMessage(
                                m.messageReference?.channel_id,
                                m.messageReference?.message_id
                            );
                            
                            if (referencedMessage) {
                                const replyUser = UserStore.getUser(referencedMessage.author.id) || referencedMessage.author;
                                const replyAvatarUrl = replyUser.avatar
                                    ? `https://cdn.discordapp.com/avatars/${replyUser.id}/${replyUser.avatar}.webp?size=16`
                                    : `https://cdn.discordapp.com/embed/avatars/${Number(replyUser.discriminator || 0) % 5}.png`;
                                
                                replyHtml = `
                                    <div class="reply-container">
                                        <svg class="reply-icon" aria-hidden="true" role="img" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M3.8 8.12L3.47 7.8a.5.5 0 0 1 0-.71l4.24-4.24a.5.5 0 0 1 .71 0l.32.32a.5.5 0 0 1 0 .71L5.1 7.5h9.46a.5.5 0 0 1 .5.5v.45a.5.5 0 0 1-.5.5H5.1l3.64 3.64a.5.5 0 0 1 0 .71l-.32.32a.5.5 0 0 1-.71 0L3.47 9.38a.5.5 0 0 1 0-.71l.33-.33-.33.33.33-.33z"/>
                                        </svg>
                                        <img class="reply-avatar" src="${replyAvatarUrl}" alt="${replyUser.username}" />
                                        <span class="reply-username">${replyUser.username}</span>
                                        <span class="reply-content">${referencedMessage.content || "[No message content]"}</span>
                                    </div>
                                `;
                            } else {
                                replyHtml = `
                                    <div class="reply-container">
                                        <svg class="reply-icon" aria-hidden="true" role="img" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M3.8 8.12L3.47 7.8a.5.5 0 0 1 0-.71l4.24-4.24a.5.5 0 0 1 .71 0l.32.32a.5.5 0 0 1 0 .71L5.1 7.5h9.46a.5.5 0 0 1 .5.5v.45a.5.5 0 0 1-.5.5H5.1l3.64 3.64a.5.5 0 0 1 0 .71l-.32.32a.5.5 0 0 1-.71 0L3.47 9.38a.5.5 0 0 1 0-.71l.33-.33-.33.33.33-.33z"/>
                                        </svg>
                                        <span class="reply-username">Unknown User</span>
                                        <span class="reply-content">[Message could not be loaded]</span>
                                    </div>
                                `;
                            }
                        }

                        const attachments = options.includeImages && m.attachments
                            ? `
                                <div class="attachments">
                                    ${m.attachments.map(a => {
                                        if (a.content_type?.startsWith('image/')) {
                                            return `<img src="${a.url}" alt="attachment" loading="lazy" />`;
                                        } else {
                                            return `<div class="embed">
                                                <a href="${a.url}" target="_blank">${a.filename}</a>
                                                (${(a.size / 1024 / 1024).toFixed(2)} MB)
                                            </div>`;
                                        }
                                    }).join("")}
                                </div>
                            `
                            : "";

                        const embeds = m.embeds?.length
                            ? `
                                <div class="attachments">
                                    ${m.embeds.map(embed => `
                                        <div class="embed">
                                            ${embed.title ? `<strong>${embed.title}</strong><br>` : ''}
                                            ${embed.description || ''}
                                            ${embed.image ? `<img src="${embed.image.url}" alt="embed" loading="lazy" />` : ''}
                                        </div>
                                    `).join("")}
                                </div>
                            `
                            : "";

                        return `
                            <div class="message">
                                <img class="avatar" src="${avatarUrl}" alt="${user.username}" loading="lazy" />
                                <div class="message-content">
                                    <div class="message-header">
                                        <span class="username">${user.username}</span>
                                        <span class="timestamp">${timeString}</span>
                                    </div>
                                    ${replyHtml}
                                    <div class="content">${m.content}</div>
                                    ${attachments}
                                    ${embeds}
                                </div>
                            </div>
                        `;
                    }).join("")}
                </div>
            </div>
        </body>
        </html>
    `;
}; 