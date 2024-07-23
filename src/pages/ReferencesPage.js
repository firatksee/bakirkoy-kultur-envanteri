import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import classes from "./ReferencesPage.module.css";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

import { sendRequest } from "../util/http";

export default function ReferencesPage() {
    const [expandedRows, setExpandedRows] = useState(null);

    const { data } = useQuery({
        queryKey: ["references"],
        queryFn: () => sendRequest({ api: "references.json" }),
        initialData: [],
    });

    const expandAll = () => {
        let _expandedRows = {};

        data.forEach((p) => (_expandedRows[`${p.id}`] = true));

        setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
        setExpandedRows(null);
    };

    const rowExpansionTemplate = (data) => {
        const images = data.image?.split(",") || [];
        return (
            <div className='p-3 flex gap-4'>
                <a href={data.description}>Açıklama</a>
                {images.map((item, index) => (
                    <a href={item}>Görsel {index + 1}</a>
                ))}
            </div>
        );
    };

    const header = (
        <div className='flex flex-wrap justify-content-between gap-2 px-8'>
            <h1>Kaynakça</h1>
            {/* <div className='flex flex-wrap gap-2'>
                <Button icon='pi pi-plus' label='Tümünü Aç' onClick={expandAll} text />
                <Button icon='pi pi-minus' label='Tümünü Kapat' onClick={collapseAll} text />
            </div> */}
        </div>
    );

    const iconBodyTemplate = (rowData) => {
        return <img src={rowData.icon} width={40} height={40} />;
    };

    return (
        <div className={classes.container}>
            <div className='card mx-8 mt-4'>
                <DataTable
                    value={data}
                    expandedRows={expandedRows}
                    onRowToggle={(e) => setExpandedRows(e.data)}
                    // rowExpansionTemplate={rowExpansionTemplate}
                    dataKey='name'
                    header={header}
                    tableStyle={{ minWidth: "60rem" }}
                >
                    {/* <Column expander style={{ width: "5rem" }} /> */}
                    <Column header='Ikon' body={iconBodyTemplate} />
                    <Column field='name' header='İsim' sortable />
                    <Column header='Kaynaklar' body={rowExpansionTemplate} />
                </DataTable>
            </div>
        </div>
    );
}
