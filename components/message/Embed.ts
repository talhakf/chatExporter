import { convertMessageContent } from "../utils";

interface EmbedProps {
    embed: any;
    mentions: any[];
}

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
            ${embed.image
                ? `<img class="embed-image" src="${embed.image.url}" alt="embed" loading="lazy" />`
                : ''
            }
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