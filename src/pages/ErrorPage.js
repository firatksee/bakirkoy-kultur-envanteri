import { useRouteError } from "react-router-dom";

/*
    catch errors here and display as a page
    such as 404 page

    main layout can be set here as well
    such as navbar and footer can be placed here as well as in root layout
*/

export default function ErrorPage() {
    const error = useRouteError();
    let title = "An error occurred!";
    let message = "Something went wrong!";

    if (error.status === 500) {
        message = error.data.message;
    }

    if (error.status === 404) {
        title = "Not Found!";
        message = "Could not find resource!";
    }

    return <></>;
}
