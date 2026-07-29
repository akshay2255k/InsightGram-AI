// ======================================================
// InsightGram AI
// File : src/types/app.ts
// ======================================================

import type {
    DashboardStatistics,
    InstagramExport,
    InstagramUser,
    RelationshipInsight,
    ZipHistory,
} from "./instagram";

export type ThemeMode =
    | "light"
    | "dark"
    | "system";

export type SortOrder =
    | "asc"
    | "desc";

export type RelationshipFilter =
    | "all"
    | "followers"
    | "following"
    | "mutual"
    | "notFollowingBack"
    | "youDontFollowBack"
    | "pendingRequests"
    | "recentRequests"
    | "recentlyUnfollowed"
    | "closeFriends"
    | "favorites"
    | "reviewed";

export interface AppSettings {

    theme: ThemeMode;

    animations: boolean;

    compactMode: boolean;

    autoSaveHistory: boolean;

    enableNotifications: boolean;

}

export interface SearchState {

    query: string;

    filter: RelationshipFilter;

    sortBy: keyof InstagramUser;

    sortOrder: SortOrder;

}

export interface ExportState {

    lastExportType?:
        | "csv"
        | "json"
        | "pdf";

    lastExportDate?: string;

}

export interface AppState {

    exportData: InstagramExport | null;

    statistics: DashboardStatistics | null;

    insight: RelationshipInsight | null;

    history: ZipHistory[];

    search: SearchState;

    settings: AppSettings;

    loading: boolean;

    error: string | null;

}

export interface UploadResult {

    data: InstagramExport;

    statistics: DashboardStatistics;

    insight: RelationshipInsight;

}

export interface NavigationItem {

    id: string;

    title: string;

    path: string;

    icon: string;

    badge?: string | number;

}

export interface NotificationItem {

    id: string;

    title: string;

    message: string;

    type:
        | "success"
        | "warning"
        | "error"
        | "info";

    createdAt: string;

    read: boolean;

}

export interface AIHealthMetric {

    name: string;

    score: number;

    color: string;

}

export default {};