// ======================================================
// InsightGram AI
// File : src/services/aiEngine.ts
// ======================================================

import type {
    InsightRecommendation,
    InstagramUser,
    RelationshipInsight,
} from "../types/instagram";

export interface AIAnalysisResult {
    relationshipScore: number;
    activityScore: number;
    engagementScore: number;
    accountHealth: number;
    summary: string;
    recommendations: InsightRecommendation[];
}

export function generateAIAnalysis(
    users: InstagramUser[]
): AIAnalysisResult {

    const mutual = users.filter(
        (user) =>
            user.followsYou &&
            user.youFollow
    ).length;

    const notFollowingBack = users.filter(
        (user) =>
            user.youFollow &&
            !user.followsYou
    ).length;

    const followersOnly = users.filter(
        (user) =>
            user.followsYou &&
            !user.youFollow
    ).length;

    const pending = users.filter(
        (user) => user.isPending
    ).length;

    const relationshipScore =
        users.length === 0
            ? 100
            : Math.round(
                  (mutual / users.length) * 100
              );

    const engagementScore =
        Math.max(
            0,
            Math.min(
                100,
                relationshipScore +
                    Math.min(
                        20,
                        Math.floor(
                            followersOnly * 0.15
                        )
                    ) -
                    Math.min(
                        20,
                        Math.floor(
                            notFollowingBack * 0.08
                        )
                    )
            )
        );

    const activityScore =
        Math.max(
            0,
            100 -
                Math.min(
                    100,
                    pending * 5
                )
        );

    const accountHealth =
        Math.round(
            (
                relationshipScore +
                engagementScore +
                activityScore
            ) / 3
        );

    const recommendations:
        InsightRecommendation[] = [];

    if (notFollowingBack > 0) {

        recommendations.push({
            id: "cleanup",
            title: "Relationship Cleanup",
            description:
                `${notFollowingBack} account(s) don't follow you back.`,
            priority:
                notFollowingBack > 100
                    ? "high"
                    : notFollowingBack > 30
                    ? "medium"
                    : "low",
            completed: false,
        });
    }

    if (followersOnly > 20) {

        recommendations.push({
            id: "follow-back",
            title: "Potential Follow Back",
            description:
                `${followersOnly} people follow you but you don't follow them.`,
            priority: "low",
            completed: false,
        });
    }

    if (pending > 0) {

        recommendations.push({
            id: "pending",
            title: "Pending Requests",
            description:
                `You have ${pending} pending request(s).`,
            priority:
                pending > 20
                    ? "high"
                    : "medium",
            completed: false,
        });
    }

    let summary =
        "Your Instagram relationship network has been analyzed.";

    if (accountHealth >= 90) {

        summary =
            "Excellent relationship health. Your Instagram network looks balanced.";

    } else if (accountHealth >= 75) {

        summary =
            "Good relationship health with a few opportunities for improvement.";

    } else if (accountHealth >= 50) {

        summary =
            "Average relationship health. Reviewing your follow relationships is recommended.";

    } else {

        summary =
            "Relationship health is below average. Reviewing inactive and one-way relationships may help.";

    }

    return {
        relationshipScore,
        engagementScore,
        activityScore,
        accountHealth,
        summary,
        recommendations,
    };
}

export function buildRelationshipSummary(
    result: AIAnalysisResult
): RelationshipInsight {

    return {
        score: result.accountHealth,
        summary: result.summary,
        recommendations:
            result.recommendations,
    };
}

export function getHealthGrade(
    score: number
): "A+" | "A" | "B" | "C" | "D" {

    if (score >= 95) return "A+";
    if (score >= 85) return "A";
    if (score >= 70) return "B";
    if (score >= 50) return "C";

    return "D";
}

export function getHealthColor(
    score: number
): string {

    if (score >= 90) return "#34D399";
    if (score >= 75) return "#18C8FF";
    if (score >= 60) return "#FBBF24";

    return "#FF5A7A";
}

export function calculateRiskLevel(
    result: AIAnalysisResult
): "Low" | "Medium" | "High" {

    if (result.accountHealth >= 80) {
        return "Low";
    }

    if (result.accountHealth >= 60) {
        return "Medium";
    }

    return "High";
}

export function getTopRecommendation(
    result: AIAnalysisResult
): InsightRecommendation | null {

    if (
        result.recommendations.length === 0
    ) {
        return null;
    }

    const priorityOrder = {
        high: 3,
        medium: 2,
        low: 1,
    };

    return [...result.recommendations].sort(
        (a, b) =>
            priorityOrder[b.priority] -
            priorityOrder[a.priority]
    )[0];
}