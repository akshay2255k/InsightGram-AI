// ======================================================
// InsightGram AI
// File : src/pages/Exports.tsx
// ======================================================

import {
    Check,
    Clipboard,
    Download,
    FileJson,
    FileText,
    Loader2,
} from "lucide-react";

import {
    useState,
    type ReactNode,
} from "react";

import DashboardLayout
    from "../components/Layout/DashboardLayout";

import {
    useAppStore,
} from "../store/appStore";

import {
    exportService,
    exportAsPDF,
} from "../services/exportService";

export default function Exports() {

    const {

        users,

        statistics,

        currentFileName,

    } =
        useAppStore();

    const [
        busy,
        setBusy,
    ] =
        useState<string | null>(
            null
        );

    const [
        copied,
        setCopied,
    ] =
        useState(false);

    if (
        !statistics
    ) {

        return (

            <DashboardLayout>

                <div className="page-header">

                    <h1>
                        Exports
                    </h1>

                    <p>
                        Generate reports from your imported Instagram data.
                    </p>

                </div>

                <section
                    className="card"
                    style={{
                        padding:
                            "50px",
                        textAlign:
                            "center",
                    }}
                >

                    <Download
                        size={
                            42
                        }
                    />

                    <h2
                        style={{
                            marginTop:
                                "18px",
                        }}
                    >
                        No data available
                    </h2>

                    <p
                        style={{
                            color:
                                "#98A2B3",
                            marginTop:
                                "8px",
                        }}
                    >
                        Upload an Instagram ZIP file first.
                    </p>

                </section>

            </DashboardLayout>

        );

    }

    const payload = {

        users,

        statistics,

        fileName:
            currentFileName ??
            undefined,

        generatedAt:
            new Date().toISOString(),

    };

    const run =
        async (
            action: string,
            callback:
                () =>
                    void |
                    Promise<void>
        ) => {

            try {

                setBusy(
                    action
                );

                await callback();

            } catch (
                error
            ) {

                console.error(
                    `${action} failed:`,
                    error
                );

                window.alert(
                    "The operation failed. Please try again."
                );

            } finally {

                setBusy(
                    null
                );

            }

        };

    const copySummary =
        async () => {

            const text = [

                "InsightGram AI",

                "",

                `Followers: ${statistics.followers}`,

                `Following: ${statistics.following}`,

                `Mutual: ${statistics.mutual}`,

                `Not Following Back: ${statistics.notFollowingBack}`,

                `You Don't Follow Back: ${statistics.youDontFollowBack}`,

                `Pending Requests: ${statistics.pendingRequests}`,

                `Recent Requests: ${statistics.recentRequests}`,

                `Recently Unfollowed: ${statistics.recentlyUnfollowed}`,

                `Close Friends: ${statistics.closeFriends}`,

                `Relationship Score: ${statistics.relationshipScore}%`,

            ].join(
                "\n"
            );

            if (
                !navigator.clipboard
            ) {

                throw new Error(
                    "Clipboard API is not available."
                );

            }

            await navigator.clipboard.writeText(
                text
            );

            setCopied(
                true
            );

            window.setTimeout(
                () => {

                    setCopied(
                        false
                    );

                },
                2000
            );

        };

    return (

        <DashboardLayout>

            <div className="page-header">

                <h1>
                    Exports
                </h1>

                <p>
                    Export your Instagram relationship analysis.
                </p>

            </div>

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
                            Current Dataset
                        </h2>

                        <p
                            style={{
                                color:
                                    "#98A2B3",
                                marginTop:
                                    "6px",
                            }}
                        >

                            {currentFileName ??
                                "Instagram Export"}

                        </p>

                    </div>

                    <span
                        className="badge badge-success"
                    >
                        Ready
                    </span>

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

                    <SummaryBox
                        label="Followers"
                        value={
                            statistics.followers
                        }
                    />

                    <SummaryBox
                        label="Following"
                        value={
                            statistics.following
                        }
                    />

                    <SummaryBox
                        label="Mutual"
                        value={
                            statistics.mutual
                        }
                    />

                    <SummaryBox
                        label="Relationship Score"
                        value={
                            `${statistics.relationshipScore}%`
                        }
                    />

                </div>

            </section>

            <section
                style={{
                    display:
                        "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(240px,1fr))",
                    gap:
                        "18px",
                }}
            >

                <ExportAction

                    title="Export CSV"

                    description="Download relationship data as a CSV file."

                    icon={
                        <FileText
                            size={
                                26
                            }
                        />
                    }

                    busy={
                        busy === "csv"
                    }

                    onClick={() =>
                        run(
                            "csv",
                            () =>
                                exportService.exportCSV(
                                    payload
                                )
                        )
                    }

                />

                <ExportAction

                    title="Export JSON"

                    description="Download the complete parsed Instagram dataset."

                    icon={
                        <FileJson
                            size={
                                26
                            }
                        />
                    }

                    busy={
                        busy === "json"
                    }

                    onClick={() =>
                        run(
                            "json",
                            () =>
                                exportService.exportJSON(
                                    payload
                                )
                        )
                    }

                />

                <ExportAction

                    title="Export PDF"

                    description="Generate a professional PDF report."

                    icon={
                        <Download
                            size={
                                26
                            }
                        />
                    }

                    busy={
                        busy === "pdf"
                    }

                    onClick={() =>
                        run(
                            "pdf",
                            () =>
                                exportAsPDF(
                                    payload
                                )
                        )
                    }

                />

                <ExportAction

                    title={
                        copied
                            ? "Copied"
                            : "Copy Summary"
                    }

                    description="Copy report statistics to the clipboard."

                    icon={
                        copied ? (
                            <Check
                                size={
                                    26
                                }
                            />
                        ) : (
                            <Clipboard
                                size={
                                    26
                                }
                            />
                        )
                    }

                    busy={
                        busy === "copy"
                    }

                    onClick={() =>
                        run(
                            "copy",
                            copySummary
                        )
                    }

                />

            </section>

        </DashboardLayout>

    );

}

function SummaryBox({
    label,
    value,
}: {
    label: string;
    value: string | number;
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
                {label}
            </small>

            <strong
                style={{
                    display:
                        "block",
                    marginTop:
                        "7px",
                    fontSize:
                        "24px",
                }}
            >
                {value}
            </strong>

        </div>

    );

}

function ExportAction({
    title,
    description,
    icon,
    busy,
    onClick,
}: {
    title: string;
    description: string;
    icon: ReactNode;
    busy: boolean;
    onClick: () => void;
}) {

    return (

        <button
            type="button"
            className="card"
            onClick={
                onClick
            }
            disabled={
                busy
            }
            style={{
                textAlign:
                    "left",
                minHeight:
                    "190px",
                cursor:
                    busy
                        ? "wait"
                        : "pointer",
            }}
        >

            <div
                style={{
                    width:
                        "54px",
                    height:
                        "54px",
                    borderRadius:
                        "17px",
                    display:
                        "flex",
                    alignItems:
                        "center",
                    justifyContent:
                        "center",
                    color:
                        "#18C8FF",
                    background:
                        "rgba(24,200,255,.12)",
                }}
            >

                {busy ? (

                    <Loader2
                        size={
                            26
                        }
                        className="spin"
                    />

                ) : (

                    icon

                )}

            </div>

            <h3
                style={{
                    marginTop:
                        "18px",
                }}
            >

                {title}

            </h3>

            <p
                style={{
                    color:
                        "#98A2B3",
                    marginTop:
                        "8px",
                    lineHeight:
                        "1.6",
                }}
            >

                {description}

            </p>

        </button>

    );

}