// ======================================================
// InsightGram AI
// File : src/services/historyService.ts
// ======================================================

import type {
    DashboardStatistics,
    ZipHistory,
} from "../types/instagram";

const STORAGE_KEY = "insightgram-history";

export function getHistory(): ZipHistory[] {
    try {
        const value = localStorage.getItem(
            STORAGE_KEY
        );

        if (!value) {
            return [];
        }

        return JSON.parse(value) as ZipHistory[];
    } catch {
        return [];
    }
}

export function saveHistory(
    fileName: string,
    statistics: DashboardStatistics
): ZipHistory[] {

    const history = getHistory();

    const record: ZipHistory = {
        id:
            crypto.randomUUID?.() ??
            Date.now().toString(),
        fileName,
        importedAt: new Date().toISOString(),
        statistics,
    };

    history.unshift(record);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(history)
    );

    return history;
}

export function removeHistory(
    id: string
): ZipHistory[] {

    const history = getHistory().filter(
        (item) => item.id !== id
    );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(history)
    );

    return history;
}

export function clearHistory(): void {
    localStorage.removeItem(
        STORAGE_KEY
    );
}

export default {
    getHistory,
    saveHistory,
    removeHistory,
    clearHistory,
};