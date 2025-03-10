import { ChannelStore, Menu } from "@webpack/common";
import { Devs } from "@utils/constants";
import { NavContextMenuPatchCallback } from "@api/ContextMenu";
import definePlugin, { OptionType } from "@utils/types";
import { Settings } from "@api/Settings";
import React from "react";
import { exportChat } from "./services/exportService";

const patchAttachMenu: NavContextMenuPatchCallback = (children, props) => {
    const channel = ChannelStore.getChannel(props.channel.id);
    if (!channel) return;

    children.push(
        <Menu.MenuItem
            id="chat-exporter"
            label="Export Chat"
            action={() => {
                exportChat(channel.id, {
                    format: Settings.plugins.ChatExporter.defaultFormat,
                    includeImages: Settings.plugins.ChatExporter.includeImages,
                    dateRange: Settings.plugins.ChatExporter.defaultDateRange,
                    loadFullHistory: Settings.plugins.ChatExporter.loadFullHistory
                });
            }}
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
        loadFullHistory: {
            type: OptionType.BOOLEAN,
            description: "Load full message history (may take a long time for large channels)",
            default: false
        }
    }
}); 