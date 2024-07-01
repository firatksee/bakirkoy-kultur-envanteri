import { useState, useRef, useEffect } from "react";

import { MapContainer, Marker, Popup, TileLayer, ImageOverlay } from "react-leaflet";
import { latLngBounds, Icon, tooltip } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

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
import { Galleria } from "primereact/galleria";

import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { TbView360Number } from "react-icons/tb";

import initialData from "./../data/data.json";

import classes from "./Map.module.css";

import defaultIcon from "./../assets/icons/location.png";

import APLEH018A from "../assets/maps/APLEH018A.jpg";
import APLEH062 from "../assets/maps/APLEH062.jpg";
import Hrt_000432 from "../assets/maps/Hrt_000432.jpg";
import Hrt_000433 from "../assets/maps/Hrt_000433.jpg";
import Hrt_000434 from "../assets/maps/Hrt_000434.jpg";

const maps = [
    {
        map: APLEH018A,
        tooltip: "Makriköy ve Çevresi [1/25.000]",
        bounds: [
            [41.0505859, 28.7492441],
            [40.9450737, 28.9128966],
        ],
        zoom: 13.1,
    },
    {
        map: APLEH062,
        tooltip: "Makriköy ve Çevresi [1/25.000]",
        bounds: [
            [41.0505859, 28.7492441],
            [40.9450737, 28.9128966],
        ],
        zoom: 13.1,
    },
    {
        map: Hrt_000432,
        tooltip: "Ayastefanos [1/5.000]",
        bounds: [
            [40.9681227, 28.8095541],
            [40.9526765, 28.8410442],
        ],
        zoom: 16,
    },
    {
        map: Hrt_000433,
        tooltip: "Makriköy'ün Kuzeyi [1/5.000]",
        bounds: [
            [40.9898254, 28.8628916],
            [40.9766903, 28.8932927],
        ],
        zoom: 16,
    },
    {
        map: Hrt_000434,
        tooltip: "Makriköy'ün Güneyi [1/5.000]",
        bounds: [
            [40.979429, 28.8631314],
            [40.9700284, 28.8865827],
        ],
        zoom: 16,
    },
];

const filterItems = (itemRenderer) => [
    { label: "İdari Yapılar", template: itemRenderer, items: [{ label: "İdari Yapı", template: itemRenderer }] },
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
                            { label: "Latin Katolik Kilisesi", template: itemRenderer },
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
    const mapRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState({});
    const [sideBarOpen, setSideBarOpen] = useState(false);

    const [yearInterval, setYearInterval] = useState([1453, 1922]);
    const [filterOutKeywords, setFilterOutKeywords] = useState([]);

    const [activeMap, setActiveMap] = useState(maps[0]);

    useEffect(() => {
        mapRef?.current?.setView(
            [(activeMap.bounds[0][0] + activeMap.bounds[1][0]) / 2, (activeMap.bounds[0][1] + activeMap.bounds[1][1]) / 2],
            activeMap.zoom
        );
        mapRef?.current?.setMaxBounds(activeMap.bounds);
    }, [activeMap]);

    const markerClickHandler = (item) => {
        setSelectedItem(item);
        setSideBarOpen(true);
    };

    const iconSize = 32;

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
                        <div>
                            <Tooltip target='.tooltipTarget' />
                            <div className='flex gap-2 align-items-center mb-3'>
                                <Chip label={`${yearInterval[0]} - ${yearInterval[1]}`} />
                                <RxQuestionMarkCircled
                                    className='tooltipTarget'
                                    data-pr-tooltip='Haritada gösterilen yıl aralığı.'
                                    data-pr-position='right'
                                    data-pr-at='right+5 center'
                                    data-pr-my='left center-2'
                                />
                            </div>
                            <Slider value={yearInterval} onChange={(e) => setYearInterval(e.value)} range min={1453} max={1922} />
                        </div>
                        <Divider />
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

                        <div className='flex gap-2'>
                            <div className={classes.layersGroup}>
                                <h6>Erkân-ı Harbiye-i Umumiye Matbaası, 1914-15</h6>
                                <div className='flex gap-2'>
                                    {maps.slice(0, 2).map((item, index) => (
                                        <>
                                            <Tooltip target='.tooltipTarget' />
                                            <img
                                                key={index}
                                                src={item.map}
                                                className={`${classes.layerItem} tooltipTarget`}
                                                onClick={() => setActiveMap(maps[index])}
                                                data-pr-tooltip={item.tooltip}
                                                data-pr-position='bottom'
                                            />
                                        </>
                                    ))}
                                </div>
                            </div>
                            <div className={classes.layersGroup}>
                                <h6>Nedjib Bey Haritaları, 1918</h6>
                                <div className='flex gap-2'>
                                    {maps.slice(2).map((item, index) => (
                                        <>
                                            <Tooltip target='.tooltipTarget' />
                                            <img
                                                key={index}
                                                src={item.map}
                                                className={`${classes.layerItem} tooltipTarget`}
                                                onClick={() => setActiveMap(maps[index + 2])}
                                                data-pr-tooltip={item.tooltip}
                                                data-pr-position='bottom'
                                            />
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.mapWrapper}>
                        <MapContainer
                            ref={mapRef}
                            style={{ width: "100%", height: "100%" }}
                            center={[
                                (activeMap.bounds[0][0] + activeMap.bounds[1][0]) / 2,
                                (activeMap.bounds[0][1] + activeMap.bounds[1][1]) / 2,
                            ]}
                            zoom={activeMap.zoom}
                            maxZoom={18}
                            minZoom={activeMap.zoom}
                            scrollWheelZoom={true}
                            maxBounds={new latLngBounds(...activeMap.bounds)}
                            maxBoundsViscosity={1}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                            />
                            <MarkerClusterGroup>
                                {data.map((item, index) => {
                                    if (filterOutKeywords.includes(item.optimization)) return null;
                                    if (!item) return null;
                                    const position = item.location
                                        ?.replace("\r", "")
                                        .replace("\n", "")
                                        .replace(" ", "")
                                        .split(",")
                                        .map(Number);
                                    if (!position) return null;
                                    return (
                                        <Marker
                                            key={index}
                                            position={position}
                                            icon={
                                                new Icon({
                                                    iconUrl: item.icon || defaultIcon,
                                                    iconSize: [iconSize, iconSize],
                                                    iconAnchor: [iconSize / 2, iconSize],
                                                    popupAnchor: [0, -iconSize],
                                                    className: classes.markerBg,
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
                            </MarkerClusterGroup>
                            <ImageOverlay url={activeMap.map} bounds={new latLngBounds(...activeMap.bounds)}></ImageOverlay>
                        </MapContainer>
                    </div>
                </div>
            </div>
            <Sidebar style={{ width: 600 }} visible={sideBarOpen} onHide={() => setSideBarOpen(false)}>
                <Galleria
                    value={selectedItem.image?.split(",")}
                    numVisible={5}
                    style={{ maxWidth: "640px" }}
                    item={(item) => <img src={item} style={{ width: "100%", height: "400px", objectFit: "contain" }} />}
                    thumbnail={(item) => <img src={item} style={{ width: "60px", height: "60px", objectFit: "contain" }} />}
                />
                <Divider className='my-4' />
                <div className='flex align-items-center justify-content-between'>
                    <h4>{selectedItem.name}</h4>
                    {selectedItem.street_view && (
                        <div className='flex align-items-center gap-1'>
                            <a href={selectedItem.street_view} target='blank'>
                                <TbView360Number size={36} color='#4f5866' />
                            </a>
                            <Tooltip target='.tooltipTarget' />

                            <RxQuestionMarkCircled
                                className='tooltipTarget'
                                data-pr-tooltip='Konumu 360° görmek için tıklayın.'
                                data-pr-position='right'
                                data-pr-at='right+5 center'
                                data-pr-my='left center-2'
                            />
                        </div>
                    )}
                </div>
                <div className='mb-2'>
                    <Chip label={`${selectedItem.start_date} - ${selectedItem.end_date}`} />
                    <Chip label={selectedItem.optimization} className='ml-2' />
                </div>
                <div className='mb-2'>
                    <Chip label={`Şimdiki konum: ${selectedItem.current_local}`} />
                </div>
                <div>
                    <Chip label={`Şimdiki durum: ${selectedItem.current_status}`} />
                </div>
                {selectedItem.description && (
                    <Accordion activeIndex={0} className='mt-4'>
                        <AccordionTab header='Açıklama'>
                            <p className='m-0' style={{ textAlign: "justify" }}>
                                {selectedItem.description}
                            </p>
                        </AccordionTab>
                    </Accordion>
                )}
            </Sidebar>
        </>
    );
}
