// ======================================================
// InsightGram AI
// File : src/components/Export/ExportPanel.tsx
// Part : 1
// ======================================================

import { Download, FileJson, FileText } from "lucide-react";
import { useAppStore } from "../../store/appStore";
import {
    exportAsCSV,
    exportAsJSON,
    exportAsPDF,
} from "../../services/exportService";

export default function ExportPanel() {

    const {

        exportData,

        statistics,

    } = useAppStore();

    if (!exportData || !statistics) {

        return null;

    }

    return (

        <section className="card">

            <div className="table-header">

                <h2>

                    <Download size={22} />

                    {" "}

                    Export Reports

                </h2>

            </div>

            <div
                className="export-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(220px,1fr))",
                    gap: "18px",
                }}
            >

                <button
                    className="btn btn-primary"
                    onClick={() =>
                        exportAsCSV(exportData)
                    }
                >

                    <FileText size={20} />

                    Export CSV

                </button>

                <button
                    className="btn btn-primary"
                    onClick={() =>
                        exportAsJSON(exportData)
                    }
                >

                    <FileJson size={20} />

                    Export JSON

                </button>

                <button
                    className="btn btn-primary"
                    onClick={() =>
                        exportAsPDF(
                            exportData,
                            statistics
                        )
                    }
                >

                    <Download size={20} />

                    Export PDF

                </button>
                // ======================================================
// InsightGram AI
// File : src/components/Export/ExportPanel.tsx
// Part : 2
// ======================================================

            </div>

            <div
                className="card"
                style={{
                    marginTop: "20px",
                }}
            >

                <h4>

                    Export Information

                </h4>

                <ul
                    style={{
                        marginTop: "12px",
                        paddingLeft: "18px",
                    }}
                >

                    <li>

                        CSV includes relationship data.

                    </li>

                    <li>

                        JSON preserves the complete parsed dataset.

                    </li>

                    <li>

                        PDF contains statistics and AI insights.

                    </li>

                    <li>

                        All exports are generated locally in your browser.

                    </li>

                </ul>

            </div>

        </section>

    );

}