// ======================================================
// InsightGram AI
// File : src/components/AI/AIInsights.tsx
// ======================================================

import {
    Brain,
    Sparkles,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";

import {
    useAppStore,
} from "../../store/appStore";

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

    const aiResult = {

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

    };

    const risk =
        calculateRiskLevel(
            aiResult
        );

    const topRecommendation =
        getTopRecommendation(
            aiResult
        );

    return (

        <section
            className="card"
            style={{
                height:
                    "fit-content",
                alignSelf:
                    "start",
            }}
        >

            <div
                className="table-header"
            >

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

                    AI Analysis

                </span>

            </div>

            <div
                className="ai-summary"
                style={{
                    display:
                        "flex",
                    gap:
                        "20px",
                    alignItems:
                        "center",
                    marginTop:
                        "20px",
                    flexWrap:
                        "wrap",
                }}
            >

                <div
                    className="ai-score"
                    style={{
                        width:
                            "100px",
                        height:
                            "100px",
                        borderRadius:
                            "50%",
                        border:
                            `4px solid ${color}`,
                        display:
                            "flex",
                        flexDirection:
                            "column",
                        alignItems:
                            "center",
                        justifyContent:
                            "center",
                        flexShrink:
                            0,
                    }}
                >

                    <strong
                        style={{
                            color,
                            fontSize:
                                "26px",
                        }}
                    >

                        {grade}

                    </strong>

                    <small>

                        {insight.score}%

                    </small>

                </div>

                <div
                    style={{
                        flex:
                            1,
                        minWidth:
                            "220px",
                    }}
                >

                    <h3>

                        Overall Assessment

                    </h3>

                    <p
                        style={{
                            color:
                                "#98A2B3",
                            marginTop:
                                "8px",
                            lineHeight:
                                "1.6",
                        }}
                    >

                        {
                            insight.summary
                        }

                    </p>

                    <span
                        className="badge"
                        style={{
                            marginTop:
                                "12px",
                        }}
                    >

                        Risk Level: {risk}

                    </span>

                </div>

            </div>

            {topRecommendation && (

                <div
                    className="glass"
                    style={{
                        marginTop:
                            "20px",
                        padding:
                            "18px",
                        borderRadius:
                            "16px",
                    }}
                >

                    <div
                        style={{
                            display:
                                "flex",
                            alignItems:
                                "center",
                            gap:
                                "10px",
                            marginBottom:
                                "10px",
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

                        {
                            topRecommendation.title
                        }

                    </h4>

                    <p
                        style={{
                            color:
                                "#98A2B3",
                            marginTop:
                                "6px",
                        }}
                    >

                        {
                            topRecommendation.description
                        }

                    </p>

                </div>

            )}

            <div
                style={{
                    display:
                        "grid",
                    gridTemplateColumns:
                        "repeat(2,minmax(0,1fr))",
                    gap:
                        "14px",
                    marginTop:
                        "18px",
                }}
            >

                <div
                    className="glass"
                    style={{
                        padding:
                            "16px",
                        borderRadius:
                            "14px",
                    }}
                >

                    <ShieldCheck
                        size={20}
                    />

                    <small
                        style={{
                            display:
                                "block",
                            color:
                                "#98A2B3",
                            marginTop:
                                "7px",
                        }}
                    >

                        Account Health

                    </small>

                    <strong
                        style={{
                            display:
                                "block",
                            fontSize:
                                "22px",
                            marginTop:
                                "5px",
                        }}
                    >

                        {insight.score}%

                    </strong>

                </div>

                <div
                    className="glass"
                    style={{
                        padding:
                            "16px",
                        borderRadius:
                            "14px",
                    }}
                >

                    <TrendingUp
                        size={20}
                    />

                    <small
                        style={{
                            display:
                                "block",
                            color:
                                "#98A2B3",
                            marginTop:
                                "7px",
                        }}
                    >

                        Recommendations

                    </small>

                    <strong
                        style={{
                            display:
                                "block",
                            fontSize:
                                "22px",
                            marginTop:
                                "5px",
                        }}
                    >

                        {
                            insight
                                .recommendations
                                .length
                        }

                    </strong>

                </div>

            </div>

        </section>

    );

}