import { convertMessageContent } from "../utils";
import { renderEmbeds } from "./Embed";

interface SystemMessageProps {
    message: any;
}

export const renderSystemMessage = ({ message }: SystemMessageProps) => {
    let systemContent = '';
    let embedsContent = '';
    
    if (message.type === 20 && message.interaction) {
        systemContent = `
            <div class="command-interaction">
                <span class="command-name">/${message.interaction.name}</span>
                <span class="command-user">used by <span class="mention">@${message.interaction.user.global_name || message.interaction.user.username}</span></span>
            </div>
        `;

        embedsContent = renderEmbeds(message.embeds, message.mentions);
    }

    return `
        <div class="system-message">
            ${systemContent}
            ${convertMessageContent(message.content, message.mentions)}
            ${embedsContent}
        </div>
    `;
}; 