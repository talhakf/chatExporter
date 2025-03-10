import { Message } from "discord-types/general";
import { ExportOptions } from "../types";
import { renderMessage } from "./message/MessageContent";
import { renderSystemMessage } from "./message/SystemMessage";
import * as styles from "./styles";

export const generateHtmlContent = (channel: any, filteredMessages: Message[], options: ExportOptions) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Discord Chat Export - ${channel.name}</title>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
            <style>
                ${styles.styles}
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Chat Export: ${channel.name}</h1>
            </div>
            <div class="container">
                <div class="chat">
                    ${filteredMessages.map(message => {
                        if (message.type !== 0 && message.type !== 19) {
                            return renderSystemMessage({ message });
                        }
                        return renderMessage({ message, options });
                    }).join("")}
                </div>
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
        </body>
        </html>
    `;
}; 