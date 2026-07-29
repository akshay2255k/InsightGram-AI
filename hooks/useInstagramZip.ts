// ======================================================
// InsightGram AI
// File : src/hooks/useInstagramZip.ts
// Part : 1
// ======================================================

import { useCallback, useState } from "react";

import {
    loadInstagramZip,
    parseInstagramExport,
} from "../parser/instagramParser";

import {
    analyzeRelationships,
    type RelationshipAnalysis,
} from "../services/relationshipEngine";

import {
    generateAIAnalysis,
    buildRelationshipSummary,
} from "../services/aiEngine";

import { useAppStore } from "../store/appStore";

export interface UseInstagramZipResult {

    loading: boolean;

    error: string | null;

    analysis: RelationshipAnalysis | null;

    uploadZip: (
        file: File
    ) => Promise<void>;

    reset: () => void;

}

export function useInstagramZip(): UseInstagramZipResult {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const [analysis, setAnalysis] =
        useState<RelationshipAnalysis | null>(
            null
        );

    const {

        setExportData,

        setStatistics,

        setInsight,

        setLoading: setStoreLoading,

        setCurrentFileName,

        setUploadedAt,

    } = useAppStore();

    const uploadZip = useCallback(
        async (file: File) => {

            try {

                setLoading(true);

                setStoreLoading(true);

                setError(null);

                const { zip } =
                    await loadInstagramZip(file);

                const exportData =
                    await parseInstagramExport(zip);

                const relationshipAnalysis =
                    analyzeRelationships(
                        exportData
                    );

                const aiResult =
                    generateAIAnalysis(
                        relationshipAnalysis.users
                    );

                const insight =
                    buildRelationshipSummary(
                        aiResult
                    );

                setExportData(exportData);

                setStatistics(
                    relationshipAnalysis.statistics
                );

                setInsight(insight);

                setCurrentFileName(file.name);

                setUploadedAt(
                    new Date().toISOString()
                );

                setAnalysis(
                    relationshipAnalysis
                );

            } catch (err) {

                setError(
                    err instanceof Error
                        ? err.message
                        : "Unable to parse Instagram ZIP."
                );

            }
            // ======================================================
// InsightGram AI
// File : src/hooks/useInstagramZip.ts
// Part : 2
// ======================================================

            finally {

                setLoading(false);

                setStoreLoading(false);

            }

        },
        [

            setExportData,

            setStatistics,

            setInsight,

            setStoreLoading,

            setCurrentFileName,

            setUploadedAt,

        ]
    );

    const reset = useCallback(() => {

        setAnalysis(null);

        setError(null);

        setLoading(false);

        useAppStore.getState().reset();

    }, []);

    return {

        loading,

        error,

        analysis,

        uploadZip,

        reset,

    };

}

export default useInstagramZip;