import { Outlet } from "react-router-dom";

/*
    app wide layout can be determined here
    such as navbar, footer, etc.
*/

export default function RootLayout() {
    return <Outlet />;
}
