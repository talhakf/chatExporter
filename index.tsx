import { ChannelStore, Menu } from "@webpack/common";
import { NavContextMenuPatchCallback } from "@api/ContextMenu";
import definePlugin, { OptionType } from "@utils/types";
import { openModal } from "@utils/modal";
import ErrorBoundary from "@components/ErrorBoundary";
import { ExportModal } from "./components/ExportModal";
import { FolderIcon } from "@components/Icons";
import { findByPropsLazy } from "@webpack";

const OptionClasses = findByPropsLazy("optionName", "optionIcon", "optionLabel");

function DownloadIcon() {
    return (
        <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 2a1 1 0 0 1 1 1v10.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V3a1 1 0 0 1 1-1ZM3 20a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2H3Z" />
        </svg>
    );
}

function openExportModal(channelId: string) {
    openModal(props => (
        <ErrorBoundary>
            <ExportModal
                modalProps={props}
                channelId={channelId}
            />
        </ErrorBoundary>
    ));
}

const patchAttachMenu: NavContextMenuPatchCallback = (children, props) => {
    const channel = ChannelStore.getChannel(props.channel.id);
    if (!channel) return;

    children.unshift(
        <Menu.MenuItem
            id="chat-exporter"
            label={
                <div className={OptionClasses.optionLabel}>
                    <DownloadIcon className={OptionClasses.optionIcon} />
                    <div className={OptionClasses.optionName}>Export Chat</div>
                </div>
            }
            action={() => openExportModal(channel.id)}
        />
    );
};

export default definePlugin({
    name: "ChatExporter",
    description: "Export Discord chat messages in various formats (TXT, JSON, HTML)",
    authors: [{ name: "github.com/talhakf", id: 1140716160560676976 }],
    dependencies: [],

    contextMenus: {
        "channel-attach": patchAttachMenu
    },

    options: {
        defaultFormat: {
            type: OptionType.SELECT,
            description: "Default export format",
            default: "txt",
            options: [
                { label: "Text File", value: "txt", default: true },
                { label: "JSON", value: "json" },
                { label: "HTML", value: "html" }
            ]
        },
        includeImages: {
            type: OptionType.BOOLEAN,
            description: "Include image attachments in export",
            default: true
        },
        defaultDateRange: {
            type: OptionType.SELECT,
            description: "Default date range for exports",
            default: "all",
            options: [
                { label: "All Messages", value: "all", default: true },
                { label: "Last 24 Hours", value: "day" },
                { label: "Last Week", value: "week" },
                { label: "Last Month", value: "month" }
            ]
        },
    }
}); 