import { createBrowserRouter } from "react-router-dom";

import Protect from "./middlewares/Protect";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";

export default createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [],
    },
]);
