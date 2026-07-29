// ======================================================
// InsightGram AI
// File : src/pages/Home.tsx
// Part : 1
// ======================================================

import DashboardLayout from "../components/Layout/DashboardLayout";
import UploadZone from "../components/Upload/UploadZone";
import OverviewCards from "../components/Dashboard/OverviewCards";
import RelationshipChart from "../components/Charts/RelationshipChart";
import AIInsights from "../components/AI/AIInsights";

import { useAppStore } from "../store/appStore";

export default function Home() {

    const {

        exportData,

    } = useAppStore();

    return (

        <DashboardLayout>

            {!exportData ? (

                <UploadZone />

            ) : (

                <>
                // ======================================================
// InsightGram AI
// File : src/pages/Home.tsx
// Part : 2
// ======================================================

                    <OverviewCards />

                    <div
                        className="dashboard-grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "2fr 1fr",
                            gap: "24px",
                            marginTop: "24px",
                        }}
                    >

                        <RelationshipChart />

                        <AIInsights />

                    </div>
                    // ======================================================
// InsightGram AI
// File : src/pages/Home.tsx
// Part : 3
// ======================================================

                </>

            )}

        </DashboardLayout>

    );

}