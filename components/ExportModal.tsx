import { React, Button, Forms, Select, useState, Switch } from "@webpack/common";
import { Settings } from "@api/Settings";
import { ModalRoot, ModalHeader, ModalContent, ModalFooter, ModalCloseButton, ModalSize } from "@utils/modal";
import { Margins } from "@utils/margins";
import { exportChat } from "../services/exportService";

interface ExportModalProps {
    modalProps: any;
    channelId: string;
}

export function ExportModal({ modalProps, channelId }: ExportModalProps) {
    const [format, setFormat] = useState(Settings.plugins.ChatExporter.defaultFormat);
    const [includeImages, setIncludeImages] = useState(Settings.plugins.ChatExporter.includeImages);
    const [dateRange, setDateRange] = useState(Settings.plugins.ChatExporter.defaultDateRange);

    return (
        <ModalRoot {...modalProps} size={ModalSize.MEDIUM}>
            <ModalHeader>
                <Forms.FormTitle tag="h2">Export Chat</Forms.FormTitle>
                <ModalCloseButton onClick={modalProps.onClose} />
            </ModalHeader>
            <ModalContent>
                <Forms.FormSection className={Margins.bottom20}>
                    <Forms.FormTitle className={Margins.bottom8}>Export Format</Forms.FormTitle>
                    <Select
                        options={[
                            { label: "Text File", value: "txt" },
                            { label: "JSON", value: "json" },
                            { label: "HTML", value: "html" }
                        ]}
                        placeholder="Select a format"
                        maxVisibleItems={5}
                        closeOnSelect={true}
                        select={v => setFormat(v)}
                        isSelected={v => v === format}
                        serialize={v => String(v)}
                    />
                </Forms.FormSection>

                <Forms.FormSection className={Margins.bottom20}>
                    <Forms.FormTitle className={Margins.bottom8}>Date Range</Forms.FormTitle>
                    <Select
                        options={[
                            { label: "All Messages", value: "all" },
                            { label: "Last 24 Hours", value: "day" },
                            { label: "Last Week", value: "week" },
                            { label: "Last Month", value: "month" }
                        ]}
                        placeholder="Select a date range"
                        maxVisibleItems={5}
                        closeOnSelect={true}
                        select={v => setDateRange(v)}
                        isSelected={v => v === dateRange}
                        serialize={v => String(v)}
                    />
                </Forms.FormSection>

                <Forms.FormSection>
                    <Switch
                        value={includeImages}
                        onChange={v => setIncludeImages(v)}
                        note="Include image attachments in the export"
                        hideBorder
                    >
                        Include Images
                    </Switch>
                </Forms.FormSection>
            </ModalContent>
            <ModalFooter>
                <Button
                    onClick={() => {
                        exportChat(channelId, {
                            format,
                            includeImages,
                            dateRange
                        });
                        modalProps.onClose();
                    }}
                >
                    Export
                </Button>
            </ModalFooter>
        </ModalRoot>
    );
} 