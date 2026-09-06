// ======================================================
// InsightGram AI
// File : src/components/Layout/DashboardLayout.tsx
// ======================================================

import {
    type ReactNode,
    useEffect,
} from "react";

import Sidebar from "./Sidebar";

import Topbar from "./Topbar";

import themeService from "../../services/themeService";

interface DashboardLayoutProps {

    children: ReactNode;

}

export default function DashboardLayout({

    children,

}: DashboardLayoutProps) {

    useEffect(() => {

        themeService.initialize();

    }, []);

    return (

        <div className="dashboard-layout">

            <Sidebar />

            <div className="dashboard-main">

                <Topbar />

                <main className="dashboard-content">

                    <div className="fade">

                        {children}

                    </div>

                </main>

            </div>

        </div>

    );

}