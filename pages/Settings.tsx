// ======================================================
// InsightGram AI
// File : src/pages/Settings.tsx
// Part : 1
// ======================================================

import DashboardLayout from "../components/Layout/DashboardLayout";

import SettingsPanel from "../components/Settings/SettingsPanel";

export default function Settings() {

    return (

        <DashboardLayout>

            <div className="page-header">

                <h1>

                    Application Settings

                </h1>

                <p>

                    Customize your InsightGram AI
                    experience and manage local data.

                </p>

            </div>

            <SettingsPanel />
            // ======================================================
// InsightGram AI
// File : src/pages/Settings.tsx
// Part : 2
// ======================================================

        </DashboardLayout>

    );

}