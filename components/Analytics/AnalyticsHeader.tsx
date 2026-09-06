// ======================================================
// InsightGram AI
// File : src/components/Analytics/AnalyticsHeader.tsx
// ======================================================

import {
    Users,
    UserPlus,
    HeartHandshake,
    Brain,
} from "lucide-react";

import { useAppStore } from "../../store/appStore";

export default function AnalyticsHeader() {

    const {
        statistics,
        uploadedAt,
    } = useAppStore();

    if (!statistics) {
        return null;
    }

    const mutualPercentage =
        statistics.followers > 0
            ? Math.round(
                  (statistics.mutual /
                      statistics.followers) *
                      100
              )
            : 0;

    const cards = [
        {
            title: "Followers",
            value: statistics.followers,
            color: "#18C8FF",
            icon: <Users size={22} />,
        },
        {
            title: "Following",
            value: statistics.following,
            color: "#6D5DF6",
            icon: <UserPlus size={22} />,
        },
        {
            title: "Mutual %",
            value: `${mutualPercentage}%`,
            color: "#34D399",
            icon: <HeartHandshake size={22} />,
        },
        {
            title: "Relationship Score",
            value: `${statistics.relationshipScore}%`,
            color: "#FBBF24",
            icon: <Brain size={22} />,
        },
    ];

    return (

        <>

            <section
                className="analytics-header"
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(240px,1fr))",
                    gap: "20px",
                    marginBottom: "28px",
                }}
            >

                {cards.map((card) => (

                    <div
                        key={card.title}
                        className="card"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >

                        <div>

                            <small
                                style={{
                                    color: "#98A2B3",
                                    display: "block",
                                    marginBottom: "8px",
                                }}
                            >
                                {card.title}
                            </small>

                            <h2
                                style={{
                                    margin: 0,
                                    fontSize: "34px",
                                }}
                            >
                                {card.value}
                            </h2>

                        </div>

                        <div
                            style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "18px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: `${card.color}20`,
                                color: card.color,
                            }}
                        >
                            {card.icon}
                        </div>

                    </div>

                ))}

            </section>

            <section
                className="card"
                style={{
                    marginBottom: "30px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "20px",
                }}
            >

                <div>

                    <small
                        style={{
                            color: "#98A2B3",
                        }}
                    >
                        AI Status
                    </small>

                    <h3
                        style={{
                            marginTop: "8px",
                        }}
                    >
                        🟢 AI Analysis Ready
                    </h3>

                </div>

                <div
                    style={{
                        textAlign: "right",
                    }}
                >

                    <small
                        style={{
                            color: "#98A2B3",
                        }}
                    >
                        Last Upload
                    </small>

                    <h4
                        style={{
                            marginTop: "8px",
                        }}
                    >
                        {uploadedAt
                            ? new Date(uploadedAt).toLocaleString()
                            : "-"}
                    </h4>

                </div>

            </section>

        </>

    );

}