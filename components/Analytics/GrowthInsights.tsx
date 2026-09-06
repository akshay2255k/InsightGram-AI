// ======================================================
// InsightGram AI
// File : src/components/Analytics/GrowthInsights.tsx
// ======================================================

import {
    TrendingUp,
    TrendingDown,
    Sparkles,
    ShieldCheck,
    TriangleAlert,
    CheckCircle2,
} from "lucide-react";

import { useAppStore } from "../../store/appStore";

export default function GrowthInsights() {

    const {
        statistics,
        insight,
    } = useAppStore();

    if (!statistics || !insight) {
        return null;
    }

    const strengths: string[] = [];

    const improvements: string[] = [];

    if (statistics.relationshipScore >= 80) {

        strengths.push(
            "Excellent relationship score."
        );

    } else {

        improvements.push(
            "Increase your mutual followers."
        );

    }

    if (statistics.notFollowingBack <= 20) {

        strengths.push(
            "Very few one-way followings."
        );

    } else {

        improvements.push(
            "Review accounts that don't follow you back."
        );

    }

    if (statistics.pendingRequests <= 10) {

        strengths.push(
            "Pending requests are under control."
        );

    } else {

        improvements.push(
            "Large number of pending requests."
        );

    }

    if (statistics.closeFriends >= 5) {

        strengths.push(
            "Healthy Close Friends list."
        );

    }

    const trend =
        statistics.relationshipScore >= 70
            ? "Positive"
            : "Needs Improvement";

    return (

        <section
            className="card"
            style={{
                marginTop: "24px",
            }}
        >

            <div
                className="table-header"
                style={{
                    marginBottom: "24px",
                }}
            >

                <h2>

                    <Sparkles
                        size={22}
                    />

                    {" "}

                    Growth Insights

                </h2>

                <span className="badge badge-primary">

                    AI Powered

                </span>

            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(320px,1fr))",
                    gap: "24px",
                }}
            >

                <div
                    className="glass"
                    style={{
                        padding: "24px",
                        borderRadius: "18px",
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "16px",
                        }}
                    >

                        {statistics.relationshipScore >= 70 ? (

                            <TrendingUp
                                color="#34D399"
                                size={26}
                            />

                        ) : (

                            <TrendingDown
                                color="#FF5A7A"
                                size={26}
                            />

                        )}

                        <h3>

                            Growth Trend

                        </h3>

                    </div>

                    <h1
                        style={{
                            marginBottom: "10px",
                            color:
                                statistics.relationshipScore >= 70
                                    ? "#34D399"
                                    : "#FF5A7A",
                        }}
                    >

                        {trend}

                    </h1>

                    <p
                        style={{
                            color: "#98A2B3",
                            lineHeight: 1.8,
                        }}
                    >

                        {insight.summary}

                    </p>

                </div>

                <div
                    className="glass"
                    style={{
                        padding: "24px",
                        borderRadius: "18px",
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "18px",
                        }}
                    >

                        <ShieldCheck
                            color="#34D399"
                            size={24}
                        />

                        <h3>

                            Strengths

                        </h3>

                    </div>

                    {strengths.length === 0 ? (

                        <p
                            style={{
                                color: "#98A2B3",
                            }}
                        >

                            No major strengths detected yet.

                        </p>

                    ) : (

                        strengths.map((item) => (

                            <div
                                key={item}
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginBottom: "14px",
                                    alignItems: "center",
                                }}
                            >

                                <CheckCircle2
                                    size={18}
                                    color="#34D399"
                                />

                                <span>

                                    {item}

                                </span>

                            </div>

                        ))

                    )}

                </div>

                <div
                    className="glass"
                    style={{
                        padding: "24px",
                        borderRadius: "18px",
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "18px",
                        }}
                    >

                        <TriangleAlert
                            color="#FBBF24"
                            size={24}
                        />

                        <h3>

                            Improvement Areas

                        </h3>

                    </div>

                    {improvements.length === 0 ? (

                        <p
                            style={{
                                color: "#98A2B3",
                            }}
                        >

                            Excellent account health.

                        </p>

                    ) : (

                        improvements.map((item) => (

                            <div
                                key={item}
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginBottom: "14px",
                                    alignItems: "center",
                                }}
                            >

                                <TriangleAlert
                                    size={18}
                                    color="#FBBF24"
                                />

                                <span>

                                    {item}

                                </span>

                            </div>

                        ))

                    )}

                </div>

            </div>

            <div
                className="card"
                style={{
                    marginTop: "28px",
                }}
            >

                <h3
                    style={{
                        marginBottom: "16px",
                    }}
                >

                    AI Recommendations

                </h3>

                {insight.recommendations.length === 0 ? (

                    <p>

                        No recommendations available.

                    </p>

                ) : (

                    insight.recommendations.map((recommendation) => (

                        <div
                            key={recommendation.id}
                            style={{
                                padding: "14px 0",
                                borderBottom:
                                    "1px solid rgba(255,255,255,.08)",
                            }}
                        >

                            <strong>

                                {recommendation.title}

                            </strong>

                            <p
                                style={{
                                    marginTop: "6px",
                                    color: "#98A2B3",
                                }}
                            >

                                {recommendation.description}

                            </p>

                        </div>

                    ))

                )}

            </div>

        </section>

    );

}