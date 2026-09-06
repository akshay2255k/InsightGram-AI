// ======================================================
// InsightGram AI
// File : src/pages/Requests.tsx
// ======================================================

import DashboardLayout from "../components/Layout/DashboardLayout";

import RequestsHeader from "../components/Requests/RequestsHeader";
import RequestTable from "../components/Requests/RequestTable";

export default function Requests() {

    return (

        <DashboardLayout>

            <RequestsHeader />

            <RequestTable />

        </DashboardLayout>

    );

}