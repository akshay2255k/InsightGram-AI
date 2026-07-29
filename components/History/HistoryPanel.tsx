// ======================================================
// InsightGram AI
// File : src/components/History/HistoryPanel.tsx
// Part : 1
// ======================================================

import { History, Clock, FileArchive } from "lucide-react";

import { useEffect, useState } from "react";

import type { ZipHistory } from "../../types/instagram";

import {
    getHistory,
} from "../../services/historyService";

export default function HistoryPanel() {

    const [

        history,

        setHistory,

    ] = useState<ZipHistory[]>([]);

    useEffect(() => {

        setHistory(
            getHistory()
        );

    }, []);

    return (

        <section className="card">

            <div className="table-header">

                <h2>

                    <History size={22} />

                    {" "}

                    Import History

                </h2>

                <span className="badge badge-primary">

                    {history.length} Records

                </span>

            </div>

            <div className="history-list">
                // ======================================================
// InsightGram AI
// File : src/components/History/HistoryPanel.tsx
// Part : 2
// ======================================================

                {history.length === 0 ? (

                    <div
                        className="empty-state"
                        style={{
                            padding: "40px",
                            textAlign: "center",
                        }}
                    >

                        <FileArchive
                            size={40}
                        />

                        <h3>

                            No Import History

                        </h3>

                        <p>

                            Import an Instagram ZIP file
                            to create your first history
                            record.

                        </p>

                    </div>

                ) : (

                    history.map((item) => (

                        <div
                            key={item.id}
                            className="history-item"
                        >

                            <div>

                                <strong>

                                    {item.fileName}

                                </strong>

                                <div
                                    style={{
                                        opacity: 0.7,
                                        fontSize: "13px",
                                        marginTop: "4px",
                                    }}
                                >

                                    <Clock
                                        size={14}
                                        style={{
                                            marginRight: "6px",
                                            verticalAlign: "middle",
                                        }}
                                    />

                                    {new Date(
                                        item.importedAt
                                    ).toLocaleString()}

                                </div>

                            </div>

                            <span className="badge badge-success">

                                Score{" "}

                                {item.statistics.relationshipScore}%

                            </span>

                        </div>

                    ))

                )}

            </div>

        </section>

    );

}