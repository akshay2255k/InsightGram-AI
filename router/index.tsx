// ======================================================
// InsightGram AI
// File : src/router/index.tsx
// ======================================================

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}