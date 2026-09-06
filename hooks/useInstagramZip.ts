// ======================================================
// InsightGram AI
// File : src/hooks/useInstagramZip.ts
// ======================================================

import {
    useCallback,
    useState,
} from "react";

import {
    loadInstagramZip,
    parseInstagramExport,
} from "../parser/instagramParser";

import {
    analyzeRelationships,
    generateRelationshipInsight,
    type RelationshipAnalysis,
} from "../services/relationshipEngine";

import {
    generateAIAnalysis,
    buildRelationshipSummary,
} from "../services/aiEngine";

import {
    useAppStore,
} from "../store/appStore";

export interface UseInstagramZipResult {

    loading: boolean;

    error: string | null;

    analysis:
        | RelationshipAnalysis
        | null;

    uploadZip:
        (
            file: File
        ) => Promise<void>;

    reset:
        () => void;

}

export function useInstagramZip():
    UseInstagramZipResult {

    const [
        loading,
        setLoading,
    ] =
        useState(false);

    const [
        error,
        setError,
    ] =
        useState<string | null>(
            null
        );

    const [
        analysis,
        setAnalysis,
    ] =
        useState<RelationshipAnalysis | null>(
            null
        );

    const {

        setExportData,

        setUsers,

        setStatistics,

        setInsight,

        setLoading:
            setStoreLoading,

        setCurrentFileName,

        setUploadedAt,

        clearRequestReviewState,

    } =
        useAppStore();

    const uploadZip =
        useCallback(
            async (
                file: File
            ) => {

                try {

                    if (
                        !file.name
                            .toLowerCase()
                            .endsWith(
                                ".zip"
                            )
                    ) {

                        throw new Error(
                            "Please upload a valid Instagram ZIP file."
                        );

                    }

                    setLoading(
                        true
                    );

                    setStoreLoading(
                        true
                    );

                    setError(
                        null
                    );

                    clearRequestReviewState();

                    const {
                        zip,
                    } =
                        await loadInstagramZip(
                            file
                        );

                    const exportData =
                        await parseInstagramExport(
                            zip
                        );

                    const relationshipAnalysis =
                        analyzeRelationships(
                            exportData
                        );

                    const aiResult =
                        generateAIAnalysis(
                            relationshipAnalysis.users
                        );

                    const aiSummary =
                        buildRelationshipSummary(
                            aiResult
                        );

                    const relationshipInsight =
                        generateRelationshipInsight(
                            relationshipAnalysis
                        );

                    setExportData(
                        exportData
                    );

                    setUsers(
                        relationshipAnalysis.users
                    );

                    setStatistics(
                        relationshipAnalysis.statistics
                    );

                    setInsight({

                        score:
                            aiSummary.score,

                        summary:
                            aiSummary.summary,

                        recommendations:
                            aiSummary
                                .recommendations,

                    });

                    setCurrentFileName(
                        file.name
                    );

                    setUploadedAt(
                        new Date().toISOString()
                    );

                    setAnalysis(
                        relationshipAnalysis
                    );

                    void relationshipInsight;

                } catch (
                    err
                ) {

                    const message =
                        err instanceof Error
                            ? err.message
                            : "Unable to parse Instagram ZIP.";

                    console.error(
                        "Instagram ZIP parsing failed:",
                        err
                    );

                    setError(
                        message
                    );

                } finally {

                    setLoading(
                        false
                    );

                    setStoreLoading(
                        false
                    );

                }

            },
            [

                setExportData,

                setUsers,

                setStatistics,

                setInsight,

                setStoreLoading,

                setCurrentFileName,

                setUploadedAt,

                clearRequestReviewState,

            ]
        );

    const reset =
        useCallback(
            () => {

                useAppStore
                    .getState()
                    .reset();

                setAnalysis(
                    null
                );

                setError(
                    null
                );

                setLoading(
                    false
                );

            },
            []
        );

    return {

        loading,

        error,

        analysis,

        uploadZip,

        reset,

    };

}

export default useInstagramZip;