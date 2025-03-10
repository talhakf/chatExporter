export const convertMessageContent = (content: string, mentions: any[], edited: boolean = false) => {
    if (!content) return '';

    // code blocks first to prevent formatting
    let formatted = content.replace(/```(\w+)?\n?([\s\S]+?)```/g, (match, language, code) => {
        code = code.replace(/^\n/, '');
        code = code.replace(/\n+$/, '');
        const lang = language ? ` language-${language.toLowerCase()}` : '';
        return `<div class="codeblock"><pre><code class="prism${lang}">${code}</code></pre></div>`;
    });

    const parts = formatted.split(/(<div class="codeblock">.*?<\/div>)/gs);
    
    formatted = parts.map(part => {
        if (part.startsWith('<div class="codeblock">')) {
            return part;
        }

        // non code formatting
        let processed = part;

        // inline code
        processed = processed.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

        // quotes
        processed = processed.replace(/^>\s(.+)$/gm, (_, text) => {
            return `<div class="quote">${text}</div>`;
        });

        // bullet points
        processed = processed.replace(/^[\*-]\s+(.+)$/gm, '<div class="bullet">$1</div>');

        // text formatting
        const formatters = [
            [/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>'],
            [/\*\*(.+?)\*\*/g, '<strong>$1</strong>'],
            [/\*(.+?)\*/g, '<em>$1</em>'],
            [/__(.+?)__/g, '<u>$1</u>'],
            [/~~(.+?)~~(?!\S)/g, '<s>$1</s>'],
            [/\|\|(.+?)\|\|/g, '<span class="spoiler" onclick="this.classList.toggle(\'revealed\')">$1</span>']
        ];

        for (const [pattern, replacement] of formatters) {
            processed = processed.replace(pattern as RegExp, replacement as string);
        }

        // mentions
        processed = processed.replace(/<@!?(\d+)>/g, (match, id) => {
            const mention = mentions.find(m => m.id === id);
            return `<span class="mention">@${mention?.username || 'Unknown User'}</span>`;
        });

        // custom emojis
        processed = processed.replace(/<(a)?:(\w+):(\d+)>/g, (match, animated, name, id) => {
            const extension = animated ? 'gif' : 'png';
            return `<img class="custom-emoji" src="https://cdn.discordapp.com/emojis/${id}.${extension}" alt="${name}" title="${name}">`;
        });

        return processed.split('\n').map(line => 
            line.trim() ? `<div class="message-line">${line}</div>` : '<div class="message-line br"></div>'
        ).join('');
    }).join('');

    if (edited) {
        formatted += '<span class="edited">(edited)</span>';
    }

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