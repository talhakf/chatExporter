interface AttachmentsProps {
    attachments: any[];
    includeImages: boolean;
}

interface StickersProps {
    stickers: any[];
}

export const renderAttachments = ({ attachments, includeImages }: AttachmentsProps) => {
    if (!includeImages || !attachments?.length) return '';

    return `
        <div class="attachments">
            ${attachments.map(a => {
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
    `;
};

export const renderStickers = ({ stickers }: StickersProps) => {
    if (!stickers?.length) return '';

    return `
        <div class="stickers">
            ${stickers.map(sticker => `
                <div class="sticker">
                    <img src="https://media.discordapp.net/stickers/${sticker.id}.png" alt="${sticker.name}" />
                    <div class="sticker-name">${sticker.name}</div>
                </div>
            `).join("")}
        </div>
    `;
}; 