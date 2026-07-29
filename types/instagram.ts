// ======================================================
// InsightGram AI
// File : src/types/instagram.ts
// ======================================================

export interface InstagramUser {
    username: string;
    fullName?: string;
    profileUrl: string;
    profilePicture?: string;

    followsYou: boolean;
    youFollow: boolean;

    isPending?: boolean;
    isRecentRequest?: boolean;
    isRecentlyUnfollowed?: boolean;
    isCloseFriend?: boolean;

    reviewed?: boolean;
    favorite?: boolean;
    pinned?: boolean;

    label?: string;
    note?: string;

    createdAt?: string;
    updatedAt?: string;
}

export interface InstagramExport {
    followers: InstagramUser[];
    following: InstagramUser[];
    pendingRequests: InstagramUser[];
    recentRequests: InstagramUser[];
    recentlyUnfollowed: InstagramUser[];
    closeFriends: InstagramUser[];
}

export interface DashboardStatistics {
    followers: number;
    following: number;

    mutual: number;

    notFollowingBack: number;

    youDontFollowBack: number;

    pendingRequests: number;

    recentRequests: number;

    recentlyUnfollowed: number;

    closeFriends: number;

    relationshipScore: number;
}

export interface InsightRecommendation {
    id: string;

    title: string;

    description: string;

    priority: "low" | "medium" | "high";

    completed: boolean;
}

export interface RelationshipInsight {
    score: number;

    summary: string;

    recommendations: InsightRecommendation[];
}

export interface ZipHistory {
    id: string;

    fileName: string;

    importedAt: string;

    statistics: DashboardStatistics;
}