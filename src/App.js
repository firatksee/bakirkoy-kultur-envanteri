import { RouterProvider } from "react-router-dom";
import router from "./routes";

import classes from "./App.module.css";

export default function App() {
    return (
        <>
            <header className={classes.navHeader}>
                <a href='/' className={classes.logo} />
                <nav className={classes.nav}>
                    <a href='/'>HAKKINDA</a>
                    <a href='/#map'>GALERİ</a>
                    <a href='/about'>HAZIRLAYANLAR</a>
                    <a href='https://www.bakirkoy.bel.tr/iletisim' target='blank'>
                        BİZE ULAŞIN
                    </a>
                </nav>
            </header>
            <RouterProvider router={router} />
        </>
    );
}
