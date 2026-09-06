// ======================================================
// InsightGram AI
// File : src/pages/Compare.tsx
// ======================================================

import {
    ArrowDown,
    ArrowRight,
    ArrowUp,
    FileArchive,
    RefreshCw,
    Upload,
} from "lucide-react";

import {
    useMemo,
    useRef,
    useState,
} from "react";

import DashboardLayout
    from "../components/Layout/DashboardLayout";

import {
    useAppStore,
} from "../store/appStore";

import {
    loadInstagramZip,
    parseInstagramExport,
} from "../parser/instagramParser";

interface ComparisonResult {

    followersA: number;

    followersB: number;

    followingA: number;

    followingB: number;

    mutualA: number;

    mutualB: number;

    addedFollowers: string[];

    removedFollowers: string[];

    addedFollowing: string[];

    removedFollowing: string[];

    mutualChange: number;

}

export default function Compare() {

    const {
        exportData,
        currentFileName,
    } =
        useAppStore();

    const [
        secondFileName,
        setSecondFileName,
    ] =
        useState<
            string | null
        >(null);

    const [
        secondData,
        setSecondData,
    ] =
        useState<{
            followers: Set<string>;
            following: Set<string>;
        } | null>(null);

    const [
        result,
        setResult,
    ] =
        useState<
            ComparisonResult | null
        >(null);

    const [
        loading,
        setLoading,
    ] =
        useState(false);

    const [
        error,
        setError,
    ] =
        useState<
            string | null
        >(null);

    const inputRef =
        useRef<
            HTMLInputElement | null
        >(null);

    const currentSets =
        useMemo(
            () => {

                if (
                    !exportData
                ) {

                    return null;

                }

                return {

                    followers:
                        new Set(
                            exportData.followers.map(
                                (
                                    user
                                ) =>
                                    user.username
                            )
                        ),

                    following:
                        new Set(
                            exportData.following.map(
                                (
                                    user
                                ) =>
                                    user.username
                            )
                        ),

                };

            },
            [
                exportData,
            ]
        );

    const handleSecondFile =
        async (
            file: File
        ) => {

            try {

                setLoading(
                    true
                );

                setError(
                    null
                );

                setResult(
                    null
                );

                const {
                    zip,
                } =
                    await loadInstagramZip(
                        file
                    );

                const parsed =
                    await parseInstagramExport(
                        zip
                    );

                setSecondFileName(
                    file.name
                );

                setSecondData({

                    followers:
                        new Set(
                            parsed.followers.map(
                                (
                                    user
                                ) =>
                                    user.username
                            )
                        ),

                    following:
                        new Set(
                            parsed.following.map(
                                (
                                    user
                                ) =>
                                    user.username
                            )
                        ),

                });

            } catch (
                err
            ) {

                setError(

                    err instanceof Error
                        ? err.message
                        : "Unable to read comparison ZIP."

                );

                setSecondData(
                    null
                );

                setSecondFileName(
                    null
                );

            } finally {

                setLoading(
                    false
                );

            }

        };

    const compare =
        () => {

            if (
                !currentSets ||
                !secondData
            ) {

                setError(
                    "Upload a second Instagram ZIP before comparing."
                );

                return;

            }

            const addedFollowers =
                difference(
                    secondData.followers,
                    currentSets.followers
                );

            const removedFollowers =
                difference(
                    currentSets.followers,
                    secondData.followers
                );

            const addedFollowing =
                difference(
                    secondData.following,
                    currentSets.following
                );

            const removedFollowing =
                difference(
                    currentSets.following,
                    secondData.following
                );

            const mutualA =
                countMutual(
                    currentSets.followers,
                    currentSets.following
                );

            const mutualB =
                countMutual(
                    secondData.followers,
                    secondData.following
                );

            setResult({

                followersA:
                    currentSets.followers.size,

                followersB:
                    secondData.followers.size,

                followingA:
                    currentSets.following.size,

                followingB:
                    secondData.following.size,

                mutualA,

                mutualB,

                addedFollowers,

                removedFollowers,

                addedFollowing,

                removedFollowing,

                mutualChange:
                    mutualB - mutualA,

            });

        };

    const reset =
        () => {

            setSecondFileName(
                null
            );

            setSecondData(
                null
            );

            setResult(
                null
            );

            setError(
                null
            );

        };

    if (
        !exportData
    ) {

        return (

            <DashboardLayout>

                <div className="page-header">

                    <h1>
                        Compare
                    </h1>

                    <p>
                        Upload your current Instagram ZIP first.
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

                    <FileArchive
                        size={
                            46
                        }
                    />

                    <h2
                        style={{
                            marginTop:
                                "18px",
                        }}
                    >
                        No baseline export
                    </h2>

                    <p
                        style={{
                            color:
                                "#98A2B3",
                            marginTop:
                                "8px",
                        }}
                    >
                        Upload an Instagram ZIP before comparing.
                    </p>

                </section>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <div className="page-header">

                <h1>
                    Compare Instagram Exports
                </h1>

                <p>
                    Compare two Instagram exports and identify
                    followers, following and mutual relationship changes.
                </p>

            </div>

            <section
                style={{
                    display:
                        "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(280px,1fr))",
                    gap:
                        "20px",
                    marginBottom:
                        "24px",
                }}
            >

                <div
                    className="card"
                >

                    <FileArchive
                        size={
                            30
                        }
                        color="#18C8FF"
                    />

                    <h3
                        style={{
                            marginTop:
                                "14px",
                        }}
                    >
                        Current Export
                    </h3>

                    <p
                        style={{
                            color:
                                "#98A2B3",
                            marginTop:
                                "8px",
                            wordBreak:
                                "break-word",
                        }}
                    >
                        {currentFileName ??
                            "Current dataset"}
                    </p>

                </div>

                <button
                    type="button"
                    className="card"
                    onClick={() =>
                        inputRef.current?.click()
                    }
                    disabled={
                        loading
                    }
                    style={{
                        textAlign:
                            "left",
                        cursor:
                            loading
                                ? "wait"
                                : "pointer",
                    }}
                >

                    <Upload
                        size={
                            30
                        }
                        color="#18C8FF"
                    />

                    <h3
                        style={{
                            marginTop:
                                "14px",
                        }}
                    >

                        {secondFileName
                            ? "Comparison Export"
                            : "Upload Comparison ZIP"}

                    </h3>

                    <p
                        style={{
                            color:
                                "#98A2B3",
                            marginTop:
                                "8px",
                        }}
                    >

                        {secondFileName ??
                            "Choose another Instagram export."}

                    </p>

                </button>

            </section>

            <input
                ref={
                    inputRef
                }
                type="file"
                accept=".zip,application/zip"
                style={{
                    display:
                        "none",
                }}
                onChange={
                    async (
                        event
                    ) => {

                        const file =
                            event.target
                                .files?.[0];

                        event.target.value =
                            "";

                        if (
                            file
                        ) {

                            await handleSecondFile(
                                file
                            );

                        }

                    }
                }
            />

            {error && (

                <section
                    className="card"
                    style={{
                        border:
                            "1px solid #FF5A7A",
                        marginBottom:
                            "20px",
                    }}
                >

                    <strong
                        style={{
                            color:
                                "#FF5A7A",
                        }}
                    >

                        {error}

                    </strong>

                </section>

            )}

            <div
                style={{
                    display:
                        "flex",
                    gap:
                        "12px",
                    flexWrap:
                        "wrap",
                    marginBottom:
                        "24px",
                }}
            >

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={
                        compare
                    }
                    disabled={
                        !secondData ||
                        loading
                    }
                >

                    <ArrowRight
                        size={
                            18
                        }
                    />

                    Compare Exports

                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={
                        reset
                    }
                >

                    <RefreshCw
                        size={
                            18
                        }
                    />

                    Reset

                </button>

            </div>

            {result && (

                <>

                    <section
                        style={{
                            display:
                                "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(220px,1fr))",
                            gap:
                                "18px",
                            marginBottom:
                                "24px",
                        }}
                    >

                        <CompareCard
                            title="Followers"
                            oldValue={
                                result.followersA
                            }
                            newValue={
                                result.followersB
                            }
                        />

                        <CompareCard
                            title="Following"
                            oldValue={
                                result.followingA
                            }
                            newValue={
                                result.followingB
                            }
                        />

                        <CompareCard
                            title="Mutual"
                            oldValue={
                                result.mutualA
                            }
                            newValue={
                                result.mutualB
                            }
                        />

                    </section>

                    <section
                        className="card"
                        style={{
                            marginBottom:
                                "20px",
                        }}
                    >

                        <h2>
                            Follower Changes
                        </h2>

                        <ChangeList
                            added={
                                result.addedFollowers
                            }
                            removed={
                                result.removedFollowers
                            }
                            addedLabel="New Followers"
                            removedLabel="Lost Followers"
                        />

                    </section>

                    <section
                        className="card"
                    >

                        <h2>
                            Following Changes
                        </h2>

                        <ChangeList
                            added={
                                result.addedFollowing
                            }
                            removed={
                                result.removedFollowing
                            }
                            addedLabel="New Following"
                            removedLabel="No Longer Following"
                        />

                    </section>

                </>

            )}

        </DashboardLayout>

    );

}

function difference(
    newer: Set<string>,
    older: Set<string>
): string[] {

    return Array.from(
        newer
    )
        .filter(
            (
                username
            ) =>
                !older.has(
                    username
                )
        )
        .sort();

}

function countMutual(
    followers: Set<string>,
    following: Set<string>
): number {

    let count = 0;

    followers.forEach(
        (
            username
        ) => {

            if (
                following.has(
                    username
                )
            ) {

                count +=
                    1;

            }

        }
    );

    return count;

}

function CompareCard({
    title,
    oldValue,
    newValue,
}: {
    title: string;
    oldValue: number;
    newValue: number;
}) {

    const change =
        newValue -
        oldValue;

    const positive =
        change >= 0;

    return (

        <div className="card">

            <small
                style={{
                    color:
                        "#98A2B3",
                }}
            >
                {title}
            </small>

            <div
                style={{
                    display:
                        "flex",
                    alignItems:
                        "center",
                    gap:
                        "12px",
                    marginTop:
                        "10px",
                }}
            >

                <strong
                    style={{
                        fontSize:
                            "28px",
                    }}
                >
                    {newValue}
                </strong>

                <span
                    style={{
                        color:
                            positive
                                ? "#34D399"
                                : "#FF5A7A",
                    }}
                >

                    {positive
                        ? "+"
                        : ""}
                    {change}

                </span>

            </div>

            <small
                style={{
                    color:
                        "#98A2B3",
                }}
            >
                Previous: {oldValue}
            </small>

        </div>

    );

}

function ChangeList({
    added,
    removed,
    addedLabel,
    removedLabel,
}: {
    added: string[];
    removed: string[];
    addedLabel: string;
    removedLabel: string;
}) {

    return (

        <div
            style={{
                display:
                    "grid",
                gridTemplateColumns:
                    "repeat(auto-fit,minmax(260px,1fr))",
                gap:
                    "18px",
                marginTop:
                    "18px",
            }}
        >

            <ChangeColumn
                icon={
                    <ArrowUp
                        size={
                            18
                        }
                    />
                }
                title={
                    addedLabel
                }
                users={
                    added
                }
            />

            <ChangeColumn
                icon={
                    <ArrowDown
                        size={
                            18
                        }
                    />
                }
                title={
                    removedLabel
                }
                users={
                    removed
                }
            />

        </div>

    );

}

function ChangeColumn({
    icon,
    title,
    users,
}: {
    icon: React.ReactNode;
    title: string;
    users: string[];
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

            <h3>

                {icon}

                {" "}

                {title}

            </h3>

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

                {users.length}

            </strong>

            {users.length ===
            0 ? (

                <p
                    style={{
                        color:
                            "#98A2B3",
                        marginTop:
                            "10px",
                    }}
                >
                    No changes
                </p>

            ) : (

                <div
                    style={{
                        marginTop:
                            "12px",
                        maxHeight:
                            "260px",
                        overflowY:
                            "auto",
                    }}
                >

                    {users.slice(
                        0,
                        50
                    ).map(
                        (
                            username
                        ) => (

                            <div
                                key={
                                    username
                                }
                                style={{
                                    padding:
                                        "7px 0",
                                    borderBottom:
                                        "1px solid rgba(255,255,255,.06)",
                                }}
                            >

                                @{username}

                            </div>

                        )
                    )}

                    {users.length >
                        50 && (

                        <small
                            style={{
                                display:
                                    "block",
                                color:
                                    "#98A2B3",
                                marginTop:
                                    "10px",
                            }}
                        >

                            Showing first 50 of{" "}
                            {users.length}

                        </small>

                    )}

                </div>

            )}

        </div>

    );

}