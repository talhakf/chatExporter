import { ChannelStore, Menu, React } from "@webpack/common";
import { NavContextMenuPatchCallback } from "@api/ContextMenu";
import { findByPropsLazy } from "@webpack";
import { DownloadIcon } from "./DownloadIcon";
import { openExportModal } from "./ExportModal";

const OptionClasses = findByPropsLazy("optionName", "optionIcon", "optionLabel");

export const patchAttachMenu: NavContextMenuPatchCallback = (children, props) => {
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