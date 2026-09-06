// ======================================================
// InsightGram AI
// File : src/main.tsx
// ======================================================

import React from "react";
import ReactDOM from "react-dom/client";

import AppRouter from "./router";

import "./styles/style.css";
import "./styles/theme.css";

ReactDOM.createRoot(
    document.getElementById("root")!
).render(

    <React.StrictMode>

        <AppRouter />

    </React.StrictMode>

);