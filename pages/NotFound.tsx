// ======================================================
// InsightGram AI
// File : src/pages/NotFound.tsx
// ======================================================

import { Link } from "react-router-dom";

import { Home, AlertTriangle } from "lucide-react";

import DashboardLayout from "../components/Layout/DashboardLayout";

import { ROUTES } from "../routes";

export default function NotFound() {

    return (

        <DashboardLayout>

            <div
                className="card"
                style={{
                    minHeight: "70vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "20px",
                }}
            >

                <AlertTriangle
                    size={72}
                    color="#FF5A7A"
                />

                <h1
                    className="gradient-text"
                    style={{
                        fontSize: "64px",
                        margin: 0,
                    }}
                >

                    404

                </h1>

                <h2>

                    Page Not Found

                </h2>

                <p
                    style={{
                        maxWidth: "520px",
                        opacity: 0.8,
                    }}
                >

                    The page you are looking for doesn't exist,
                    has been moved, or the URL is incorrect.

                </p>

                <Link
                    to={ROUTES.HOME}
                    className="btn btn-primary"
                >

                    <Home size={18} />

                    Back to Dashboard

                </Link>

            </div>

        </DashboardLayout>

    );

}