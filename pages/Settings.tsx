// ======================================================
// InsightGram AI
// File : src/pages/Settings.tsx
// ======================================================

import {
    Database,
    Moon,
    Sun,
    Trash2,
    RotateCcw,
    ShieldCheck,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import DashboardLayout
    from "../components/Layout/DashboardLayout";

import {
    useAppStore,
} from "../store/appStore";

import themeService, {
    type AppTheme,
} from "../services/themeService";

export default function Settings() {

    const {
        exportData,
        statistics,
        reset,
    } =
        useAppStore();

    const [
        theme,
        setTheme,
    ] =
        useState<AppTheme>(
            "dark"
        );

    useEffect(() => {

        setTheme(
            themeService.initialize()
        );

    }, []);

    const changeTheme =
        (
            value: AppTheme
        ) => {

            themeService.setTheme(
                value
            );

            setTheme(
                value
            );

        };

    const clearData =
        () => {

            const confirmed =
                window.confirm(
                    "This will remove the currently loaded Instagram data from InsightGram AI. Continue?"
                );

            if (
                !confirmed
            ) {

                return;

            }

            reset();

        };

    const reloadApp =
        () => {

            window.location.reload();

        };

    return (

        <DashboardLayout>

            <div className="page-header">

                <h1>
                    Settings
                </h1>

                <p>
                    Manage the appearance and local data used by InsightGram AI.
                </p>

            </div>

            {/* Appearance */}

            <section
                className="card"
                style={{
                    marginBottom:
                        "24px",
                }}
            >

                <div
                    className="table-header"
                >

                    <div>

                        <h2>
                            Appearance
                        </h2>

                        <p
                            style={{
                                color:
                                    "#98A2B3",
                                marginTop:
                                    "6px",
                            }}
                        >
                            Choose how InsightGram AI looks.
                        </p>

                    </div>

                    {theme ===
                    "dark" ? (
                        <Moon size={22} />
                    ) : (
                        <Sun size={22} />
                    )}

                </div>

                <div
                    style={{
                        display:
                            "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(220px,1fr))",
                        gap:
                            "16px",
                        marginTop:
                            "20px",
                    }}
                >

                    <button
                        type="button"
                        className={
                            theme ===
                            "dark"
                                ? "btn btn-primary"
                                : "btn btn-secondary"
                        }
                        onClick={() =>
                            changeTheme(
                                "dark"
                            )
                        }
                    >

                        <Moon
                            size={
                                18
                            }
                        />

                        Dark Theme

                    </button>

                    <button
                        type="button"
                        className={
                            theme ===
                            "light"
                                ? "btn btn-primary"
                                : "btn btn-secondary"
                        }
                        onClick={() =>
                            changeTheme(
                                "light"
                            )
                        }
                    >

                        <Sun
                            size={
                                18
                            }
                        />

                        Light Theme

                    </button>

                </div>

            </section>

            {/* Data */}

            <section
                className="card"
                style={{
                    marginBottom:
                        "24px",
                }}
            >

                <div
                    className="table-header"
                >

                    <div>

                        <h2>
                            Local Data
                        </h2>

                        <p
                            style={{
                                color:
                                    "#98A2B3",
                                marginTop:
                                    "6px",
                            }}
                        >
                            Your imported data stays in this browser session.
                        </p>

                    </div>

                    <Database
                        size={
                            22
                        }
                    />

                </div>

                <div
                    style={{
                        display:
                            "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(180px,1fr))",
                        gap:
                            "16px",
                        marginTop:
                            "20px",
                    }}
                >

                    <InfoBox
                        title="Followers"
                        value={
                            statistics?.followers ??
                            0
                        }
                    />

                    <InfoBox
                        title="Following"
                        value={
                            statistics?.following ??
                            0
                        }
                    />

                    <InfoBox
                        title="Users"
                        value={
                            exportData
                                ?.followers
                                .length ??
                            0
                        }
                    />

                </div>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={
                        clearData
                    }
                    style={{
                        marginTop:
                            "22px",
                    }}
                >

                    <Trash2
                        size={
                            18
                        }
                    />

                    Clear Imported Data

                </button>

            </section>

            {/* Privacy */}

            <section
                className="card"
                style={{
                    marginBottom:
                        "24px",
                }}
            >

                <div
                    style={{
                        display:
                            "flex",
                        alignItems:
                            "center",
                        gap:
                            "14px",
                    }}
                >

                    <ShieldCheck
                        size={
                            28
                        }
                        color="#34D399"
                    />

                    <div>

                        <h2>
                            Privacy
                        </h2>

                        <p
                            style={{
                                color:
                                    "#98A2B3",
                                marginTop:
                                    "6px",
                            }}
                        >
                            InsightGram AI processes the imported ZIP locally
                            in the browser. No Instagram login is required.
                        </p>

                    </div>

                </div>

            </section>

            {/* Maintenance */}

            <section className="card">

                <h2>
                    Application
                </h2>

                <div
                    style={{
                        display:
                            "grid",
                        gap:
                            "12px",
                        marginTop:
                            "18px",
                    }}
                >

                    <div
                        style={{
                            display:
                                "flex",
                            justifyContent:
                                "space-between",
                            gap:
                                "20px",
                            flexWrap:
                                "wrap",
                        }}
                    >

                        <span>
                            Version
                        </span>

                        <strong>
                            v1.0.0
                        </strong>

                    </div>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={
                            reloadApp
                        }
                    >

                        <RotateCcw
                            size={
                                18
                            }
                        />

                        Reload Application

                    </button>

                </div>

            </section>

        </DashboardLayout>

    );

}

function InfoBox({
    title,
    value,
}: {
    title: string;
    value: number;
}) {

    return (

        <div
            className="glass"
            style={{
                padding:
                    "18px",
                borderRadius:
                    "16px",
            }}
        >

            <small
                style={{
                    color:
                        "#98A2B3",
                }}
            >
                {title}
            </small>

            <strong
                style={{
                    display:
                        "block",
                    fontSize:
                        "26px",
                    marginTop:
                        "8px",
                }}
            >
                {value}
            </strong>

        </div>

    );

}