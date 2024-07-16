import { RouterProvider } from "react-router-dom";
import router from "./routes";

import classes from "./App.module.css";
import HomePage from "./pages/HomePage";
/*https://freeimage.host/i/dq88tM7
https://freeimage.host/i/dq88mFe
https://freeimage.host/i/dq88DP9
https://freeimage.host/i/dq8SKMP
https://freeimage.host/i/dq8SfP1
https://freeimage.host/i/dq8SdwQ
https://freeimage.host/i/dq8SBKF*/
export default function App() {
    return (
        <>
            <header className={classes.navHeader}>
                <a href='/' className={classes.logo} />
                <nav className={classes.nav}>
                    <a href='#about'>HAKKINDA</a>
                    <a href='#map'>GALERİ</a>
                    <a href='/team'>EKİBİMİZ</a>
                    <a href='https://www.bakirkoy.bel.tr/iletisim' target='blank'>
                        BİZE ULAŞIN
                    </a>
                </nav>
            </header>
            {/* <HomePage /> */}
            <RouterProvider router={router} />
        </>
    );
}
