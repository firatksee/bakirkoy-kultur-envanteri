import { useState } from "react";

import { MapContainer, Marker, Popup, TileLayer, ImageOverlay } from "react-leaflet";
import { latLngBounds, Icon } from "leaflet";

import { Sidebar } from "primereact/sidebar";
import { Divider } from "primereact/divider";
import { Chip } from "primereact/chip";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Slider } from "primereact/slider";
import { Checkbox } from "primereact/checkbox";
import { PanelMenu } from "primereact/panelmenu";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";

import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { RxQuestionMarkCircled } from "react-icons/rx";

import initialData from "./../data/data.json";

import classes from "./Map.module.css";

import bakirkoyMap from "./../assets/bakirkoy.jpg";

const icons = {
    default: require("./../assets/icons/location.png"),
    Kilise: require("./../assets/icons/church-location.png"),
    Camii: require("./../assets/icons/mosque-location.png"),
    Sinagog: require("./../assets/icons/synagogue-location.png"),
    Okul: require("./../assets/icons/synagogue-location.png"),
    Mezarlık: require("./../assets/icons/cemetery-location.png"),
};

const filterItems = (itemRenderer) => [
    { label: "İdari Yapı", template: itemRenderer },
    {
        label: "Sosyal Yapılar",
        template: itemRenderer,
        items: [
            { label: "Çeşme", template: itemRenderer },
            { label: "Hamam", template: itemRenderer },
            { label: "Gazino", template: itemRenderer },
            { label: "Hipodrom", template: itemRenderer },
            { label: "Çarşı", template: itemRenderer },
        ],
    },
    {
        label: "Dini Yapılar",
        template: itemRenderer,
        items: [
            {
                label: "İbadethane",
                template: itemRenderer,
                items: [
                    { label: "Camii", template: itemRenderer },
                    {
                        label: "Kilise",
                        template: itemRenderer,
                        items: [
                            { label: "Ermeni Kilisesi", template: itemRenderer },
                            { label: "Rum Ortodoks Kilisesi", template: itemRenderer },
                            { label: " Latin Katolik Kilisesi", template: itemRenderer },
                        ],
                    },
                    { label: "Sinagog", template: itemRenderer },
                ],
            },
            {
                label: "Mezarlık",
                template: itemRenderer,
                items: [
                    { label: "Müslüman Mezarlığı", template: itemRenderer },
                    { label: "Ermeni Mezarlığı", template: itemRenderer },
                    { label: "Rum Mezarlığı", template: itemRenderer },
                    { label: "Süryani Mezarlığı", template: itemRenderer },
                    { label: "Anıt Mezarlık", template: itemRenderer },
                    { label: "Türbe", template: itemRenderer },
                ],
            },
            {
                label: "Diğer",
                template: itemRenderer,
                items: [
                    { label: "Namazgâh", template: itemRenderer },
                    { label: "Ayazma", template: itemRenderer },
                    { label: "Kilise Evi", template: itemRenderer },
                ],
            },
        ],
    },
    {
        label: "Sınai Yapılar",
        template: itemRenderer,
        items: [
            { label: "Fabrika", template: itemRenderer },
            { label: "Maden Ocağı", template: itemRenderer },
            { label: "Su Kulesi", template: itemRenderer },
        ],
    },
    {
        label: "Askeri Yapılar",
        template: itemRenderer,
        items: [
            { label: "Baruthane", template: itemRenderer },
            { label: "Kışla", template: itemRenderer },
            { label: "Karakol", template: itemRenderer },
            { label: "Hangar", template: itemRenderer },
        ],
    },
    {
        label: "Ulaşım Yapıları",
        template: itemRenderer,
        items: [
            { label: "Köprü", template: itemRenderer },
            { label: "Fener", template: itemRenderer },
            { label: "İskele", template: itemRenderer },
            { label: "İstasyon", template: itemRenderer },
            { label: "Demiryolu Binası", template: itemRenderer },
        ],
    },
    {
        label: "Sivil Yapılar",
        template: itemRenderer,
        items: [
            { label: "Köşk/Konak", template: itemRenderer },
            { label: "Anıt", template: itemRenderer },
        ],
    },
    {
        label: "Eğitim Yapıları",
        template: itemRenderer,
        items: [
            {
                label: "Okul",
                template: itemRenderer,
                items: [
                    { label: "Müslüman Okulu", template: itemRenderer },
                    { label: "Ermeni Okulu", template: itemRenderer },
                    { label: "Rum Okulu", template: itemRenderer },
                    { label: "Fransız Okulu", template: itemRenderer },
                ],
            },
        ],
    },
    {
        label: "Zirai Bölgeler",
        template: itemRenderer,
        items: [
            { label: "Çiftlik", template: itemRenderer },
            { label: "Bostan", template: itemRenderer },
        ],
    },
    {
        label: "Tabiat",
        template: itemRenderer,
        items: [
            { label: "Koru", template: itemRenderer },
            { label: "Dere", template: itemRenderer },
        ],
    },
];

export default function Map() {
    const [selectedItem, setSelectedItem] = useState({});
    const [sideBarOpen, setSideBarOpen] = useState(false);

    const [yearInterval, setYearInterval] = useState([1453, 1922]);
    const [filterOutKeywords, setFilterOutKeywords] = useState([]);

    const [showCemetery, setShowCemetery] = useState(true);
    const [showChurch, setShowChurch] = useState(true);

    const bounds = new latLngBounds([41.0505859, 28.7492441], [40.9450737, 28.9128966]);
    const mapbounds = new latLngBounds([41.0505859, 28.7492441], [40.9450737, 28.9128966]);

    const markerClickHandler = (item) => {
        setSelectedItem(item);
        setSideBarOpen(true);
    };

    const iconSize = 32;

    const checkboxes = [
        {
            name: "cemetery",
            label: "Mezarlık",
            checked: showCemetery,
            onChange: setShowCemetery,
        },
        {
            name: "church",
            label: "Kilise",
            checked: showChurch,
            onChange: setShowChurch,
        },
    ];

    let data;
    data = initialData.filter((item) => {
        if (item.start_date && item.end_date) return item.start_date >= yearInterval[0] && item.end_date <= yearInterval[1];
        return true;
    });

    const itemRenderer = (item, options) => {
        const count = initialData.filter((dataItem) => dataItem.optimization === item.label).length;
        const icon = initialData.find((dataItem) => dataItem.optimization === item.label)?.icon;
        return (
            <div className='flex align-items-center px-3 py-2 cursor-pointer'>
                {item.items && (options.active ? <IoChevronDown /> : <IoChevronForward />)}
                {!item.items && (
                    <Checkbox
                        className='mr-2'
                        inputId={item.label}
                        name={item.label}
                        value={item.label}
                        onChange={(e) => {
                            if (!e.checked) setFilterOutKeywords((prev) => [...prev, item.label]);
                            else setFilterOutKeywords((prev) => prev.filter((keyword) => keyword !== item.label));
                        }}
                        checked={!filterOutKeywords.includes(item.label)}
                    />
                )}
                {icon && <img src={icon} width={18} height={18} />}
                <span className={`mx-2 ${item.items && "font-semibold"}`}>{item.label}</span>
                {!item.items && <Badge className='ml-auto' severity='info' value={count} />}
            </div>
        );
    };

    return (
        <>
            <div className={classes.sectionWrapper}>
                <div className={classes.mapContainer}>
                    <div className={classes.mapActions}>
                        <div className={classes.yearIntervalSliderContainer}>
                            <Tooltip target='#yearIntervalInfo' />
                            <div className='flex gap-2 align-items-center mb-2'>
                                <div>{`${yearInterval[0]} - ${yearInterval[1]}`}</div>
                                <RxQuestionMarkCircled
                                    id='yearIntervalInfo'
                                    data-pr-tooltip='Haritada gösterilen yıl aralığı.'
                                    data-pr-position='right'
                                    data-pr-at='right+5 center'
                                    data-pr-my='left center-2'
                                />
                            </div>
                            <Slider
                                className={classes.yearIntervalSlider}
                                value={yearInterval}
                                onChange={(e) => setYearInterval(e.value)}
                                range
                                min={1453}
                                max={1922}
                            />
                        </div>
                        <div>
                            <div className='flex mb-2 gap-2'>
                                <Button
                                    className='btn btn-info flex gap-2'
                                    label='Tümünü Ekle'
                                    icon='pi pi-check'
                                    onClick={() => setFilterOutKeywords([])}
                                />
                                <Button
                                    className='btn btn-danger flex gap-2'
                                    label='Tümünü Kaldır'
                                    icon='pi pi-times'
                                    onClick={() => setFilterOutKeywords(initialData.map((item) => item.optimization))}
                                />
                            </div>
                            <PanelMenu model={filterItems(itemRenderer)} className='w-full md:w-20rem flex flex-column gap-1' />
                        </div>
                    </div>
                    <div className={classes.mapWrapper}>
                        <MapContainer
                            style={{ width: "100%", height: "100%" }}
                            center={[40.996426, 28.835127]}
                            zoom={12.5}
                            maxZoom={18}
                            minZoom={12.5}
                            scrollWheelZoom={true}
                            maxBounds={mapbounds}
                            maxBoundsViscosity={1}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                            />
                            {data.map((item, index) => {
                                if (filterOutKeywords.includes(item.optimization)) return null;
                                if (!item) return null;
                                const position = item.location?.replace("\r", "").replace("\n", "").replace(" ", "").split(",").map(Number);
                                if (!position) return null;
                                return (
                                    <Marker
                                        key={index}
                                        position={position}
                                        icon={
                                            new Icon({
                                                // iconUrl: icons[item.category] || icons.default,
                                                iconUrl: item.icon || icons.default,
                                                iconSize: [iconSize, iconSize],
                                                iconAnchor: [iconSize / 2, iconSize],
                                                popupAnchor: [0, -iconSize],
                                            })
                                        }
                                        eventHandlers={{
                                            mouseover: (event) => event.target.openPopup(),
                                            mouseout: (event) => event.target.closePopup(),
                                            click: () => markerClickHandler(item),
                                        }}
                                    >
                                        <Popup>{item.name}</Popup>
                                    </Marker>
                                );
                            })}
                            <ImageOverlay url={bakirkoyMap} bounds={bounds}></ImageOverlay>
                        </MapContainer>
                    </div>
                </div>
            </div>
            <Sidebar style={{ width: 600 }} visible={sideBarOpen} onHide={() => setSideBarOpen(false)}>
                <img style={{ width: "100%", height: 200, objectFit: "contain" }} src={selectedItem.image?.split(",")[0]} />
                <Divider className='my-4' />
                <h4>{selectedItem.name}</h4>
                <Chip label={selectedItem.start_date} />
                <Chip label={selectedItem.category} className='ml-2' />
                <Accordion activeIndex={0} className='mt-4'>
                    <AccordionTab header='Açıklama'>
                        <p className='m-0' style={{ textAlign: "justify" }}>
                            {selectedItem.description}
                        </p>
                    </AccordionTab>
                </Accordion>
            </Sidebar>
        </>
    );
}
