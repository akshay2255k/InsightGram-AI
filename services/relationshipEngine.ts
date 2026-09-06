// ======================================================
// InsightGram AI
// File : src/services/relationshipEngine.ts
// ======================================================

import type {
    DashboardStatistics,
    InsightRecommendation,
    InstagramExport,
    InstagramUser,
    RelationshipInsight,
} from "../types/instagram";

import {
    buildRelationshipMap,
    calculateRelationshipScore,
    getNotFollowingBack,
    getYouDontFollowBack,
} from "../parser/instagramParser";

export interface RelationshipAnalysis {
    users: InstagramUser[];
    notFollowingBack: InstagramUser[];
    youDontFollowBack: InstagramUser[];
    mutualFollowers: InstagramUser[];
    statistics: DashboardStatistics;
}

export function analyzeRelationships(
    data: InstagramExport
): RelationshipAnalysis {

    const users = buildRelationshipMap(data);

    const notFollowingBack =
        getNotFollowingBack(users);

    const youDontFollowBack =
        getYouDontFollowBack(users);

    const mutualFollowers = users.filter(
        (user) =>
            user.followsYou &&
            user.youFollow
    );

    const statistics: DashboardStatistics = {
        followers: data.followers.length,
        following: data.following.length,
        mutual: mutualFollowers.length,
        notFollowingBack:
            notFollowingBack.length,
        youDontFollowBack:
            youDontFollowBack.length,
        pendingRequests:
            data.pendingRequests.length,
        recentRequests:
            data.recentRequests.length,
        recentlyUnfollowed:
            data.recentlyUnfollowed.length,
        closeFriends:
            data.closeFriends.length,
        relationshipScore:
            calculateRelationshipScore(users),
    };

    return {
        users,
        notFollowingBack,
        youDontFollowBack,
        mutualFollowers,
        statistics,
    };
}

export function generateRelationshipInsight(
    analysis: RelationshipAnalysis
): RelationshipInsight {

    const recommendations: InsightRecommendation[] = [];

    if (analysis.notFollowingBack.length > 0) {

        const count =
            analysis.notFollowingBack.length;

        recommendations.push({
            id: "not-following-back",
            title: "Review One-way Following",
            description:
                `You are following ${count} account(s) that don't follow you back.`,
            priority:
                count > 100
                    ? "high"
                    : count > 30
                    ? "medium"
                    : "low",
            completed: false,
        });
    }

    if (analysis.youDontFollowBack.length > 0) {

        recommendations.push({
            id: "follow-back",
            title: "Review Your Followers",
            description:
                `${analysis.youDontFollowBack.length} follower(s) follow you, but you don't follow them back.`,
            priority: "low",
            completed: false,
        });
    }

    if (analysis.statistics.pendingRequests > 0) {

        recommendations.push({
            id: "pending-requests",
            title: "Pending Requests",
            description:
                `You have ${analysis.statistics.pendingRequests} pending follow request(s).`,
            priority: "medium",
            completed: false,
        });
    }

    if (analysis.statistics.recentlyUnfollowed > 0) {

        recommendations.push({
            id: "recently-unfollowed",
            title: "Recently Unfollowed",
            description:
                `${analysis.statistics.recentlyUnfollowed} recently unfollowed profile(s) were found.`,
            priority: "low",
            completed: false,
        });
    }

    if (analysis.statistics.closeFriends > 0) {

        recommendations.push({
            id: "close-friends",
            title: "Close Friends",
            description:
                `${analysis.statistics.closeFriends} close friend(s) were detected.`,
            priority: "low",
            completed: false,
        });
    }

    const summary =
        `Relationship Score: ${analysis.statistics.relationshipScore}% • ` +
        `${analysis.statistics.followers} followers • ` +
        `${analysis.statistics.following} following • ` +
        `${analysis.mutualFollowers.length} mutual connection(s).`;

    return {
        score:
            analysis.statistics.relationshipScore,
        summary,
        recommendations,
    };
}

export function getMutualFollowers(
    users: InstagramUser[]
): InstagramUser[] {
    return users.filter(
        (user) =>
            user.followsYou &&
            user.youFollow
    );
}