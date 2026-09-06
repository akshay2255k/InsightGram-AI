// ======================================================
// InsightGram AI
// File : src/components/Compare/CompareHeader.tsx
// ======================================================

import {
    GitCompare,
    TrendingUp,
    ArrowLeftRight,
} from "lucide-react";

export default function CompareHeader() {

    return (

        <section
            className="card"
            style={{
                marginBottom: "28px",
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "24px",
                }}
            >

                <div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                            marginBottom: "12px",
                        }}
                    >

                        <GitCompare
                            size={34}
                            color="#6D5DF6"
                        />

                        <h1
                            style={{
                                margin: 0,
                            }}
                        >

                            Compare Instagram Exports

                        </h1>

                    </div>

                    <p
                        style={{
                            color: "#98A2B3",
                            margin: 0,
                            lineHeight: 1.8,
                            maxWidth: "700px",
                        }}
                    >

                        Upload two Instagram ZIP exports and
                        compare followers, following,
                        unfollowers, growth, engagement
                        and relationship changes between them.

                    </p>

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "16px",
                        flexWrap: "wrap",
                    }}
                >

                    <div
                        className="glass"
                        style={{
                            padding: "18px 24px",
                            borderRadius: "18px",
                            textAlign: "center",
                        }}
                    >

                        <TrendingUp
                            size={26}
                            color="#34D399"
                        />

                        <h3
                            style={{
                                margin: "12px 0 4px",
                            }}
                        >

                            Growth

                        </h3>

                        <small
                            style={{
                                color: "#98A2B3",
                            }}
                        >

                            Followers & Following

                        </small>

                    </div>

                    <div
                        className="glass"
                        style={{
                            padding: "18px 24px",
                            borderRadius: "18px",
                            textAlign: "center",
                        }}
                    >

                        <ArrowLeftRight
                            size={26}
                            color="#18C8FF"
                        />

                        <h3
                            style={{
                                margin: "12px 0 4px",
                            }}
                        >

                            Compare

                        </h3>

                        <small
                            style={{
                                color: "#98A2B3",
                            }}
                        >

                            Before vs After

                        </small>

                    </div>

                </div>

            </div>

        </section>

    );

}