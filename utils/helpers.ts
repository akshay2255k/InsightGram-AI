// ======================================================
// InsightGram AI
// File : src/utils/helpers.ts
// ======================================================

export function cn(
    ...classes: Array<string | false | null | undefined>
): string {
    return classes.filter(Boolean).join(" ");
}

export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function formatNumber(value: number): string {
    return new Intl.NumberFormat().format(value);
}

export function formatPercentage(
    value: number,
    digits = 1
): string {
    return `${value.toFixed(digits)}%`;
}

export function clamp(
    value: number,
    min: number,
    max: number
): number {
    return Math.min(Math.max(value, min), max);
}

export function randomId(length = 12): string {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let id = "";

    for (let i = 0; i < length; i++) {
        id += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );
    }

    return id;
}

export function openInstagramProfile(
    username: string
): void {
    window.open(
        `https://www.instagram.com/${username}/`,
        "_blank",
        "noopener,noreferrer"
    );
}

export function downloadFile(
    filename: string,
    content: string,
    mime = "text/plain"
): void {
    const blob = new Blob([content], {
        type: mime,
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

export function isZipFile(file: File): boolean {
    return (
        file.name.toLowerCase().endsWith(".zip") ||
        file.type === "application/zip"
    );
}

export function bytesToSize(bytes: number): string {
    if (bytes === 0) {
        return "0 Bytes";
    }

    const units = [
        "Bytes",
        "KB",
        "MB",
        "GB",
        "TB",
    ];

    const index = Math.floor(
        Math.log(bytes) / Math.log(1024)
    );

    return `${(
        bytes / Math.pow(1024, index)
    ).toFixed(2)} ${units[index]}`;
}

export function capitalize(text: string): string {
    if (!text) {
        return "";
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function copyToClipboard(
    text: string
): Promise<void> {
    return navigator.clipboard.writeText(text);
}

export function isBrowser(): boolean {
    return typeof window !== "undefined";
}

export function uniqueArray<T>(array: T[]): T[] {
    return [...new Set(array)];
}

export function sortAlphabetically(
    items: string[]
): string[] {
    return [...items].sort((a, b) =>
        a.localeCompare(b)
    );
}