// ======================================================
// InsightGram AI
// File : src/components/Export/ExportHeader.tsx
// ======================================================

import {
    Download,
    FileText,
    FileSpreadsheet,
} from "lucide-react";

export default function ExportHeader() {

    return (

        <section
            className="card"
            style={{
                marginBottom: "28px",
            }}
        >

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "24px",
                }}
            >

                <div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                            marginBottom: "12px",
                        }}
                    >

                        <Download
                            size={34}
                            color="#18C8FF"
                        />

                        <h1
                            style={{
                                margin: 0,
                            }}
                        >

                            Export Center

                        </h1>

                    </div>

                    <p
                        style={{
                            color: "#98A2B3",
                            lineHeight: 1.8,
                            margin: 0,
                            maxWidth: "760px",
                        }}
                    >

                        Export your Instagram analysis into professional
                        reports. Generate PDF documents, CSV files,
                        JSON backups and complete AI reports.

                    </p>

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "18px",
                        flexWrap: "wrap",
                    }}
                >

                    <div
                        className="glass"
                        style={{
                            minWidth: "180px",
                            padding: "18px",
                            borderRadius: "18px",
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "10px",
                            }}
                        >

                            <FileText
                                size={22}
                                color="#FF5A7A"
                            />

                            <strong>

                                PDF Report

                            </strong>

                        </div>

                        <small
                            style={{
                                color: "#98A2B3",
                            }}
                        >

                            Printable professional report

                        </small>

                    </div>

                    <div
                        className="glass"
                        style={{
                            minWidth: "180px",
                            padding: "18px",
                            borderRadius: "18px",
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                marginBottom: "10px",
                            }}
                        >

                            <FileSpreadsheet
                                size={22}
                                color="#34D399"
                            />

                            <strong>

                                CSV Export

                            </strong>

                        </div>

                        <small
                            style={{
                                color: "#98A2B3",
                            }}
                        >

                            Excel compatible data export

                        </small>

                    </div>

                </div>

            </div>

        </section>

    );

}