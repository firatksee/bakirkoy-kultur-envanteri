import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import TeamPage from "./pages/TeamPage";
import ReferencesPage from "./pages/ReferencesPage";
import Dashboard from "./pages/Dashboard";

export default createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "team", element: <TeamPage /> },
            { path: "references", element: <ReferencesPage /> },
            { path: "dashboard", element: <Dashboard /> },
        ],
    },
]);
