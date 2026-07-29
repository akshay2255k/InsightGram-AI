// ======================================================
// InsightGram AI
// File : src/constants/index.ts
// ======================================================

export const APP_NAME =
    "InsightGram AI";

export const APP_VERSION =
    "1.0.0";

export const APP_DESCRIPTION =
    "Professional Instagram relationship analytics dashboard.";

export const STORAGE_KEYS = {

    EXPORT_DATA:
        "insightgram-export-data",

    SETTINGS:
        "insightgram-settings",

    HISTORY:
        "insightgram-history",

    REVIEWED:
        "insightgram-reviewed",

    FAVORITES:
        "insightgram-favorites",

    NOTES:
        "insightgram-notes",

    LABELS:
        "insightgram-labels",

    THEME:
        "insightgram-theme",

};

export const SUPPORTED_ZIP_FILES = [

    ".zip",

];

export const SUPPORTED_JSON_FILES = [

    ".json",

];

export const MAX_FILE_SIZE =
    1024 * 1024 * 200; // 200 MB

export const AI_SCORE = {

    EXCELLENT: 90,

    GOOD: 75,

    FAIR: 60,

    POOR: 40,

};

export const DEFAULT_THEME =
    "dark";

export const DATE_FORMAT = {

    locale: "en-US",

    options: {

        year: "numeric",

        month: "short",

        day: "2-digit",

    } as const,

};

export const COLORS = {

    primary:
        "#18C8FF",

    secondary:
        "#7B61FF",

    success:
        "#34D399",

    warning:
        "#FBBF24",

    danger:
        "#FF5A7A",

    info:
        "#60A5FA",

    dark:
        "#111827",

    light:
        "#F8FAFC",

};

export const DEFAULT_AVATAR =
    "https://ui-avatars.com/api/?background=0f172a&color=ffffff&name=IG";

export default {
    APP_NAME,
    APP_VERSION,
    APP_DESCRIPTION,
    STORAGE_KEYS,
    SUPPORTED_ZIP_FILES,
    SUPPORTED_JSON_FILES,
    MAX_FILE_SIZE,
    AI_SCORE,
    DEFAULT_THEME,
    DATE_FORMAT,
    COLORS,
    DEFAULT_AVATAR,
};