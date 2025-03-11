import { React } from "@webpack/common";
import ErrorBoundary from "@components/ErrorBoundary";
import type { ReactNode } from "react";
import { ExportHeaderIcon } from "./ExportHeaderIcon";

export function ToolbarFragmentWrapper({ children }: { children: ReactNode[]; }) {
    children.splice(
        children.length - 1, 0,
        <ErrorBoundary noop={true}>
            <ExportHeaderIcon />
        </ErrorBoundary>
    );

    return <>{children}</>;
}

export const WrappedToolbarFragmentWrapper = ErrorBoundary.wrap(ToolbarFragmentWrapper, {
    fallback: () => <p style={{ color: "red" }}>Failed to render :(</p>
}); 