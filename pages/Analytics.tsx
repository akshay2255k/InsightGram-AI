// ======================================================
// InsightGram AI
// File : src/pages/Analytics.tsx
// ======================================================

import DashboardLayout
    from "../components/Layout/DashboardLayout";

import RelationshipChart
    from "../components/Charts/RelationshipChart";

import OverviewCards
    from "../components/Dashboard/OverviewCards";

import {
    useAppStore,
} from "../store/appStore";

export default function Analytics() {

    const {
        statistics,
    } = useAppStore();

    return (

        <DashboardLayout>

            <div className="page-header">

                <h1>

                    Analytics Dashboard

                </h1>

                <p>

                    Visual insights into your Instagram
                    relationship statistics.

                </p>

            </div>

            {statistics ? (

                <>

                    <OverviewCards
                        interactive={false}
                    />

                    <div
                        style={{
                            marginTop:
                                "24px",
                        }}
                    >

                        <RelationshipChart />

                    </div>

                </>

            ) : (

                <div
                    className="card"
                    style={{
                        padding:
                            "40px",
                        textAlign:
                            "center",
                    }}
                >

                    <h2>

                        No Analytics Available

                    </h2>

                    <p
                        style={{
                            color:
                                "#98A2B3",
                            marginTop:
                                "12px",
                        }}
                    >

                        Upload an official Instagram ZIP
                        export to generate analytics.

                    </p>

                </div>

            )}

        </DashboardLayout>

    );

}