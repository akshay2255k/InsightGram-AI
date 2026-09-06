// ======================================================
// InsightGram AI
// File : src/store/appStore.ts
// ======================================================

import { create } from "zustand";

import type {
    DashboardStatistics,
    InstagramExport,
    RelationshipInsight,
    InstagramUser,
} from "../types/instagram";

export type RelationshipFilter =
    | "all"
    | "mutual"
    | "notFollowingBack"
    | "youDontFollowBack";

export type RequestFilter =
    | "all"
    | "pending"
    | "recent"
    | "closeFriend"
    | "recentlyUnfollowed";

export type RequestReviewKey =
    | "pending"
    | "recent"
    | "closeFriend"
    | "recentlyUnfollowed";

type RequestReviewState =
    Record<string, boolean>;

const REVIEW_STORAGE_KEY =
    "insightgram_request_review_state";

function loadReviewState():
    RequestReviewState {

    try {

        const raw =
            localStorage.getItem(
                REVIEW_STORAGE_KEY
            );

        if (!raw) {

            return {};

        }

        const parsed =
            JSON.parse(raw);

        if (
            parsed &&
            typeof parsed === "object" &&
            !Array.isArray(parsed)
        ) {

            return parsed as RequestReviewState;

        }

        return {};

    } catch {

        return {};

    }

}

function saveReviewState(
    state: RequestReviewState
): void {

    localStorage.setItem(
        REVIEW_STORAGE_KEY,
        JSON.stringify(state)
    );

}

function reviewKey(
    type: RequestReviewKey,
    username: string
): string {

    return `${type}:${username
        .trim()
        .toLowerCase()}`;

}

function countRemaining(
    users: InstagramUser[],
    type: RequestReviewKey,
    reviewState: RequestReviewState
): number {

    return users.filter(
        (user) =>
            !reviewState[
                reviewKey(
                    type,
                    user.username
                )
            ]
    ).length;

}

interface AppState {

    exportData: InstagramExport | null;

    users: InstagramUser[];

    statistics:
        | DashboardStatistics
        | null;

    insight:
        | RelationshipInsight
        | null;

    loading: boolean;

    initialized: boolean;

    currentFileName: string | null;

    uploadedAt: string | null;

    searchQuery: string;

    relationshipFilter:
        RelationshipFilter;

    requestReviewState:
        RequestReviewState;

    setExportData: (
        data: InstagramExport | null
    ) => void;

    setUsers: (
        users: InstagramUser[]
    ) => void;

    setStatistics: (
        statistics:
            | DashboardStatistics
            | null
    ) => void;

    setInsight: (
        insight:
            | RelationshipInsight
            | null
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

    setSearchQuery: (
        value: string
    ) => void;

    setRelationshipFilter: (
        filter: RelationshipFilter
    ) => void;

    setRequestReviewed: (
        type: RequestReviewKey,
        username: string,
        reviewed: boolean
    ) => void;

    isRequestReviewed: (
        type: RequestReviewKey,
        username: string
    ) => boolean;

    clearRequestReviewState: () => void;

    reset: () => void;

}

export const useAppStore =
    create<AppState>((set, get) => ({

        exportData: null,

        users: [],

        statistics: null,

        insight: null,

        loading: false,

        initialized: false,

        currentFileName: null,

        uploadedAt: null,

        searchQuery: "",

        relationshipFilter: "all",

        requestReviewState:
            loadReviewState(),

        setExportData: (
            data
        ) =>
            set({
                exportData: data,
            }),

        setUsers: (
            users
        ) =>
            set({
                users,
            }),

        setStatistics: (
            statistics
        ) =>
            set({
                statistics,
            }),

        setInsight: (
            insight
        ) =>
            set({
                insight,
            }),

        setLoading: (
            loading
        ) =>
            set({
                loading,
            }),

        setInitialized: (
            initialized
        ) =>
            set({
                initialized,
            }),

        setCurrentFileName: (
            currentFileName
        ) =>
            set({
                currentFileName,
            }),

        setUploadedAt: (
            uploadedAt
        ) =>
            set({
                uploadedAt,
            }),

        setSearchQuery: (
            value
        ) =>
            set({
                searchQuery: value,
            }),

        setRelationshipFilter: (
            filter
        ) =>
            set({
                relationshipFilter:
                    filter,
            }),

        setRequestReviewed: (
            type,
            username,
            reviewed
        ) => {

            const currentState =
                get().requestReviewState;

            const key =
                reviewKey(
                    type,
                    username
                );

            const nextState = {
                ...currentState,
                [key]: reviewed,
            };

            if (!reviewed) {

                delete nextState[key];

            }

            saveReviewState(
                nextState
            );

            const currentStatistics =
                get().statistics;

            const exportData =
                get().exportData;

            if (
                currentStatistics &&
                exportData
            ) {

                const nextStatistics: DashboardStatistics = {

                    ...currentStatistics,

                    pendingRequests:
                        countRemaining(
                            exportData.pendingRequests,
                            "pending",
                            nextState
                        ),

                    recentRequests:
                        countRemaining(
                            exportData.recentRequests,
                            "recent",
                            nextState
                        ),

                    recentlyUnfollowed:
                        countRemaining(
                            exportData.recentlyUnfollowed,
                            "recentlyUnfollowed",
                            nextState
                        ),

                    closeFriends:
                        countRemaining(
                            exportData.closeFriends,
                            "closeFriend",
                            nextState
                        ),

                };

                set({

                    requestReviewState:
                        nextState,

                    statistics:
                        nextStatistics,

                });

                return;

            }

            set({

                requestReviewState:
                    nextState,

            });

        },

        isRequestReviewed: (
            type,
            username
        ) => {

            return Boolean(
                get()
                    .requestReviewState[
                    reviewKey(
                        type,
                        username
                    )
                ]
            );

        },

        clearRequestReviewState: () => {

            localStorage.removeItem(
                REVIEW_STORAGE_KEY
            );

            set({
                requestReviewState: {},
            });

        },

        reset: () => {

            localStorage.removeItem(
                REVIEW_STORAGE_KEY
            );

            set({

                exportData: null,

                users: [],

                statistics: null,

                insight: null,

                loading: false,

                initialized: false,

                currentFileName:
                    null,

                uploadedAt: null,

                searchQuery: "",

                relationshipFilter:
                    "all",

                requestReviewState:
                    {},

            });

        },

    }));

export default useAppStore;