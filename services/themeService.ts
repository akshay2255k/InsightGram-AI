// ======================================================
// InsightGram AI
// File : src/services/themeService.ts
// ======================================================

export type AppTheme =
    | "dark"
    | "light";

const STORAGE_KEY =
    "insightgram_theme";

class ThemeService {

    getTheme(): AppTheme {

        const stored =
            localStorage.getItem(
                STORAGE_KEY
            );

        if (
            stored === "light" ||
            stored === "dark"
        ) {

            return stored;

        }

        return "dark";

    }

    setTheme(
        theme: AppTheme
    ): void {

        localStorage.setItem(
            STORAGE_KEY,
            theme
        );

        this.applyTheme(
            theme
        );

    }

    toggle(): AppTheme {

        const current =
            this.getTheme();

        const next:
            AppTheme =
            current === "dark"
                ? "light"
                : "dark";

        this.setTheme(
            next
        );

        return next;

    }

    initialize(): AppTheme {

        const theme =
            this.getTheme();

        this.applyTheme(
            theme
        );

        return theme;

    }

    private applyTheme(
        theme: AppTheme
    ): void {

        document.documentElement
            .setAttribute(
                "data-theme",
                theme
            );

        document.body.classList.toggle(
            "theme-light",
            theme === "light"
        );

        document.body.classList.toggle(
            "theme-dark",
            theme === "dark"
        );

    }

}

export const themeService =
    new ThemeService();

export default themeService;