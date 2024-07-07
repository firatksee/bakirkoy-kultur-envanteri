import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import TeamPage from "./pages/TeamPage";
import Dashboard from "./pages/Dashboard";

export default createBrowserRouter([
    {
        path: "/bakirkoy-kultur-envanteri",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "team", element: <TeamPage /> },
            { path: "dashboard", element: <Dashboard /> },
        ],
    },
]);
