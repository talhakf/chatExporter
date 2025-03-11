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
    --button-primary: #5865F2;
    --button-primary-hover: #4752C4;
    --button-secondary: #4F545C;
    --button-secondary-hover: #686D73;
    --button-success: #248046;
    --button-success-hover: #1A6334;
    --button-danger: #DA373C;
    --button-danger-hover: #A12828;
    --button-link: #00A8FC;
    --button-link-hover: #0096E2;
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

    .button-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 8px;
    }

    .discord-button {
        display: inline-flex;
        align-items: center;
        padding: 2px 16px;
        min-height: 32px;
        min-width: 60px;
        border-radius: 3px;
        font-size: 14px;
        font-weight: 500;
        line-height: 16px;
        cursor: pointer;
        border: none;
        color: white;
        transition: background-color 0.17s ease;
    }

    .discord-button.primary {
        background-color: var(--button-primary);
    }
    .discord-button.primary:hover {
        background-color: var(--button-primary-hover);
    }

    .discord-button.secondary {
        background-color: var(--button-secondary);
    }
    .discord-button.secondary:hover {
        background-color: var(--button-secondary-hover);
    }

    .discord-button.success {
        background-color: var(--button-success);
    }
    .discord-button.success:hover {
        background-color: var(--button-success-hover);
    }

    .discord-button.danger {
        background-color: var(--button-danger);
    }
    .discord-button.danger:hover {
        background-color: var(--button-danger-hover);
    }

    .discord-button.link {
        color: var(--button-link);
        background: transparent;
        padding: 2px 8px;
    }
    .discord-button.link:hover {
        color: var(--button-link-hover);
        text-decoration: underline;
    }

    .discord-button[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
    }

    .button-emoji {
        width: 20px;
        height: 20px;
        margin-right: 4px;
        vertical-align: bottom;
    }

    .button-label {
        margin: 0 4px;
    }
`;

export const embedStyles = `
    .embed {
        margin-top: 8px;
        padding: 8px 16px 16px 12px;
        background: var(--embed-background);
        border-radius: 4px;
        position: relative;
        max-width: 520px;
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

    .embed-content {
        display: grid;
        grid-template-columns: auto min-content;
        gap: 16px;
    }

    .embed-inner {
        min-width: 0;
    }

    .embed-author {
        color: var(--header-primary);
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        font-size: 0.875rem;
        font-weight: 500;
    }

    .embed-author-icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        object-fit: cover;
    }

    .embed-author a {
        color: var(--text-link);
        text-decoration: none;
    }

    .embed-author a:hover {
        text-decoration: underline;
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

    .embed-fields {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 8px;
    }

    .embed-field-row {
        display: flex;
        gap: 8px;
    }

    .embed-field {
        flex: 1;
        min-width: 0;
    }

    .embed-field.inline {
        flex-basis: 0;
        min-width: 150px;
    }

    .embed-field-name {
        color: var(--header-primary);
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 2px;
    }

    .embed-field-value {
        color: var(--text-normal);
        font-size: 0.875rem;
        line-height: 1.125rem;
        white-space: pre-wrap;
        min-width: 0;
    }

    .embed-thumbnail-container {
        flex-shrink: 0;
        margin-left: auto;
    }

    .embed-thumbnail {
        max-width: 80px;
        max-height: 80px;
        border-radius: 4px;
        object-fit: contain;
    }

    .embed-media {
        margin-top: 16px;
        max-width: 100%;
        border-radius: 4px;
        overflow: hidden;
    }

    .embed-image, .embed-gif {
        max-width: 100%;
        max-height: 300px;
        border-radius: 4px;
        object-fit: contain;
    }

    .embed-footer {
        margin-top: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--text-muted);
        font-size: 0.75rem;
    }

    .embed-footer-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        object-fit: cover;
    }

    .embed-footer-text {
        font-size: 0.75rem;
        font-weight: 500;
        line-height: 1rem;
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

export const markdownStyles = `
    .content strong {
        font-weight: 700;
    }

    .content em {
        font-style: italic;
    }

    .content u {
        text-decoration: underline;
    }

    .content s {
        text-decoration: line-through;
    }

    .content .spoiler {
        background-color: #202225;
        border-radius: 3px;
        padding: 0 2px;
        cursor: pointer;
        color: transparent;
        user-select: none;
    }

    .content .spoiler.revealed,
    .content .spoiler:hover {
        color: var(--text-normal);
        background-color: rgba(32, 34, 37, 0.9);
    }

    .content .codeblock {
        background: #2b2d31;
        border-radius: 4px;
        margin: 6px 0;
    }

    .content .codeblock pre {
        margin: 0;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        line-height: 1.125rem;
        color: #dcddde;
        white-space: pre;
        overflow-x: auto;
    }

    .content .codeblock code {
        background: transparent;
        padding: 0;
        color: inherit;
        font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
        white-space: inherit;
    }

    .content .inline-code {
        background: #2b2d31;
        padding: 3.2px 6px;
        border-radius: 3px;
        color: #dcddde;
        font-size: 0.875rem;
        font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
        white-space: pre-wrap;
    }

    /* Override Prism styles to match Discord */
    .content .codeblock .prism {
        text-shadow: none !important;
        background: transparent !important;
        color: inherit !important;
        white-space: inherit !important;
    }

    .content .codeblock .prism .token.operator,
    .content .codeblock .prism .token.entity,
    .content .codeblock .prism .token.url,
    .content .codeblock .prism .language-css .token.string,
    .content .codeblock .prism .style .token.string {
        background: transparent !important;
    }
`;

export const messageContentStyles = `
    .content .quote {
        padding-left: 8px;
        margin: 4px 0;
        border-left: 4px solid var(--text-muted);
        color: var(--text-muted);
    }

    .content .bullet {
        display: flex;
        align-items: baseline;
        margin: 2px 0;
    }

    .content .bullet::before {
        content: "•";
        margin-right: 8px;
        color: var(--text-normal);
    }

    .content .message-line {
        min-height: 1.375rem;
    }

    .content .message-line.br {
        height: 1.375rem;
    }

    .content .codeblock .message-line {
        min-height: 0;
    }

    .content .edited {
        color: var(--text-muted);
        font-size: 0.625rem;
        margin-left: 3px;
        display: inline-block;
        vertical-align: baseline;
    }
`;

export const styles = `
    :root {
        ${cssVariables}
    }
    
    ${baseStyles}
    ${messageStyles}
    ${embedStyles}
    ${attachmentStyles}
    ${systemMessageStyles}
    ${reactionStyles}
    ${mentionStyles}
    ${replyStyles}
    ${customEmojiStyles}
    ${markdownStyles}
    ${messageContentStyles}
`;