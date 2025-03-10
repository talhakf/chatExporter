export const convertMessageContent = (text: string, mentions: any[] = []) => {
    text = text.replace(/<(a)?:(\w+):(\d+)>/g, (match, animated, name, id) => {
        const extension = animated ? 'gif' : 'webp';
        return `<img class="custom-emoji" src="https://cdn.discordapp.com/emojis/${id}.${extension}?size=48" alt="${name}" title="${name}" />`;
    });

    text = text.replace(/<@!?(\d+)>/g, (match, id) => {
        const mentionedUser = mentions.find(user => user.id === id);
        if (mentionedUser) {
            return `<span class="mention">@${mentionedUser.username}</span>`;
        }
        return `<span class="mention">@${id}</span>`;
    });

    return text;
};

export const getAvatarUrl = (user: any) => {
    return user.avatar 
        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=80`
        : `https://cdn.discordapp.com/embed/avatars/${Number(user.discriminator || 0) % 5}.png`;
};

export const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
}; 