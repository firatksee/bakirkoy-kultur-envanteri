import classes from "./TeamPage.module.css";
import { FaLinkedin } from "react-icons/fa";

const data = [
    {
        name: "Burak Kaya",
        title: "Tarihçi",
        image: "https://iili.io/dBPiOtn.jpg",
        text: "Burak Kaya, Marmara Üniversitesi Tarih bölümünden 2024 yılında onur derecesi ile mezun olmuştur. İkinci üniversite olarak, İstanbul Üniversitesi Yönetim Bilişim Sistemleri bölümüne devam etmektedir. Tarih bölümü eğitimi süresince Dijital Tarih, Şehir Tarihi, Kültürel Miras ve Askeri Tarih konularında kendini geliştirmiştir. 2024 yılında Marmara Üniversitesi Dijital Beşeri Bilimler Uygulama ve Araştırma Merkezinde stajyer araştırmacı olarak stajını yapmıştır. 2023 yılında RUBASAM bünyesinde gerçekleştirilen “Balkan Ülke Raporları: Bulgaristan Ülke Raporu”nun koordinatörlüğünü üstlenmiştir. Şu an RUBASAM’da yönetim kurulu üyeliği devam etmektedir. Yönetim Bilişim Sistemleri bölümüne ek olarak İSMEK’te MEB onaylı bilgisayar ve bilişim kurslarına katılarak kendisini bilişim alanında geliştirmiştir. Dijital Beşeri Bilimler bünyesinde çalışmalar vermeye devam etmektedir.",
        linkedin: "https://www.linkedin.com/in/burakkaya/",
    },
    {
        name: "Derin Can Dal",
        title: "Harita Mühendisi",
        image: "https://iili.io/dqSX1iG.jpg",
        text: "Derin Can Dal, Yıldız Teknik Üniversitesi Harita Mühendisliği bölümünden 2024 yılında mezun olmuştur. İngilizce Harita Mühendisliği eğitimi süresince, özellikle Karayolu Projesi üzerine çalışmış ve bu konuda mezuniyet tezini hazırlamıştır. Doğuş İnşaat ve Marinmet Sualtı Mühendislik şirketlerinde staj yaparak profesyonel deneyim kazanmıştır. Doğuş İnşaat'ta yaptığı staj sürecinde metro ve tünel inşaat yöntemleri hakkında bilgi sahibi olmuştur. Marinmet Sualtı Mühendislik'teki  staj döneminde ise batimetrik ölçüm yöntemleri ve cihazları hakkında bilgi edinmiş, multibeam ile ölçüm yapmış ve verilerin batimetrik haritaya dönüştürülmesini takip etmiştir.",
        linkedin: "https://www.linkedin.com/in/derin-can-dal-1a798b195",
    },
    {
        name: "Ferdi Fırat Köse",
        title: "Bilgisayar Mühendisi",
        image: "https://iili.io/dqSNLpp.jpg",
        text: "Ferdi Fırat Köse, Manisa Celal Bayar Üniversitesi Bilgisayar Mühendisliği bölümünden 2024 yılında mezun olmuştur. İngilizce Bilgisayar Mühendisliği eğitimi boyunca çeşitli projelerde yer almış ve çeşitli şirketlerde staj yapmış ve çalışmıştır. Çalıştığı iş ve stajlarda çoğunlukla web geliştirme ve mobil uygulama üzerine uğraşmış olsa da yapay zeka ve makine öğrenimi üzerine de birçok proje geliştirmiş ve bitirme tezini de bunun üzerine yapmıştır.",
        linkedin: "https://www.linkedin.com/in/ferdifiratkose/",
    },
];

export default function TeamPage() {
    return (
        <div className={classes.container}>
            {data.map((item) => (
                <div className={classes.listItem}>
                    <div className={classes.listItemColumn}>
                        <div className={classes.imageContainer}>
                            <img src={item.image} className={classes.image} />
                        </div>
                        <div className={classes.socials}>
                            {item.linkedin && (
                                <a href={item.linkedin} target='blank'>
                                    <FaLinkedin size={24} color='#0a66c2' />
                                </a>
                            )}
                        </div>
                    </div>
                    <div className={classes.listItemColumn}>
                        <div className={classes.name}>{item.name}</div>
                        <div className={classes.title}>{item.title}</div>
                        <div className={classes.text}>{item.text}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
