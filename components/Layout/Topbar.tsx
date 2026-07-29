// ======================================================
// InsightGram AI
// File : src/components/Layout/Topbar.tsx
// Part : 1
// ======================================================

import {
    Bell,
    Brain,
    Moon,
    Search,
    Sun,
    Upload,
    UserCircle2
} from "lucide-react";

import { useAppStore } from "../../store/appStore";

interface TopbarProps {

    onUploadClick?: () => void;

    darkMode?: boolean;

    onToggleTheme?: () => void;

}

export default function Topbar({

    onUploadClick,

    darkMode = true,

    onToggleTheme,

}: TopbarProps) {

    const {

        statistics,

        currentFileName,

        uploadedAt,

    } = useAppStore();

    return (

        <header className="topbar glass">

            <div className="topbar-left">

                <div className="search-box">

                    <Search
                        size={18}
                    />

                    <input
                        type="text"
                        placeholder="Search username..."
                    />

                </div>

            </div>

            <div className="topbar-right">

                <button
                    className="icon-btn"
                    onClick={onToggleTheme}
                >

                    {darkMode
                        ? <Sun size={18}/>
                        : <Moon size={18}/>
                    }

                </button>

                <button
                    className="icon-btn relative"
                >

                    <Bell size={18}/>

                    <span
                        className="status-dot status-online"
                        style={{
                            position:"absolute",
                            top:10,
                            right:10,
                            width:8,
                            height:8
                        }}
                    />

                </button>

                <button
                    className="btn btn-primary"
                    onClick={onUploadClick}
                >

                    <Upload size={18}/>

                    Upload ZIP

                </button>
                // ======================================================
// InsightGram AI
// File : src/components/Layout/Topbar.tsx
// Part : 2
// ======================================================

                <div
                    className="card"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "10px 16px",
                    }}
                >

                    <Brain
                        size={18}
                    />

                    <div>

                        <strong>
                            AI Ready
                        </strong>

                        <div
                            style={{
                                fontSize: "12px",
                                opacity: 0.7,
                            }}
                        >

                            {statistics
                                ? `${statistics.relationshipScore}% Relationship Score`
                                : "Waiting for Instagram ZIP"}

                        </div>

                    </div>

                </div>

                <div
                    className="card"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "10px 16px",
                    }}
                >

                    <UserCircle2
                        size={34}
                    />

                    <div>

                        <strong>

                            {currentFileName ?? "No File"}

                        </strong>

                        <div
                            style={{
                                fontSize: "12px",
                                opacity: 0.7,
                            }}
                        >

                            {uploadedAt
                                ? new Date(
                                      uploadedAt
                                  ).toLocaleString()
                                : "No upload yet"}

                        </div>

                    </div>

                </div>

            </div>

        </header>

    );

}