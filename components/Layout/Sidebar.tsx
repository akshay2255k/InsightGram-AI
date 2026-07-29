// ======================================================
// InsightGram AI
// File : src/components/Layout/Sidebar.tsx
// Part : 1
// ======================================================

import { NavLink } from "react-router-dom";

import {
    Home,
    LayoutDashboard,
    Users,
    UserRoundPlus,
    Brain,
    BarChart3,
    History,
    GitCompareArrows,
    Download,
    Settings,
    Star,
    Tag,
    StickyNote
} from "lucide-react";

import { ROUTES } from "../../routes";

const navigation = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: ROUTES.HOME,
    },
    {
        title: "Overview",
        icon: Home,
        path: ROUTES.OVERVIEW,
    },
    {
        title: "Relationships",
        icon: Users,
        path: ROUTES.RELATIONSHIPS,
    },
    {
        title: "Requests",
        icon: UserRoundPlus,
        path: ROUTES.REQUESTS,
    },
    {
        title: "Analytics",
        icon: BarChart3,
        path: ROUTES.ANALYTICS,
    },
    {
        title: "AI Insights",
        icon: Brain,
        path: ROUTES.AI_INSIGHTS,
    },
    {
        title: "Compare",
        icon: GitCompareArrows,
        path: ROUTES.COMPARE,
    },
    {
        title: "History",
        icon: History,
        path: ROUTES.TIMELINE,
    },
    {
        title: "Favorites",
        icon: Star,
        path: ROUTES.FAVORITES,
    },
    {
        title: "Labels",
        icon: Tag,
        path: ROUTES.LABELS,
    },
    {
        title: "Notes",
        icon: StickyNote,
        path: ROUTES.NOTES,
    },
    {
        title: "Exports",
        icon: Download,
        path: ROUTES.EXPORTS,
    },
    {
        title: "Settings",
        icon: Settings,
        path: ROUTES.SETTINGS,
    },
];

export default function Sidebar() {

    return (

        <aside className="sidebar glass">

            <div className="sidebar-header">

                <div className="logo glow-border">

                    <div className="logo-icon">
                        IG
                    </div>

                    <div>

                        <h2 className="gradient-text">
                            InsightGram
                        </h2>

                        <small>
                            AI Dashboard
                        </small>

                    </div>

                </div>

            </div>

            <nav className="sidebar-nav">
                // ======================================================
// InsightGram AI
// File : src/components/Layout/Sidebar.tsx
// Part : 2
// ======================================================

                <ul className="sidebar-menu">

                    {navigation.map((item) => {

                        const Icon = item.icon;

                        return (

                            <li
                                key={item.path}
                                className="sidebar-item"
                            >

                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "sidebar-link active"
                                            : "sidebar-link"
                                    }
                                >

                                    <Icon
                                        size={20}
                                        strokeWidth={2}
                                    />

                                    <span>
                                        {item.title}
                                    </span>

                                </NavLink>

                            </li>

                        );

                    })}

                </ul>

            </nav>

            <div className="sidebar-footer">

                <div className="card">

                    <h4
                        style={{
                            marginBottom: "8px",
                        }}
                    >
                        AI Status
                    </h4>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >

                        <span className="status-dot status-online" />

                        <span>
                            AI Engine Ready
                        </span>

                    </div>

                </div>
                // ======================================================
// InsightGram AI
// File : src/components/Layout/Sidebar.tsx
// Part : 3
// ======================================================

                </div>

                <div
                    className="card"
                    style={{
                        marginTop: "18px",
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "8px",
                        }}
                    >

                        <span>Version</span>

                        <strong>v1.0.0</strong>

                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >

                        <span>Mode</span>

                        <span className="badge badge-primary">
                            Offline
                        </span>

                    </div>

                </div>

            </div>

        </aside>

    );

}
