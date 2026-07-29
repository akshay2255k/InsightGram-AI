// ======================================================
// InsightGram AI
// File : src/components/Layout/DashboardLayout.tsx
// Part : 1
// ======================================================

import {
    type ReactNode,
    useState,
} from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardLayoutProps {

    children: ReactNode;

}

export default function DashboardLayout({

    children,

}: DashboardLayoutProps) {

    const [

        darkMode,

        setDarkMode,

    ] = useState(true);

    const toggleTheme = () => {

        document.body.classList.toggle(
            "light-theme"
        );

        setDarkMode(
            (previous) => !previous
        );

    };

    return (

        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-main">

                <Topbar

                    darkMode={darkMode}

                    onToggleTheme={toggleTheme}

                />

                <main className="dashboard-content">
                    // ======================================================
// InsightGram AI
// File : src/components/Layout/DashboardLayout.tsx
// Part : 2
// ======================================================

                    <div className="fade">

                        {children}

                    </div>

                </main>

            </div>

        </div>

    );

}