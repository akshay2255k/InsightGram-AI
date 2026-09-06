// ======================================================
// InsightGram AI
// File : src/pages/Overview.tsx
// ======================================================

import DashboardLayout from "../components/Layout/DashboardLayout";

import OverviewCards from "../components/Dashboard/OverviewCards";

import RelationshipChart
    from "../components/Charts/RelationshipChart";

import AIInsights
    from "../components/AI/AIInsights";

import UploadZone
    from "../components/Upload/UploadZone";

import {
    useAppStore,
} from "../store/appStore";

export default function Overview() {

    const {
        statistics,
        exportData,
    } = useAppStore();

    return (

        <DashboardLayout>

            <div className="page-header">

                <h1>

                    Instagram Overview

                </h1>

                <p>

                    Complete overview of your Instagram
                    relationship network.

                </p>

            </div>

            {!exportData || !statistics ? (

                <UploadZone />

            ) : (

                <>

                    <OverviewCards />

                    <div
                        className="dashboard-grid"
                        style={{
                            marginTop:
                                "24px",
                        }}
                    >

                        <RelationshipChart />

                        <AIInsights />

                    </div>

                </>

            )}

        </DashboardLayout>

    );

}