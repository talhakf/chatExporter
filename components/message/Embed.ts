import { convertMessageContent } from "../utils";

interface EmbedProps {
    embed: any;
    mentions: any[];
}

const renderFields = (fields: any[]) => {
    if (!fields?.length) return '';

    const fieldRows = fields.reduce((rows: any[][], field: any, index: number) => {
        const lastRow = rows[rows.length - 1];
        
        if (!lastRow || (!field.inline || lastRow.length === 3)) {
            rows.push([field]);
        } else {
            lastRow.push(field);
        }
        
        return rows;
    }, []);

    return `
        <div class="embed-fields">
            ${fieldRows.map(row => `
                <div class="embed-field-row">
                    ${row.map(field => `
                        <div class="embed-field ${field.inline ? 'inline' : ''}">
                            ${field.name ? `<div class="embed-field-name">${convertMessageContent(field.name, [])}</div>` : ''}
                            ${field.value ? `<div class="embed-field-value">${convertMessageContent(field.value, [])}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            `).join('')}
        </div>
    `;
};

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

const renderThumbnail = (thumbnail: any) => {
    if (!thumbnail?.url) return '';
    
    return `
        <div class="embed-thumbnail-container">
            <img class="embed-thumbnail" src="${thumbnail.url}" alt="thumbnail" loading="lazy" />
        </div>
    `;
};

const renderFooter = (footer: any, timestamp?: string) => {
    if (!footer && !timestamp) return '';
    
    return `
        <div class="embed-footer">
            ${footer?.icon_url ? `<img class="embed-footer-icon" src="${footer.icon_url}" alt="footer icon" loading="lazy" />` : ''}
            <span class="embed-footer-text">
                ${footer?.text || ''}
                ${footer?.text && timestamp ? ' • ' : ''}
                ${timestamp || ''}
            </span>
        </div>
    `;
};

export const renderEmbed = ({ embed, mentions }: EmbedProps) => {
    const colorStyle = embed.color ? `style="--embed-color-pill: #${embed.color.toString(16).padStart(6, '0')};"` : '';
    
    return `
        <div class="embed" ${colorStyle}>
            <div class="embed-content">
                <div class="embed-inner">
                    ${embed.author ? `
                        <div class="embed-author">
                            ${embed.author.icon_url ? `<img class="embed-author-icon" src="${embed.author.icon_url}" alt="author icon" loading="lazy" />` : ''}
                            ${embed.author.url ? `<a href="${embed.author.url}" target="_blank">${embed.author.name}</a>` : embed.author.name}
                        </div>
                    ` : ''}
                    
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
                    
                    ${renderFields(embed.fields)}
                    ${renderMediaEmbed(embed)}
                </div>
                
                ${embed.thumbnail ? renderThumbnail(embed.thumbnail) : ''}
            </div>
            
            ${renderFooter(embed.footer, embed.timestamp)}
        </div>
    `;
};

export const renderEmbeds = (embeds: any[], mentions: any[]) => {
    if (!embeds?.length) return '';
    
    return embeds.map(embed => renderEmbed({ embed, mentions })).join("");
}; 