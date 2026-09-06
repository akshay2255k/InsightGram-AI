
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

                    <OverviewCards />

                    <div className="dashboard-grid">

                        <RelationshipChart />

                        <AIInsights />

                    </div>

                </>

            )}

        </DashboardLayout>

    );

}