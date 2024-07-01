// import { RouterProvider } from "react-router-dom";
// import router from "./routes";

import classes from "./App.module.css";

import Map from "./components/Map";

export default function App() {
    return (
        <>
            <header className={classes.navHeader}>
                <div className={classes.logo} />
                <nav className={classes.nav}>
                    <a href='#about'>HAKKINDA</a>
                    <a href='#map'>GALERİ</a>
                    <a href='#contributors'>HAZIRLAYANLAR</a>
                    <a href='https://www.bakirkoy.bel.tr/iletisim/iletisim-bilgileri.html' target='blank'>
                        BİZE ULAŞIN
                    </a>
                </nav>
            </header>
            {/* <section className={classes.homeSection}>
                <div className={classes.header}>
                    <h1>BAKIRKÖY'ÜN TARİHSEL COĞRAFYASI</h1>
                    <h4>Bakırköy'ün Araştırılması ve Haritalanması.</h4>
                    <div className={classes.headerActions}>
                        <a href='#about'>HAKKINDA</a>
                        <a href='#contributors'>HAZIRLAYANLAR</a>
                        <a href='https://www.bakirkoy.bel.tr/iletisim/iletisim-bilgileri.html' target='blank'>
                            BİZE ULAŞIN
                        </a>
                    </div>
                </div>
            </section> */}
            <section id='about' className={classes.aboutSection} style={{ height: "100vh" }}>
                <div className={classes.about}>
                    {/* <h2>HAKKINDA</h2> */}
                    <div className={classes.aboutTextContainer}>
                        <p>
                            Bu çalışma Bakırköy'ün tarihsel coğrafyasını (1453 - 1922) konu alan ve Osmanlı'nın son dönem haritaları üzerine
                            bu kültürel mirası göstermeyi hedefleyen bir dijital beşeri bilimler projesidir. Projenin hedefleri arasında
                            Bakırköyümüzün kültürel envanterini ortaya çıkartma ve kamuoyuna tanıtma amaçlarını gerçekleştirmek vardır. Bu
                            hedefler doğrultusunda bu uygulamanın oluşturulması söz konusu olmuş ve proje yürütülmüştür.
                        </p>
                        {/* <div className={classes.aboutImage} /> */}
                    </div>
                </div>
            </section>
            <section id='map' className={classes.mapSection}>
                <Map />
            </section>
            <footer id='footer' className={classes.footer}>
                <div className={classes.footerLogo} />
                <div id='contributors'>
                    <p className={`${classes.footerText} ${classes.footerTitle}`}>HAZIRLAYANLAR</p>
                    <p className={classes.footerText}>Burak KAYA - Tarihçi</p>
                    <p className={classes.footerText}>Derin Can DAL - Harita Mühendisi</p>
                    <p className={classes.footerText}>Ferdi Fırat KÖSE - Bilgisayar Mühendisi</p>
                </div>
            </footer>
        </>
    );

    // return <RouterProvider router={router} />;
}
