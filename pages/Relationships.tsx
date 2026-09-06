// ======================================================
// InsightGram AI
// File : src/pages/Relationships.tsx
// ======================================================

import DashboardLayout
    from "../components/Layout/DashboardLayout";

import RelationshipHeader
    from "../components/Relationships/RelationshipHeader";

import RelationshipTable
    from "../components/Relationships/RelationshipTable";

export default function Relationships() {

    return (

        <DashboardLayout>

            <div className="page-header">

                <h1>

                    Relationships

                </h1>

                <p>

                    Explore your Instagram relationship network
                    and quickly identify mutual and one-way connections.

                </p>

            </div>

            <RelationshipHeader />

            <RelationshipTable />

        </DashboardLayout>

    );

}