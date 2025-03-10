export const cssVariables = `
    --background-primary: #313338;
    --background-secondary: #2B2D31;
    --background-tertiary: #1E1F22;
    --text-normal: #F2F3F5;
    --text-muted: #949BA4;
    --text-link: #00A8FC;
    --header-primary: #F2F3F5;
    --interactive-normal: #B5BAC1;
    --channeltextarea-background: #383A40;
    --brand-experiment: #5865F2;
    --font-primary: "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    --mention-background: rgba(88, 101, 242, 0.3);
    --mention-foreground: #c9cdfb;
    --embed-background: #2B2D31;
    --embed-color-pill: #4f545c;
    --command-name: #00A8FC;
    --command-background: rgba(0, 168, 252, 0.1);
`;

export const baseStyles = `
    body {
        font-family: var(--font-primary);
        background: var(--background-primary);
        color: var(--text-normal);
        margin: 0;
        padding: 0;
        line-height: 1.4;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }

    .header {
        background: var(--background-tertiary);
        padding: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .header h1 {
        color: var(--header-primary);
        font-size: 20px;
        margin: 0;
    }

    .chat {
        padding: 16px;
        background: var(--background-primary);
    }
`;

export const messageStyles = `
    .message {
        display: flex;
        padding: 8px 0;
        margin: 0;
        position: relative;
    }

    .message:hover {
        background: var(--background-secondary);
    }

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 16px;
        flex-shrink: 0;
    }

    .message-content {
        flex-grow: 1;
        min-width: 0;
    }

    .message-header {
        display: flex;
        align-items: baseline;
        margin-bottom: 4px;
    }

    .username {
        color: var(--header-primary);
        font-size: 1rem;
        font-weight: 500;
        margin-right: 8px;
    }

    .timestamp {
        color: var(--text-muted);
        font-size: 0.75rem;
    }

    .content {
        color: var(--text-normal);
        font-size: 1rem;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
`;

export const embedStyles = `
    .embed {
        margin-top: 8px;
        padding: 8px 16px 16px 12px;
        background: var(--embed-background);
        border-radius: 4px;
        position: relative;
    }

    .embed::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 4px;
        background: var(--embed-color-pill);
        border-radius: 4px 0 0 4px;
    }

    .embed-title {
        color: var(--header-primary);
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .embed-title a {
        color: var(--text-link);
        text-decoration: none;
    }

    .embed-title a:hover {
        text-decoration: underline;
    }

    .embed-description {
        color: var(--text-normal);
        font-size: 0.9375rem;
        line-height: 1.3;
        white-space: pre-wrap;
        margin-bottom: 8px;
    }

    .embed-image {
        max-width: 100%;
        margin-top: 16px;
        border-radius: 4px;
    }
`;

export const attachmentStyles = `
    .attachments {
        margin-top: 8px;
        display: grid;
        grid-gap: 4px;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }

    .attachments img {
        max-width: 100%;
        max-height: 350px;
        border-radius: 4px;
        object-fit: contain;
    }

    .sticker {
        width: 160px;
        height: 160px;
        margin-top: 8px;
        background: var(--background-secondary);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .sticker img {
        max-width: 100%;
        max-height: 100%;
    }

    .sticker-name {
        position: absolute;
        bottom: 4px;
        left: 4px;
        background: rgba(0, 0, 0, 0.7);
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 0.75rem;
        color: var(--text-normal);
    }
`;

export const systemMessageStyles = `
    .system-message {
        color: var(--text-muted);
        font-style: italic;
        padding: 8px 0;
    }

    .command-interaction {
        display: flex;
        align-items: center;
        margin-bottom: 4px;
        font-size: 0.875rem;
    }

    .command-name {
        color: var(--command-name);
        background: var(--command-background);
        padding: 0 4px;
        border-radius: 3px;
        font-weight: 500;
    }

    .command-user {
        color: var(--text-muted);
        margin-left: 4px;
    }

    .command-user .mention {
        color: var(--text-normal);
    }
`;

export const reactionStyles = `
    .reactions {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-top: 4px;
    }

    .reaction {
        display: flex;
        align-items: center;
        padding: 0.125rem 0.375rem;
        background: var(--background-tertiary);
        border-radius: 0.25rem;
        font-size: 0.875rem;
        gap: 4px;
    }

    .reaction-emoji {
        height: 1.3em;
        width: 1.3em;
        object-fit: contain;
    }

    .reaction-count {
        color: var(--text-muted);
        font-size: 0.875rem;
        min-width: 12px;
        text-align: center;
    }
`;

export const mentionStyles = `
    .mention {
        background-color: var(--mention-background);
        color: var(--mention-foreground);
        border-radius: 3px;
        padding: 0 2px;
        font-weight: 500;
        cursor: default;
    }

    .mention:hover {
        background-color: var(--brand-experiment);
        color: white;
    }
`;

export const replyStyles = `
    .reply-container {
        display: flex;
        align-items: center;
        margin-bottom: 4px;
        padding: 2px 8px;
        background-color: var(--background-secondary);
        border-radius: 4px;
        max-width: fit-content;
        border: 2px solid #5865F2;
    }

    .reply-avatar {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin-right: 4px;
        flex-shrink: 0;
    }

    .reply-username {
        color: var(--header-primary);
        font-weight: 500;
        margin-right: 4px;
        font-style: normal;
    }

    .reply-content {
        color: var(--text-muted);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 300px;
        font-style: normal;
    }

    .reply-icon {
        width: 16px;
        height: 16px;
        margin-right: 4px;
        transform: scaleX(-1);
        flex-shrink: 0;
        color: var(--text-muted);
    }
`;

export const customEmojiStyles = `
    .custom-emoji {
        width: 1.375em;
        height: 1.375em;
        vertical-align: bottom;
        object-fit: contain;
    }
`; 