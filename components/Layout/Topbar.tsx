// ======================================================
// InsightGram AI
// File : src/components/Layout/Topbar.tsx
// ======================================================

import {
    Moon,
    Sun,
    Upload,
    FileArchive,
} from "lucide-react";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import themeService, {
    type AppTheme,
} from "../../services/themeService";

import {
    useInstagramZip,
} from "../../hooks/useInstagramZip";

import {
    useAppStore,
} from "../../store/appStore";

export default function Topbar() {

    const {
        currentFileName,
        uploadedAt,
    } = useAppStore();

    const {
        uploadZip,
        loading,
    } =
        useInstagramZip();

    const [
        theme,
        setTheme,
    ] =
        useState<AppTheme>(
            "dark"
        );

    const fileInputRef =
        useRef<HTMLInputElement | null>(
            null
        );

    useEffect(() => {

        setTheme(
            themeService.initialize()
        );

    }, []);

    // ======================================================
    // Theme
    // ======================================================

    const handleThemeToggle =
        () => {

            const next =
                themeService.toggle();

            setTheme(
                next
            );

        };

    // ======================================================
    // Upload
    // ======================================================

    const handleUploadClick =
        () => {

            if (
                loading
            ) {

                return;

            }

            fileInputRef
                .current
                ?.click();

        };

    const handleFileChange =
        async (
            event:
                React.ChangeEvent<HTMLInputElement>
        ) => {

            const file =
                event.target.files?.[0];

            event.target.value =
                "";

            if (!file) {

                return;

            }

            await uploadZip(
                file
            );

        };

    return (

        <header
            className="topbar glass"
        >

            <input
                ref={
                    fileInputRef
                }
                type="file"
                accept=".zip,application/zip"
                onChange={
                    handleFileChange
                }
                style={{
                    display:
                        "none",
                }}
            />

            <div
                className="topbar-right"
            >

                {/* Theme */}

                <button
                    type="button"
                    className="icon-btn"
                    onClick={
                        handleThemeToggle
                    }
                    title={
                        theme ===
                        "dark"
                            ? "Switch to light theme"
                            : "Switch to dark theme"
                    }
                    aria-label={
                        "Toggle theme"
                    }
                >

                    {theme ===
                    "dark" ? (

                        <Sun
                            size={
                                19
                            }
                        />

                    ) : (

                        <Moon
                            size={
                                19
                            }
                        />

                    )}

                </button>

                {/* Upload */}

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={
                        handleUploadClick
                    }
                    disabled={
                        loading
                    }
                    style={{
                        opacity:
                            loading
                                ? 0.7
                                : 1,
                    }}
                >

                    <Upload
                        size={
                            18
                        }
                    />

                    {loading
                        ? "Processing..."
                        : "Upload ZIP"}

                </button>

                {/* Current Export */}

                <div
                    className="card"
                    style={{
                        display:
                            "flex",
                        alignItems:
                            "center",
                        gap:
                            "12px",
                        padding:
                            "10px 16px",
                        minWidth:
                            "250px",
                        maxWidth:
                            "400px",
                    }}
                >

                    <FileArchive
                        size={
                            30
                        }
                    />

                    <div
                        style={{
                            minWidth:
                                0,
                        }}
                    >

                        <strong
                            style={{
                                display:
                                    "block",
                                overflow:
                                    "hidden",
                                textOverflow:
                                    "ellipsis",
                                whiteSpace:
                                    "nowrap",
                            }}
                        >

                            {currentFileName ??
                                "No ZIP uploaded"}

                        </strong>

                        <small
                            style={{
                                color:
                                    "#98A2B3",
                            }}
                        >

                            {uploadedAt
                                ? new Date(
                                      uploadedAt
                                  ).toLocaleString()
                                : "Ready for import"}

                        </small>

                    </div>

                </div>

            </div>

        </header>

    );

}