import classes from "./TeamPage.module.css";
import { FaLinkedin } from "react-icons/fa";
import { FaRegFilePdf } from "react-icons/fa6";

const data = [
    {
        name: "Burak Kaya",
        title: "Tarihçi",
        image: "https://iili.io/dBPiOtn.jpg",
        text: `Burak Kaya, Marmara Üniversitesi Tarih bölümünden 2024 yılında onur derecesi ile mezun olmuştur. İkinci üniversite olarak İstanbul Üniversitesi'nde Yönetim Bilişim Sistemleri bölümüne devam etmektedir. Tarih eğitimi süresince dijital tarih, şehir tarihi, kültürel miras ve askeri tarih konularında kendini geliştirmiştir. 2023 yılında, RUBASAM bünyesinde gerçekleştirilen "Balkan Ülke Raporları: Bulgaristan Ülke Raporu"nun  koordinatörlüğünü üstlenmiştir. Şu anda RUBASAM'da yönetim kurulu üyesi olarak görev yapmaktadır. 2024 yılında, Marmara Üniversitesi Dijital Beşeri Bilimler Uygulama ve Araştırma Merkezinde stajyer araştırmacı olarak stajını yapmıştır. Aynı yıl içerisinde, kültürel mirası koruma ve İstanbul'un mekânsal hafızasını güçlendirme amacıyla yürütülen "Makriköy / Bakırköy Kültür Envanteri" projesinde tarihi verilerin kullanılmasında ve projenin yürütülmesinde sorumluluk almıştır.`,
        linkedin: "https://www.linkedin.com/in/burakkkaya/",
        cv: require("../data/cv_bk.pdf"),
    },
    {
        name: "Derin Can Dal",
        title: "Harita Mühendisi",
        image: "https://iili.io/dqSX1iG.jpg",
        text: `Derin Can Dal, Yıldız Teknik Üniversitesi Harita Mühendisliği bölümünden 2024 yılında mezun olmuştur. İngilizce Harita Mühendisliği eğitimi süresince, özellikle Karayolu Projesi üzerine çalışmış ve bu konuda mezuniyet tezini hazırlamıştır. Doğuş İnşaat ve Marinmet Sualtı Mühendislik şirketlerinde staj yaparak profesyonel deneyim kazanmıştır. Doğuş İnşaat'ta yaptığı staj sürecinde metro ve tünel inşaat yöntemleri hakkında bilgi sahibi olmuştur. Marinmet Sualtı Mühendislik'teki staj döneminde ise batimetrik ölçüm yöntemleri ve cihazları hakkında bilgi edinmiş, multibeam ile ölçüm yapmış ve verilerin batimetrik haritaya dönüştürülmesini takip etmiştir. "Makriköy / Bakırköy Kültür Envanteri" projesinde tarihi haritaların güncel konumlarıyla çakıştırılıp (georeferencing) koordinat verisinin sunulmasında sorumluluk almıştır.`,
        linkedin: "https://www.linkedin.com/in/derin-can-dal-1a798b195",
        cv: require("../data/cv_dcd.pdf"),
    },
    {
        name: "Ferdi Fırat Köse",
        title: "Bilgisayar Mühendisi",
        image: "https://iili.io/dqSNLpp.jpg",
        text: "Ferdi Fırat Köse, Manisa Celal Bayar Üniversitesi Bilgisayar Mühendisliği bölümünden 2024 yılında mezun olmuştur. İngilizce Bilgisayar Mühendisliği eğitimi boyunca çeşitli projelerde yer almış ve çeşitli şirketlerde staj yapmış ve çalışmıştır. Çalıştığı iş ve stajlarda çoğunlukla web geliştirme ve mobil uygulama üzerine uğraşmış olsa da yapay zeka ve makine öğrenimi üzerine de birçok proje geliştirmiş ve bitirme tezini de bunun üzerine yapmıştır.",
        linkedin: "https://www.linkedin.com/in/ferdifiratkose/",
        cv: require("../data/cv_ffk.pdf"),
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
                            <a href={item.cv} target='_blank'>
                                <FaRegFilePdf size={22} color='#444' />
                            </a>
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
