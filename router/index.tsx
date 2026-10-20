// ======================================================
// InsightGram AI
// React Router configuration for GitHub Pages
// ======================================================

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Home from "../pages/Home";
import Relationships from "../pages/Relationships";
import Requests from "../pages/Requests";
import Analytics from "../pages/Analytics";
import Compare from "../pages/Compare";
import Exports from "../pages/Exports";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import { ROUTES } from "../routes";

const router = createBrowserRouter([
    { path: ROUTES.HOME, element: <Home /> },
    { path: ROUTES.RELATIONSHIPS, element: <Relationships /> },
    { path: ROUTES.REQUESTS, element: <Requests /> },
    { path: ROUTES.ANALYTICS, element: <Analytics /> },
    { path: ROUTES.COMPARE, element: <Compare /> },
    { path: ROUTES.EXPORTS, element: <Exports /> },
    { path: ROUTES.SETTINGS, element: <Settings /> },
    { path: "*", element: <NotFound /> },
], {
    basename: import.meta.env.BASE_URL,
});

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
