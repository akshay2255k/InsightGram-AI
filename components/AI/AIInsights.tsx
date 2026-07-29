// ======================================================
// InsightGram AI
// File : src/components/AI/AIInsights.tsx
// Part : 1
// ======================================================

import {
    Brain,
    Sparkles,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";

import { useAppStore } from "../../store/appStore";

import {
    getHealthGrade,
    getHealthColor,
    calculateRiskLevel,
    getTopRecommendation,
} from "../../services/aiEngine";

export default function AIInsights() {

    const {

        insight,

    } = useAppStore();

    if (!insight) {

        return null;

    }

    const grade =
        getHealthGrade(
            insight.score
        );

    const color =
        getHealthColor(
            insight.score
        );

    const risk =
        calculateRiskLevel({

            relationshipScore:
                insight.score,

            engagementScore:
                insight.score,

            activityScore:
                insight.score,

            accountHealth:
                insight.score,

            summary:
                insight.summary,

            recommendations:
                insight.recommendations,

        });

    const topRecommendation =
        getTopRecommendation({

            relationshipScore:
                insight.score,

            engagementScore:
                insight.score,

            activityScore:
                insight.score,

            accountHealth:
                insight.score,

            summary:
                insight.summary,

            recommendations:
                insight.recommendations,

        });

    return (

        <section className="card">

            <div className="table-header">

                <h2>

                    <Brain
                        size={22}
                    />

                    {" "}

                    AI Insights

                </h2>

                <span
                    className="badge badge-primary"
                >

                    Powered by AI

                </span>

            </div>
            // ======================================================
// InsightGram AI
// File : src/components/AI/AIInsights.tsx
// Part : 2
// ======================================================

            <div className="ai-summary">

                <div
                    className="ai-score"
                    style={{
                        borderColor: color,
                    }}
                >

                    <h1
                        style={{
                            color,
                        }}
                    >

                        {grade}

                    </h1>

                    <p>

                        {insight.score}% Health

                    </p>

                </div>

                <div className="ai-details">

                    <h3>

                        Overall Assessment

                    </h3>

                    <p>

                        {insight.summary}

                    </p>

                    <div
                        className="badge"
                        style={{
                            marginTop: "12px",
                        }}
                    >

                        Risk Level: {risk}

                    </div>

                </div>

            </div>

            {topRecommendation && (

                <div
                    className="card"
                    style={{
                        marginTop: "20px",
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "10px",
                        }}
                    >

                        <Sparkles
                            size={20}
                        />

                        <strong>

                            Top Recommendation

                        </strong>

                    </div>

                    <h4>

                        {topRecommendation.title}

                    </h4>

                    <p>

                        {topRecommendation.description}

                    </p>

                </div>

            )}
            // ======================================================
// InsightGram AI
// File : src/components/AI/AIInsights.tsx
// Part : 3
// ======================================================

            <div
                className="ai-metrics"
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(180px,1fr))",
                    gap: "16px",
                    marginTop: "24px",
                }}
            >

                <div className="card">

                    <ShieldCheck
                        size={22}
                    />

                    <h4>

                        Account Health

                    </h4>

                    <strong
                        style={{
                            color,
                            fontSize: "24px",
                        }}
                    >

                        {insight.score}%

                    </strong>

                </div>

                <div className="card">

                    <TrendingUp
                        size={22}
                    />

                    <h4>

                        Recommendations

                    </h4>

                    <strong
                        style={{
                            fontSize: "24px",
                        }}
                    >

                        {
                            insight.recommendations
                                .length
                        }

                    </strong>

                </div>

            </div>

        </section>

    );

}