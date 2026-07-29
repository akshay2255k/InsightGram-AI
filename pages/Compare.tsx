// ======================================================
// InsightGram AI
// File : src/pages/Compare.tsx
// Part : 1
// ======================================================

import DashboardLayout from "../components/Layout/DashboardLayout";

import { GitCompareArrows } from "lucide-react";

import { useAppStore } from "../store/appStore";

export default function Compare() {

    const {

        statistics,

    } = useAppStore();

    return (

        <DashboardLayout>

            <div className="page-header">

                <h1>

                    Compare Instagram Exports

                </h1>

                <p>

                    Compare two or more Instagram ZIP
                    exports to track relationship
                    changes over time.

                </p>

            </div>

            <section className="card">

                <div className="table-header">

                    <h2>

                        <GitCompareArrows
                            size={22}
                        />

                        {" "}

                        Export Comparison

                    </h2>

                </div>

                {statistics ? (

                    <div
                        className="comparison-grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(220px,1fr))",
                            gap: "20px",
                        }}
                    >
                        // ======================================================
// InsightGram AI
// File : src/pages/Compare.tsx
// Part : 2
// ======================================================

                        <div className="card">

                            <h3>

                                Current Export

                            </h3>

                            <p>

                                Followers: {statistics.followers}

                            </p>

                            <p>

                                Following: {statistics.following}

                            </p>

                            <p>

                                Relationship Score: {statistics.relationshipScore}%

                            </p>

                        </div>

                        <div className="card">

                            <h3>

                                Previous Export

                            </h3>

                            <p>

                                Import another Instagram ZIP
                                to compare historical changes.

                            </p>

                        </div>

                    </div>

                ) : (

                    <div
                        className="empty-state"
                        style={{
                            padding: "40px",
                            textAlign: "center",
                        }}
                    >

                        <p>

                            Upload an Instagram export to
                            start comparing datasets.

                        </p>

                    </div>

                )}

            </section>

        </DashboardLayout>

    );

}