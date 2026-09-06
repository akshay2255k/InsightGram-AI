// ======================================================
// InsightGram AI
// File : src/routes.ts
// ======================================================

export const ROUTES = {

    HOME:
        "/",

    RELATIONSHIPS:
        "/relationships",

    REQUESTS:
        "/requests",

    ANALYTICS:
        "/analytics",

    COMPARE:
        "/compare",

    EXPORTS:
        "/exports",

    SETTINGS:
        "/settings",

} as const;

export type RoutePath =
    typeof ROUTES[keyof typeof ROUTES];