import { Message } from "discord-types/general";

export enum ReferencedMessageState {
    LOADED = 0,
    NOT_LOADED = 1,
    DELETED = 2,
}

export type ReferencedMessage = { 
    state: ReferencedMessageState.LOADED; 
    message: Message; 
} | { 
    state: ReferencedMessageState.NOT_LOADED | ReferencedMessageState.DELETED; 
};

export interface ExportOptions {
    format: "txt" | "json" | "html";
    includeImages: boolean;
    dateRange: "all" | "day" | "week" | "month";
    loadFullHistory: boolean;
}

export interface MessageFetchSuccess {
    type: "MESSAGE_FETCH_SUCCESS";
    channelId: string;
    messages: Message[];
}

export interface MessageFetchRequest {
    type: "MESSAGE_FETCH_REQUEST";
    channelId: string;
    options: {
        before: string;
        limit: number;
    };
    optimistic: boolean;
} 