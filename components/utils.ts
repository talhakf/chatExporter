export const convertMessageContent = (content: string, mentions: any[]) => {
    if (!content) return '';

    // code blocks first to prevent formatting
    let formatted = content.replace(/```(?:\w+\n)?([\s\S]+?)```/g, (_, code) => {
        return `<div class="codeblock"><pre><code>${code.trim()}</code></pre></div>`;
    });

    // inline code
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

    // quotes
    formatted = formatted.replace(/^>\s(.+)$/gm, '<div class="quote">$1</div>');

    // bullet points
    formatted = formatted.replace(/^[\*-]\s+(.+)$/gm, '<div class="bullet">$1</div>');

    // text formatting
    const formatters = [
        [/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>'], // Bold italic
        [/\*\*(.+?)\*\*/g, '<strong>$1</strong>'],             // Bold
        [/\*(.+?)\*/g, '<em>$1</em>'],                         // Italic
        [/__(.+?)__/g, '<u>$1</u>'],                          // Underline
        [/~~(.+?)~~(?!\S)/g, '<s>$1</s>'],                    // Strikethrough
        [/\|\|(.+?)\|\|/g, '<span class="spoiler" onclick="this.classList.toggle(\'revealed\')">$1</span>'] // Spoiler
    ];

    for (const [pattern, replacement] of formatters) {
        formatted = formatted.replace(pattern as RegExp, replacement as string);
    }

    // mentions
    formatted = formatted.replace(/<@!?(\d+)>/g, (match, id) => {
        const mention = mentions.find(m => m.id === id);
        return `<span class="mention">@${mention?.username || 'Unknown User'}</span>`;
    });

    // custom emojis
    formatted = formatted.replace(/<(a)?:(\w+):(\d+)>/g, (match, animated, name, id) => {
        const extension = animated ? 'gif' : 'png';
        return `<img class="custom-emoji" src="https://cdn.discordapp.com/emojis/${id}.${extension}" alt="${name}" title="${name}">`;
    });

    // line breaks
    formatted = formatted.replace(/\n/g, '<br>');

    return formatted;
};

export const getAvatarUrl = (user: any) => {
    return user.avatar 
        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=80`
        : `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator || 0) % 5}.png`;
};

export const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
}; 