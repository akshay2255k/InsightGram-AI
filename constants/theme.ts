// ======================================================
// InsightGram AI
// File : src/constants/theme.ts
// ======================================================

export type ThemeMode =
    | "light"
    | "dark"
    | "system";

export interface ThemeColors {

    background: string;

    surface: string;

    card: string;

    text: string;

    textSecondary: string;

    border: string;

    primary: string;

    secondary: string;

    success: string;

    warning: string;

    danger: string;

    info: string;

}

export interface AppTheme {

    name: ThemeMode;

    colors: ThemeColors;

}

export const lightTheme: AppTheme = {

    name: "light",

    colors: {

        background: "#F8FAFC",

        surface: "#FFFFFF",

        card: "#FFFFFF",

        text: "#111827",

        textSecondary: "#6B7280",

        border: "#E5E7EB",

        primary: "#18C8FF",

        secondary: "#7B61FF",

        success: "#10B981",

        warning: "#F59E0B",

        danger: "#EF4444",

        info: "#3B82F6",

    },

};

export const darkTheme: AppTheme = {

    name: "dark",

    colors: {

        background: "#0F172A",

        surface: "#111827",

        card: "#1E293B",

        text: "#F8FAFC",

        textSecondary: "#94A3B8",

        border: "#334155",

        primary: "#18C8FF",

        secondary: "#7B61FF",

        success: "#34D399",

        warning: "#FBBF24",

        danger: "#FF5A7A",

        info: "#60A5FA",

    },

};

export function getTheme(
    mode: ThemeMode
): AppTheme {

    switch (mode) {

        case "light":
            return lightTheme;

        case "dark":
            return darkTheme;

        case "system":
        default:

            return window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
                ? darkTheme
                : lightTheme;

    }

}

export default {

    lightTheme,

    darkTheme,

    getTheme,

};