// ======================================================
// InsightGram AI
// File : src/components/Analytics/AnalyticsSummary.tsx
// ======================================================

import {
    Award,
    Calendar,
    FileArchive,
    Clock3,
    CheckCircle2,
    Activity,
} from "lucide-react";

import { useAppStore } from "../../store/appStore";

export default function AnalyticsSummary() {

    const {

        statistics,

        currentFileName,

        uploadedAt,

        users,

    } = useAppStore();

    if (!statistics) {

        return null;

    }

    const getGrade = () => {

        const score =
            statistics.relationshipScore;

        if (score >= 90) return "A+";

        if (score >= 80) return "A";

        if (score >= 70) return "B";

        if (score >= 60) return "C";

        if (score >= 50) return "D";

        return "F";

    };

    const getHealthColor = () => {

        const score =
            statistics.relationshipScore;

        if (score >= 80) return "#34D399";

        if (score >= 60) return "#FBBF24";

        return "#FF5A7A";

    };

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
                    marginBottom: "28px",
                }}
            >

                <h2>

                    Analytics Summary

                </h2>

                <span className="badge badge-primary">

                    Overview

                </span>

            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(260px,1fr))",
                    gap: "22px",
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

                        <Award
                            size={26}
                            color={getHealthColor()}
                        />

                        <h3>

                            Account Grade

                        </h3>

                    </div>

                    <h1
                        style={{
                            fontSize: "70px",
                            margin: 0,
                            color: getHealthColor(),
                        }}
                    >

                        {getGrade()}

                    </h1>

                    <p
                        style={{
                            marginTop: "14px",
                            color: "#98A2B3",
                        }}
                    >

                        Relationship Score :
                        {" "}
                        <strong>

                            {statistics.relationshipScore}%

                        </strong>

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

                        <Activity
                            size={24}
                            color="#18C8FF"
                        />

                        <h3>

                            Quick Statistics

                        </h3>

                    </div>

                    <div
                        style={{
                            display: "grid",
                            gap: "14px",
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >

                            <span>Total Users</span>

                            <strong>

                                {users.length}

                            </strong>

                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >

                            <span>Followers</span>

                            <strong>

                                {statistics.followers}

                            </strong>

                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >

                            <span>Following</span>

                            <strong>

                                {statistics.following}

                            </strong>

                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >

                            <span>Mutual</span>

                            <strong>

                                {statistics.mutual}

                            </strong>

                        </div>

                    </div>

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

                        <FileArchive
                            size={24}
                            color="#8B5CF6"
                        />

                        <h3>

                            Upload Information

                        </h3>

                    </div>

                    <div
                        style={{
                            display: "grid",
                            gap: "18px",
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                gap: "12px",
                                alignItems: "center",
                            }}
                        >

                            <FileArchive
                                size={18}
                            />

                            <span>

                                {currentFileName ??
                                    "No file"}

                            </span>

                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap: "12px",
                                alignItems: "center",
                            }}
                        >

                            <Calendar
                                size={18}
                            />

                            <span>

                                {uploadedAt
                                    ? new Date(
                                          uploadedAt
                                      ).toLocaleDateString()
                                    : "-"}

                            </span>

                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap: "12px",
                                alignItems: "center",
                            }}
                        >

                            <Clock3
                                size={18}
                            />

                            <span>

                                {uploadedAt
                                    ? new Date(
                                          uploadedAt
                                      ).toLocaleTimeString()
                                    : "-"}

                            </span>

                        </div>

                    </div>

                </div>

            </div>

            <div
                className="glass"
                style={{
                    marginTop: "28px",
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

                    <CheckCircle2
                        size={24}
                        color="#34D399"
                    />

                    <h3>

                        Overall Assessment

                    </h3>

                </div>

                <p
                    style={{
                        lineHeight: 1.8,
                        color: "#98A2B3",
                    }}
                >

                    InsightGram AI analyzed your
                    Instagram relationship network
                    and generated statistics,
                    engagement metrics, AI
                    recommendations, and account
                    health insights. Your overall
                    relationship score is

                    <strong>

                        {" "}
                        {statistics.relationshipScore}%{" "}

                    </strong>

                    based on your followers,
                    following, mutual connections,
                    pending requests, and one-way
                    relationships.

                </p>

            </div>

        </section>

    );

}