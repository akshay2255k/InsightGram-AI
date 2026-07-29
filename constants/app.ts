// ======================================================
// InsightGram AI
// File : src/constants/app.ts
// ======================================================

export const APP = {
    NAME: "InsightGram AI",

    SHORT_NAME: "InsightGram",

    VERSION: "1.0.0",

    DESCRIPTION:
        "AI Powered Instagram Relationship Intelligence Dashboard",

    AUTHOR: "Akshay K",

    LICENSE: "MIT",

    WEBSITE: "",

    REPOSITORY: "",

    SUPPORT_EMAIL: "",

    THEME_COLOR: "#07070A",

    BACKGROUND_COLOR: "#07070A",

    DEFAULT_LANGUAGE: "en",

    STORAGE_PREFIX: "insightgram_ai",

    MAX_UPLOAD_SIZE: 1024 * 1024 * 1024, // 1 GB

    SUPPORTED_EXTENSIONS: [
        ".zip"
    ],

    INSTAGRAM_PROFILE_URL:
        "https://www.instagram.com/",

    DATE_FORMAT:
        "dd MMM yyyy",

    TIME_FORMAT:
        "HH:mm",

    COPYRIGHT:
        `© ${new Date().getFullYear()} InsightGram AI`
} as const;

export default APP;