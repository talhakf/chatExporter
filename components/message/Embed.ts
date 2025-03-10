import { convertMessageContent } from "../utils";

interface EmbedProps {
    embed: any;
    mentions: any[];
}

const renderMediaEmbed = (embed: any) => {
    if (embed.video) {
        return `
            <div class="embed-media">
                ${embed.thumbnail 
                    ? `<img class="embed-thumbnail" src="${embed.thumbnail.url}" alt="video thumbnail" loading="lazy" />`
                    : ''
                }
                <a href="${embed.url}" class="embed-video-link" target="_blank">
                    <div class="embed-video-play">
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                </a>
            </div>`;
    }
    
    if (embed.type === "gifv" || (embed.url && embed.url.includes(".gif"))) {
        return `
            <div class="embed-media">
                <img class="embed-gif" src="${embed.url}" alt="gif" loading="lazy" />
            </div>`;
    }
    
    if (embed.image) {
        return `
            <div class="embed-media">
                <img class="embed-image" src="${embed.image.url}" alt="embed" loading="lazy" />
            </div>`;
    }
    
    return '';
};

export const renderEmbed = ({ embed, mentions }: EmbedProps) => {
    const colorStyle = embed.color ? `style="--embed-color-pill: #${embed.color.toString(16).padStart(6, '0')};"` : '';
    
    return `
        <div class="embed" ${colorStyle}>
            ${embed.url && embed.title 
                ? `<div class="embed-title"><a href="${embed.url}" target="_blank">${embed.title}</a></div>`
                : embed.title 
                    ? `<div class="embed-title">${embed.title}</div>`
                    : ''
            }
            ${embed.description 
                ? `<div class="embed-description">${convertMessageContent(embed.description, mentions)}</div>`
                : ''
            }
            ${renderMediaEmbed(embed)}
        </div>
    `;
};

export const renderEmbeds = (embeds: any[], mentions: any[]) => {
    if (!embeds?.length) return '';
    
    return `
        <div class="attachments">
            ${embeds.map(embed => renderEmbed({ embed, mentions })).join("")}
        </div>
    `;
}; 