// ======================================================
// InsightGram AI
// File : src/components/Analytics/RelationshipStats.tsx
// ======================================================

import {
    Users,
    UserMinus,
    UserPlus,
    HeartHandshake,
    Clock3,
    UserCheck,
} from "lucide-react";

import { useAppStore } from "../../store/appStore";

export default function RelationshipStats() {

    const { statistics } = useAppStore();

    if (!statistics) {
        return null;
    }

    const totalUsers = Math.max(
        statistics.followers,
        statistics.following
    );

    const calculatePercentage = (value: number) => {

        if (totalUsers === 0) {
            return 0;
        }

        return Math.round(
            (value / totalUsers) * 100
        );

    };

    const stats = [
        {
            title: "Followers",
            value: statistics.followers,
            percentage: calculatePercentage(
                statistics.followers
            ),
            color: "#18C8FF",
            icon: <Users size={24} />,
        },
        {
            title: "Following",
            value: statistics.following,
            percentage: calculatePercentage(
                statistics.following
            ),
            color: "#6D5DF6",
            icon: <UserCheck size={24} />,
        },
        {
            title: "Mutual",
            value: statistics.mutual,
            percentage: calculatePercentage(
                statistics.mutual
            ),
            color: "#34D399",
            icon: <HeartHandshake size={24} />,
        },
        {
            title: "Not Following Back",
            value: statistics.notFollowingBack,
            percentage: calculatePercentage(
                statistics.notFollowingBack
            ),
            color: "#FF5A7A",
            icon: <UserMinus size={24} />,
        },
        {
            title: "You Don't Follow Back",
            value: statistics.youDontFollowBack,
            percentage: calculatePercentage(
                statistics.youDontFollowBack
            ),
            color: "#FBBF24",
            icon: <UserPlus size={24} />,
        },
        {
            title: "Pending Requests",
            value: statistics.pendingRequests,
            percentage: calculatePercentage(
                statistics.pendingRequests
            ),
            color: "#8B5CF6",
            icon: <Clock3 size={24} />,
        },
    ];

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

                    Relationship Statistics

                </h2>

            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(280px,1fr))",
                    gap: "20px",
                }}
            >

                {stats.map((item) => (

                    <div
                        key={item.title}
                        className="glass"
                        style={{
                            padding: "22px",
                            borderRadius: "18px",
                            border: "1px solid rgba(255,255,255,.08)",
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "18px",
                            }}
                        >

                            <div
                                style={{
                                    width: "52px",
                                    height: "52px",
                                    borderRadius: "14px",
                                    background: `${item.color}20`,
                                    color: item.color,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >

                                {item.icon}

                            </div>

                            <h2
                                style={{
                                    margin: 0,
                                }}
                            >

                                {item.value}

                            </h2>

                        </div>

                        <h4>

                            {item.title}

                        </h4>

                        <div
                            style={{
                                width: "100%",
                                height: "8px",
                                borderRadius: "999px",
                                background: "rgba(255,255,255,.08)",
                                overflow: "hidden",
                                marginTop: "16px",
                            }}
                        >

                            <div
                                style={{
                                    width: `${item.percentage}%`,
                                    height: "100%",
                                    background: item.color,
                                    borderRadius: "999px",
                                }}
                            />

                        </div>

                        <div
                            style={{
                                marginTop: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                                color: "#98A2B3",
                                fontSize: "14px",
                            }}
                        >

                            <span>

                                {item.percentage}% of total

                            </span>

                            <span>

                                {item.value}

                            </span>

                        </div>

                    </div>

                ))}

            </div>

        </section>

    );

}