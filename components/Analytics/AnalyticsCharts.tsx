// ======================================================
// InsightGram AI
// File : src/components/Analytics/AnalyticsCharts.tsx
// Part : 1
// ======================================================

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    BarChart,
    Bar,
} from "recharts";

import { useMemo } from "react";

import { useAppStore } from "../../store/appStore";

const COLORS = [
    "#18C8FF",
    "#34D399",
    "#FF5A7A",
    "#FBBF24",
    "#6D5DF6",
];

export default function AnalyticsCharts() {

    const {
        statistics,
    } = useAppStore();

    if (!statistics) {
        return null;
    }

    const relationshipData = useMemo(
        () => [
            {
                name: "Mutual",
                value: statistics.mutual,
            },
            {
                name: "Not Following Back",
                value: statistics.notFollowingBack,
            },
            {
                name: "You Don't Follow Back",
                value: statistics.youDontFollowBack,
            },
            {
                name: "Pending",
                value: statistics.pendingRequests,
            },
        ],
        [statistics]
    );

    const comparisonData = useMemo(
        () => [
            {
                name: "Followers",
                value: statistics.followers,
            },
            {
                name: "Following",
                value: statistics.following,
            },
            {
                name: "Mutual",
                value: statistics.mutual,
            },
            {
                name: "Close Friends",
                value: statistics.closeFriends,
            },
        ],
        [statistics]
    );

    const overviewData = useMemo(
        () => [
            {
                label: "Followers",
                total: statistics.followers,
            },
            {
                label: "Following",
                total: statistics.following,
            },
            {
                label: "Pending",
                total: statistics.pendingRequests,
            },
            {
                label: "Recent",
                total: statistics.recentRequests,
            },
            {
                label: "Unfollowed",
                total: statistics.recentlyUnfollowed,
            },
        ],
        [statistics]
    );

    return (

        <section
            className="analytics-grid"
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(auto-fit,minmax(420px,1fr))",
                gap: "24px",
            }}
        >

            <div className="card">

                <h3
                    style={{
                        marginBottom: "20px",
                    }}
                >
                    Relationship Distribution
                </h3>

                <div
                    style={{
                        width: "100%",
                        height: "360px",
                    }}
                >

                    <ResponsiveContainer>

                        <PieChart>

                            <Pie
                                data={relationshipData}
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                dataKey="value"
                                label
                            >

                                {relationshipData.map(
                                    (_, index) => (
                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[
                                                    index %
                                                        COLORS.length
                                                ]
                                            }
                                        />
                                    )
                                )}

                            </Pie>

                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>

            <div className="card">

                <h3
                    style={{
                        marginBottom: "20px",
                    }}
                >
                    Followers Overview
                </h3>

                <div
                    style={{
                        width: "100%",
                        height: "360px",
                    }}
                >

                    <ResponsiveContainer>

                        <LineChart
                            data={overviewData}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="label"
                            />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="#18C8FF"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>
                        <div className="card">

                <h3
                    style={{
                        marginBottom: "20px",
                    }}
                >
                    Relationship Comparison
                </h3>

                <div
                    style={{
                        width: "100%",
                        height: "360px",
                    }}
                >

                    <ResponsiveContainer>

                        <BarChart
                            data={comparisonData}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="name"
                            />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Bar
                                dataKey="value"
                                radius={[
                                    8,
                                    8,
                                    0,
                                    0,
                                ]}
                            >

                                {comparisonData.map(
                                    (_, index) => (

                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[
                                                    index %
                                                        COLORS.length
                                                ]
                                            }
                                        />

                                    )
                                )}

                            </Bar>

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

            <div
                className="card"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    minHeight: "360px",
                }}
            >

                <h3>

                    Relationship Score

                </h3>

                <h1
                    style={{
                        fontSize: "72px",
                        margin: "24px 0",
                        color: "#18C8FF",
                    }}
                >

                    {statistics.relationshipScore}%

                </h1>

                <p
                    style={{
                        maxWidth: "340px",
                        color: "#98A2B3",
                        lineHeight: 1.8,
                    }}
                >

                    Your relationship score is calculated
                    from your mutual followers, one-way
                    following accounts, pending requests,
                    and overall account connections.

                </p>

            </div>

        </section>

    );

}