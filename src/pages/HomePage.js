import classes from "./HomePage.module.css";

import Map from "./../components/Map";

export default function HomePage() {
    return (
        <>
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
                            Bu çalışma Bakırköy'ün tarihsel coğrafyasını (1453 - 1922) konu alan ve Osmanlı'nın son dönem haritaları
                            üzerinde bu kültürel mirası göstermeyi hedefleyen bir dijital beşeri bilimler projesidir. Projenin hedefleri
                            arasında Bakırköyümüzün kültürel envanterini ortaya çıkartma ve kamuoyuna tanıtma amaçları yer almaktadır. Bu
                            hedefler doğrultusunda proje ekibimiz tarafından gönüllü olarak yürütülmüştür.
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
                <div id='contributors' className='mt-2 flex flex-column gap-2'>
                    <p className={`${classes.footerText} ${classes.footerTitle}`}>EKİBİMİZ</p>
                    <a href='https://www.linkedin.com/in/burakkkaya' target='blank' className={classes.footerText}>
                        Burak KAYA - Tarihçi
                    </a>
                    <a href='https://www.linkedin.com/in/derin-can-dal-1a798b195' target='blank' className={classes.footerText}>
                        Derin Can DAL - Harita Mühendisi
                    </a>
                    <a href='https://www.linkedin.com/in/ferdifiratkose/' target='blank' className={classes.footerText}>
                        Ferdi Fırat KÖSE - Bilgisayar Mühendisi
                    </a>
                </div>
            </footer>
        </>
    );
}
