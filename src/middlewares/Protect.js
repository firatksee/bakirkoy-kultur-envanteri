import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "../util/auth";
import LoadingScreen from "./LoadingScreen";

/*
    this middleware is for protecting some pages
    the selection might be done by authentication or role
    
    the idea is that if user does not meet certain criteria for the page,
    then they will be navigated to another related page,

    for example;
    if (mode === "requestAuthentication" && !isAuthenticated) return <Navigate to='/login' />;
    usage; <Protect mode="requestAuthentication" ><ProfilePage /></Protect>

    in the above case, if the user is not authenticated,
    they cannot reach the profile page and be redirected to login page

    for example;
    role is "admin"
    if (mode !== role ) return <Navigate to='/' />;
    usage; <Protect mode="admin" ><Dashboard /></Protect>

    in the above case, if the user is not admin,
    they cannot reach the dashboard and be redirected to home page

*/

export default function Protect({ children, mode }) {
    /*
        in this case, isAuthenticated holds a boolean value
        might be used a system that holds roles instead
    */

    const { data: isAuthenticated } = useQuery({
        queryKey: ["isAuthenticated"],
        queryFn: checkAuth,
    });

    // if () return <LoadingScreen />;

    /*
        copy the code snippet below as many times as you need
        so you can protect by authentication or role
    */

    // if (mode === "") return <Navigate to='' />;

    return <>{children}</>;
}
