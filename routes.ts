// ======================================================
// InsightGram AI
// File : src/routes.ts
// ======================================================

export const ROUTES = {
    HOME: "/",
    OVERVIEW: "/overview",
    RELATIONSHIPS: "/relationships",
    REQUESTS: "/requests",
    ANALYTICS: "/analytics",
    AI_INSIGHTS: "/ai-insights",
    COMPARE: "/compare",
    TIMELINE: "/timeline",
    FAVORITES: "/favorites",
    LABELS: "/labels",
    NOTES: "/notes",
    EXPORTS: "/exports",
    SETTINGS: "/settings",
} as const;

export type RouteKey = keyof typeof ROUTES;