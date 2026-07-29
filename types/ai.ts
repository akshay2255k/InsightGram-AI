// ======================================================
// InsightGram AI
// File : src/types/ai.ts
// ======================================================

export type AIHealthGrade =
    | "Excellent"
    | "Very Good"
    | "Good"
    | "Average"
    | "Poor";

export type AIRiskLevel =
    | "Low"
    | "Medium"
    | "High"
    | "Critical";

export interface AIRecommendation {

    id: string;

    title: string;

    description: string;

    priority:
        | "low"
        | "medium"
        | "high";

    completed: boolean;

}

export interface AIInsight {

    score: number;

    relationshipScore: number;

    engagementScore: number;

    activityScore: number;

    accountHealth: number;

    summary: string;

    recommendations: AIRecommendation[];

}

export interface AIHealthMetric {

    title: string;

    score: number;

    color: string;

    description?: string;

}

export interface AIRiskAnalysis {

    level: AIRiskLevel;

    score: number;

    reason: string;

}

export interface AITrend {

    title: string;

    value: number;

    direction:
        | "up"
        | "down"
        | "stable";

    description?: string;

}

export interface AIEngineResult {

    insight: AIInsight;

    healthGrade: AIHealthGrade;

    risk: AIRiskAnalysis;

    metrics: AIHealthMetric[];

    trends: AITrend[];

}

export default {};