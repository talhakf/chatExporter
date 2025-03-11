import { React, SelectedChannelStore } from "@webpack/common";
import { findComponentByCodeLazy } from "@webpack";
import ErrorBoundary from "@components/ErrorBoundary";
import { DownloadIcon } from "./DownloadIcon";
import { openExportModal } from "./ExportModal";

const HeaderBarIcon = findComponentByCodeLazy(".HEADER_BAR_BADGE_TOP:", '.iconBadge,"top"');

export const ExportHeaderIcon = ErrorBoundary.wrap(() => {
    const channelId = SelectedChannelStore.getChannelId();
    if (!channelId) return null;

    return (
        <HeaderBarIcon
            className="vc-export-btn"
            onClick={() => openExportModal(channelId)}
            tooltip="Export Chat"
            icon={DownloadIcon}
        />
    );
}); 