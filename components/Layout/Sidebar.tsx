// ======================================================
// InsightGram AI
// File : src/components/Layout/Sidebar.tsx
// ======================================================

import {
    NavLink,
} from "react-router-dom";

import {
    LayoutDashboard,
    Users,
    UserRoundPlus,
    BarChart3,
    GitCompareArrows,
    Download,
    Settings,
} from "lucide-react";

import {
    ROUTES,
} from "../../routes";

import logo from "../../logo.png";

const navigation = [

    {
        title:
            "Dashboard",

        icon:
            LayoutDashboard,

        path:
            ROUTES.HOME,
    },

    {
        title:
            "Relationships",

        icon:
            Users,

        path:
            ROUTES.RELATIONSHIPS,
    },

    {
        title:
            "Requests",

        icon:
            UserRoundPlus,

        path:
            ROUTES.REQUESTS,
    },

    {
        title:
            "Analytics",

        icon:
            BarChart3,

        path:
            ROUTES.ANALYTICS,
    },

    {
        title:
            "Compare",

        icon:
            GitCompareArrows,

        path:
            ROUTES.COMPARE,
    },

    {
        title:
            "Exports",

        icon:
            Download,

        path:
            ROUTES.EXPORTS,
    },

    {
        title:
            "Settings",

        icon:
            Settings,

        path:
            ROUTES.SETTINGS,
    },

];

export default function Sidebar() {

    return (

        <aside
            className="sidebar glass"
        >

            <div
                className="sidebar-header"
            >

                <div
                    className="logo glow-border"
                    style={{
                        width:
                            "90%",
                        height:
                            "116px",
                        padding:
                            0,
                        overflow:
                            "hidden",
                        display:
                            "flex",
                        alignItems:
                            "center",
                        justifyContent:
                            "center",
                    }}
                >

                    <img
                        src={
                            logo
                        }
                        alt="InsightGram"
                        draggable={
                            false
                        }
                        style={{
                            width:
                                "50%",
                            height:
                                "48%",
                            objectFit:
                                "cover",
                            objectPosition:
                                "center",
                            display:
                                "block",
                            transform:
                                "scale(2.15)",
                        }}
                    />

                </div>

            </div>

            <nav
                className="sidebar-nav"
            >

                <ul
                    className="sidebar-menu"
                >

                    {navigation.map(
                        (
                            item
                        ) => {

                            const Icon =
                                item.icon;

                            return (

                                <li
                                    key={
                                        item.path
                                    }
                                    className="sidebar-item"
                                >

                                    <NavLink
                                        to={
                                            item.path
                                        }
                                        className={({
                                            isActive,
                                        }) =>
                                            isActive
                                                ? "sidebar-link active"
                                                : "sidebar-link"
                                        }
                                    >

                                        <Icon
                                            size={
                                                20
                                            }
                                        />

                                        <span>

                                            {
                                                item.title
                                            }

                                        </span>

                                    </NavLink>

                                </li>

                            );

                        }
                    )}

                </ul>

            </nav>

            <div
                className="sidebar-footer"
            >

                <div
                    className="card"
                    style={{
                        marginTop:
                            "-20px",
                        height:
                            "80px",
                    }}
                >

                    <h4
                        style={{
                            marginBottom:
                                "5px",
                            marginTop:
                                "-10px",
                        }}
                    >

                        AI Status

                    </h4>

                    <div
                        style={{
                            display:
                                "flex",
                            alignItems:
                                "center",
                            gap:
                                "10px",
                        }}
                    >

                        <span
                            className="status-dot status-online"
                        />

                        <span>

                            AI Engine Ready

                        </span>

                    </div>

                </div>

                <div
                    className="card"
                    style={{
                        marginTop:
                            "10px",
                    }}
                >

                    <div
                        style={{
                            display:
                                "flex",
                            justifyContent:
                                "space-between",
                            marginBottom:
                                "8px",
                        }}
                    >

                        <span>
                            Version
                        </span>

                        <strong>
                            v1.0.0
                        </strong>

                    </div>

                    <div
                        style={{
                            display:
                                "flex",
                            justifyContent:
                                "space-between",
                        }}
                    >

                        <span>
                            Mode
                        </span>

                        <span
                            className="badge badge-primary"
                        >
                            Offline
                        </span>

                    </div>

                </div>

            </div>

        </aside>

    );

}