import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";

import { useMutation, useQuery } from "@tanstack/react-query";

import classes from "./Dashboard.module.css";

import { queryClient, sendRequest } from "../util/http";
export default function ProductsDemo() {
    let emptyProduct = {
        name: "",
        category: "",
        current_local: "",
        current_status: "",
        description: "",
        end_date: "",
        start_date: "",
        icon: "",
        image: "",
        location: "",
        optimization: "",
        street_view: "",
    };

    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const [authPassword, setAuthPassword] = useState("");
    const toast = useRef(null);
    const dt = useRef(null);

    const { data: products } = useQuery({
        queryKey: ["locations"],
        queryFn: () => sendRequest({ api: "locations.json" }),
        initialData: [],
    });

    const setProducts = (data) => queryClient.setQueryData(["locations"], data);

    const mutation = useMutation({
        mutationFn: (data) => sendRequest({ api: "locations.json", data }),
        onSuccess: () => toast.current.show({ severity: "success", summary: "Başarılı", detail: "Kaydedildi", life: 3000 }),
    });

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const saveHandler = () => {
        mutation.mutate(products);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };

            _products.push(_product);
            toast.current.show({ severity: "success", summary: "Successful", detail: "Product Created", life: 3000 });

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);

        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: "success", summary: "Başarılı", detail: "Silindi", life: 3000 });
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));

        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: "success", summary: "Başarılı", detail: "Silindi", life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product["category"] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className='flex flex-wrap gap-2'>
                <Button label='Yeni' icon='pi pi-plus' severity='info' onClick={openNew} />
                <Button
                    label='Seçilenleri Sil'
                    icon='pi pi-trash'
                    severity='danger'
                    onClick={confirmDeleteSelected}
                    disabled={!selectedProducts || !selectedProducts.length}
                />
                <Button label='Kaydet' icon='pi pi-trash' severity='success' onClick={saveHandler} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label='CSV İndir' icon='pi pi-upload' className='p-button-help' onClick={exportCSV} />;
    };

    const header = (
        <div className='flex flex-wrap gap-2 align-items-center justify-content-between'>
            <h4 className='m-0'>Haritadaki Konumlar</h4>
            <IconField iconPosition='left'>
                <InputIcon className='pi pi-search' />
                <InputText type='search' onInput={(e) => setGlobalFilter(e.target.value)} placeholder='Ara...' />
            </IconField>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label='İptal' icon='pi pi-times' outlined onClick={hideDialog} />
            <Button label='Kaydet' icon='pi pi-check' onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label='Hayır' icon='pi pi-times' outlined onClick={hideDeleteProductDialog} />
            <Button label='Evet' icon='pi pi-check' severity='danger' onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label='Hayır' icon='pi pi-times' outlined onClick={hideDeleteProductsDialog} />
            <Button label='Evet' icon='pi pi-check' severity='danger' onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    const descriptionTemplate = (rowData) => {
        return <p className='text-truncate'>{rowData.description}</p>;
    };

    const streetViewTemplate = (rowData) => {
        return <p className='text-truncate'>{rowData.street_view}</p>;
    };

    const iconTemplate = (rowData) => {
        return <img src={rowData.icon} alt={`${rowData.optimization} ikonu`} width={32} height={32} />;
    };

    if (!authorized)
        return (
            <div className={classes.container}>
                <div className='field'>
                    <InputText id='auth' value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} />
                </div>
                <Button
                    label='Giriş Yap'
                    onClick={() => {
                        if (authPassword === "bdf3467") setAuthorized(true);
                    }}
                />
            </div>
        );

    return (
        <div className={classes.container}>
            <Toast ref={toast} position='bottom-right' />
            <div className='card'>
                <Toolbar className='mb-4' left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable
                    ref={dt}
                    value={products}
                    selection={selectedProducts}
                    onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey='name'
                    paginator
                    rows={3}
                    paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                    currentPageReportTemplate='{totalRecords} konumdan {first} - {last} arasındakiler.'
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column selectionMode='multiple' exportable={false}></Column>
                    <Column field='name' header='İsim' sortable style={{ maxWidth: "160px" }}></Column>
                    <Column field='category' header='Kategori' sortable style={{ maxWidth: "160px" }}></Column>
                    <Column field='icon' header='İkon' sortable body={iconTemplate} style={{ maxWidth: "160px" }}></Column>
                    <Column field='optimization' header='Alt Kategori' sortable style={{ maxWidth: "160px" }}></Column>
                    <Column field='current_local' header='Şimdiki Konum' sortable style={{ maxWidth: "160px" }}></Column>
                    <Column field='current_status' header='Şimdiki Durum' sortable style={{ maxWidth: "160px" }}></Column>
                    <Column field='description' header='Açıklama' body={descriptionTemplate} style={{ maxWidth: "160px" }}></Column>
                    <Column field='start_date' header='Başlangıç Yılı' sortable style={{ maxWidth: "100px" }}></Column>
                    <Column field='end_date' header='Bitiş Yılı' sortable style={{ maxWidth: "100px" }}></Column>
                    <Column field='location' header='Konum' sortable style={{ maxWidth: "160px" }}></Column>
                    <Column field='street_view' header='Sokak Görünümü' body={streetViewTemplate} style={{ maxWidth: "160px" }}></Column>
                </DataTable>
            </div>

            <Dialog
                visible={productDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header='Konum Ekle'
                modal
                className='p-fluid'
                footer={productDialogFooter}
                onHide={hideDialog}
            >
                <div className='field'>
                    <label htmlFor='name' className='font-bold'>
                        İsim
                    </label>
                    <InputText
                        id='name'
                        value={product.name}
                        onChange={(e) => onInputChange(e, "name")}
                        required
                        autoFocus
                        className={classNames({ "p-invalid": submitted && !product.name })}
                    />
                    {submitted && !product.name && <small className='p-error'>İsim zorunludur.</small>}
                </div>
                <div className='field'>
                    <label htmlFor='description' className='font-bold'>
                        Açıklama
                    </label>
                    <InputTextarea
                        id='description'
                        value={product.description}
                        onChange={(e) => onInputChange(e, "description")}
                        required
                        rows={3}
                        cols={20}
                    />
                </div>

                <div className='formgrid grid'>
                    <div className='field col'>
                        <label htmlFor='start_date' className='font-bold'>
                            Başlangıç Yılı
                        </label>
                        <InputText
                            id='start_date'
                            maxLength={4}
                            value={product.start_date}
                            onChange={(e) => onInputChange(e, "start_date")}
                        />
                    </div>
                    <div className='field col'>
                        <label htmlFor='end_date' className='font-bold'>
                            Bitiş Yılı
                        </label>
                        <InputText id='end_date' maxLength={4} value={product.end_date} onChange={(e) => onInputChange(e, "end_date")} />
                    </div>
                </div>

                <div className='field'>
                    <label htmlFor='category' className='font-bold'>
                        Kategori
                    </label>
                    <InputText id='category' value={product.category} onChange={(e) => onInputChange(e, "category")} />
                </div>

                <div className='field'>
                    <label htmlFor='optimization' className='font-bold'>
                        Alt Kategori
                    </label>
                    <InputText id='optimization' value={product.optimization} onChange={(e) => onInputChange(e, "optimization")} />
                </div>

                <div className='field'>
                    <label htmlFor='icon' className='font-bold'>
                        İkon Linki
                    </label>
                    <InputText id='icon' value={product.icon} onChange={(e) => onInputChange(e, "icon")} />
                </div>

                <div className='field'>
                    <label htmlFor='current_local' className='font-bold'>
                        Şimdiki Konum
                    </label>
                    <InputText id='current_local' value={product.current_local} onChange={(e) => onInputChange(e, "current_local")} />
                </div>

                <div className='field'>
                    <label htmlFor='current_status' className='font-bold'>
                        Şimdiki Durum
                    </label>
                    <InputText id='current_status' value={product.current_status} onChange={(e) => onInputChange(e, "current_status")} />
                </div>

                <div className='field'>
                    <label htmlFor='location' className='font-bold'>
                        Koordinatlar (virgülle ayırarak)
                    </label>
                    <InputText id='location' value={product.location} onChange={(e) => onInputChange(e, "location")} />
                </div>

                <div className='field'>
                    <label htmlFor='street_view' className='font-bold'>
                        Sokak Görünümü Linki
                    </label>
                    <InputText id='street_view' value={product.street_view} onChange={(e) => onInputChange(e, "street_view")} />
                </div>

                <div className='field'>
                    <label htmlFor='image' className='font-bold'>
                        Görsellerin Linkleri (virgülle ayınırarak)
                    </label>
                    <InputText id='image' value={product.image} onChange={(e) => onInputChange(e, "image")} />
                </div>
            </Dialog>

            <Dialog
                visible={deleteProductDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header='Onayla'
                modal
                footer={deleteProductDialogFooter}
                onHide={hideDeleteProductDialog}
            >
                <div className='confirmation-content'>
                    <i className='pi pi-exclamation-triangle mr-3' style={{ fontSize: "2rem" }} />
                    {product && (
                        <span>
                            Şunu silmek istediğine emin misin: <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog
                visible={deleteProductsDialog}
                style={{ width: "32rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header='Onayla'
                modal
                footer={deleteProductsDialogFooter}
                onHide={hideDeleteProductsDialog}
            >
                <div className='confirmation-content'>
                    <i className='pi pi-exclamation-triangle mr-3' style={{ fontSize: "2rem" }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}
