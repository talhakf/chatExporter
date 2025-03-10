import { UserStore } from "@webpack/common";
import { convertMessageContent, getAvatarUrl, formatTimestamp } from "../utils";
import { renderAttachments, renderStickers } from "./Attachments";
import { renderEmbeds } from "./Embed";

interface ReplyProps {
    message: any;
}

const renderReply = ({ message }: ReplyProps) => {
    if (!message.messageReference && message.type !== 19) return '';

    const referencedMessage = message.referenced_message || null;
    
    if (referencedMessage) {
        const replyUser = UserStore.getUser(referencedMessage.author.id) || referencedMessage.author;
        const replyAvatarUrl = getAvatarUrl(replyUser);
        
        return `
            <div class="reply-container">
                <svg class="reply-icon" aria-hidden="true" role="img" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M3.8 8.12L3.47 7.8a.5.5 0 0 1 0-.71l4.24-4.24a.5.5 0 0 1 .71 0l.32.32a.5.5 0 0 1 0 .71L5.1 7.5h9.46a.5.5 0 0 1 .5.5v.45a.5.5 0 0 1-.5.5H5.1l3.64 3.64a.5.5 0 0 1 0 .71l-.32.32a.5.5 0 0 1-.71 0L3.47 9.38a.5.5 0 0 1 0-.71l.33-.33-.33.33.33-.33z"/>
                </svg>
                <img class="reply-avatar" src="${replyAvatarUrl}" alt="${replyUser.username}" />
                <span class="reply-username">${replyUser.username}</span>
                <span class="reply-content">${referencedMessage.content || "[No message content]"}</span>
            </div>
        `;
    }

    return `
        <div class="reply-container">
            <svg class="reply-icon" aria-hidden="true" role="img" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3.8 8.12L3.47 7.8a.5.5 0 0 1 0-.71l4.24-4.24a.5.5 0 0 1 .71 0l.32.32a.5.5 0 0 1 0 .71L5.1 7.5h9.46a.5.5 0 0 1 .5.5v.45a.5.5 0 0 1-.5.5H5.1l3.64 3.64a.5.5 0 0 1 0 .71l-.32.32a.5.5 0 0 1-.71 0L3.47 9.38a.5.5 0 0 1 0-.71l.33-.33-.33.33.33-.33z"/>
            </svg>
            <span class="reply-username">Unknown User</span>
            <span class="reply-content">[Message could not be loaded]</span>
        </div>
    `;
};

interface ReactionsProps {
    reactions: any[];
}

const renderReactions = ({ reactions }: ReactionsProps) => {
    if (!reactions?.length) return '';

    return `
        <div class="reactions">
            ${reactions.map(reaction => {
                let emojiHtml = reaction.emoji.id 
                    ? `<img class="reaction-emoji" src="https://cdn.discordapp.com/emojis/${reaction.emoji.id}.webp?size=48" alt="${reaction.emoji.name}" title="${reaction.emoji.name}" />`
                    : `<span class="reaction-emoji">${reaction.emoji.name}</span>`;
                
                return `
                    <div class="reaction">
                        ${emojiHtml}
                        <span class="reaction-count">${reaction.count}</span>
                    </div>
                `;
            }).join("")}
        </div>
    `;
};

interface MessageContentProps {
    message: any;
    options: any;
}

export const renderMessage = ({ message, options }: MessageContentProps) => {
    const user = UserStore.getUser(message.author.id) || message.author;
    const avatarUrl = getAvatarUrl(user);
    const timeString = formatTimestamp(message.timestamp);

    return `
        <div class="message">
            <img class="avatar" src="${avatarUrl}" alt="${user.username}" loading="lazy" />
            <div class="message-content">
                <div class="message-header">
                    <span class="username">${user.username}</span>
                    <span class="timestamp">${timeString}</span>
                </div>
                ${renderReply({ message })}
                <div class="content">${convertMessageContent(message.content, message.mentions)}</div>
                ${renderStickers({ stickers: message.sticker_items || [] })}
                ${renderReactions({ reactions: message.reactions || [] })}
                ${renderAttachments({ attachments: message.attachments || [], includeImages: options.includeImages })}
                ${renderEmbeds(message.embeds || [], message.mentions)}
            </div>
        </div>
    `;
}; 