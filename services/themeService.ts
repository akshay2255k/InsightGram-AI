// ======================================================
// InsightGram AI
// File : src/services/themeService.ts
// ======================================================

import {
    darkTheme,
    getTheme,
    lightTheme,
    type ThemeMode,
    type AppTheme,
} from "../constants/theme";

const STORAGE_KEY =
    "insightgram-theme";

export function getCurrentTheme(): AppTheme {

    const mode = getThemeMode();

    return getTheme(mode);

}

export function getThemeMode(): ThemeMode {

    const stored =
        localStorage.getItem(
            STORAGE_KEY
        ) as ThemeMode | null;

    if (
        stored === "light" ||
        stored === "dark" ||
        stored === "system"
    ) {

        return stored;

    }

    return "system";

}

export function setThemeMode(
    mode: ThemeMode
): void {

    localStorage.setItem(
        STORAGE_KEY,
        mode
    );

    applyTheme(mode);

}

export function applyTheme(
    mode: ThemeMode
): void {

    const theme =
        getTheme(mode);

    const root =
        document.documentElement;

    root.dataset.theme =
        theme.name;

    Object.entries(
        theme.colors
    ).forEach(
        ([key, value]) => {

            root.style.setProperty(
                `--${key}`,
                value
            );

        }
    );

}

export function toggleTheme(): ThemeMode {

    const current =
        getThemeMode();

    const next: ThemeMode =
        current === "dark"
            ? "light"
            : "dark";

    setThemeMode(next);

    return next;

}

export function initializeTheme(): void {

    applyTheme(
        getThemeMode()
    );

    window
        .matchMedia(
            "(prefers-color-scheme: dark)"
        )
        .addEventListener(
            "change",
            () => {

                if (
                    getThemeMode() ===
                    "system"
                ) {

                    applyTheme(
                        "system"
                    );

                }

            }
        );

}

export {

    darkTheme,

    lightTheme,

};

export default {

    getCurrentTheme,

    getThemeMode,

    setThemeMode,

    applyTheme,

    toggleTheme,

    initializeTheme,

};