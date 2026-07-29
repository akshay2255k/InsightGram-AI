// ======================================================
// InsightGram AI
// File : src/constants/storage.ts
// ======================================================

import { APP } from "./app";

const PREFIX = APP.STORAGE_PREFIX;

export const STORAGE = {
    SETTINGS: `${PREFIX}:settings`,

    THEME: `${PREFIX}:theme`,

    LANGUAGE: `${PREFIX}:language`,

    HISTORY: `${PREFIX}:history`,

    LAST_EXPORT: `${PREFIX}:last-export`,

    REVIEWED_USERS: `${PREFIX}:reviewed-users`,

    FAVORITES: `${PREFIX}:favorites`,

    PINNED_USERS: `${PREFIX}:pinned-users`,

    LABELS: `${PREFIX}:labels`,

    NOTES: `${PREFIX}:notes`,

    DASHBOARD_STATE: `${PREFIX}:dashboard-state`,

    SEARCH_HISTORY: `${PREFIX}:search-history`,

    RECENT_FILES: `${PREFIX}:recent-files`,

    AI_REPORTS: `${PREFIX}:ai-reports`,

    EXPORTS: `${PREFIX}:exports`,

    WORKSPACES: `${PREFIX}:workspaces`,

    COMMAND_HISTORY: `${PREFIX}:command-history`,

    CACHE: `${PREFIX}:cache`,

    DATABASE: `${PREFIX}:database`
} as const;

export type StorageKey = keyof typeof STORAGE;

export default STORAGE;