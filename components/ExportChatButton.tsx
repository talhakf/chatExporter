import { React, SelectedChannelStore } from "@webpack/common";
import { ChatBarButton, ChatBarButtonFactory } from "@api/ChatButtons";
import { DownloadIcon } from "./DownloadIcon";
import { openExportModal } from "./ExportModal";

export const ExportChatButton: ChatBarButtonFactory = ({ isMainChat, type }) => {
    const channelId = SelectedChannelStore.getChannelId();
    if (!isMainChat || !channelId) return null;

    return (
        <ChatBarButton
            tooltip="Export Chat"
            onClick={() => openExportModal(channelId)}
        >
            <DownloadIcon />
        </ChatBarButton>
    );
}; 