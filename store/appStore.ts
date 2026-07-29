// ======================================================
// InsightGram AI
// File : src/store/appStore.ts
// ======================================================

import { create } from "zustand";

import type {
    DashboardStatistics,
    InstagramExport,
    RelationshipInsight,
} from "../types/instagram";

interface AppState {
    exportData: InstagramExport | null;

    statistics: DashboardStatistics | null;

    insight: RelationshipInsight | null;

    loading: boolean;

    initialized: boolean;

    currentFileName: string | null;

    uploadedAt: string | null;

    setExportData: (
        data: InstagramExport | null
    ) => void;

    setStatistics: (
        statistics: DashboardStatistics | null
    ) => void;

    setInsight: (
        insight: RelationshipInsight | null
    ) => void;

    setLoading: (
        loading: boolean
    ) => void;

    setInitialized: (
        initialized: boolean
    ) => void;

    setCurrentFileName: (
        fileName: string | null
    ) => void;

    setUploadedAt: (
        uploadedAt: string | null
    ) => void;

    reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    exportData: null,

    statistics: null,

    insight: null,

    loading: false,

    initialized: false,

    currentFileName: null,

    uploadedAt: null,

    setExportData: (data) =>
        set({
            exportData: data,
        }),

    setStatistics: (statistics) =>
        set({
            statistics,
        }),

    setInsight: (insight) =>
        set({
            insight,
        }),

    setLoading: (loading) =>
        set({
            loading,
        }),

    setInitialized: (initialized) =>
        set({
            initialized,
        }),

    setCurrentFileName: (currentFileName) =>
        set({
            currentFileName,
        }),

    setUploadedAt: (uploadedAt) =>
        set({
            uploadedAt,
        }),

    reset: () =>
        set({
            exportData: null,
            statistics: null,
            insight: null,
            loading: false,
            initialized: false,
            currentFileName: null,
            uploadedAt: null,
        }),
}));

export default useAppStore;