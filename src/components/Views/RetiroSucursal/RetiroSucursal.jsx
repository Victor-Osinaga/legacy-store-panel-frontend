
import { Link } from "react-router-dom";
import getShipmentsLocal from "../../../services/shipmentsLocal/getShipmentsLocal.js";
import OutlineMore from "../../Icons/OutlineMore/OutlineMore";
import EditIcon from "../../Icons/EditIcon/EditIcon";
import DeleteIcon from "../../Icons/DeleteIcon/DeleteIcon";
import useStoreContext from "../../../provider/storeProvider";
import MainTitle from "../../Fragments/MainTitle/MainTitle";
import { useEffect, useState } from "react";
import ActionsInGroup from "../../Fragments/ActionsInGroup/ActionsInGroup";
import toNumberArgStandard from "../../../utils/toNumberArgStandard.js";

// MODAL DELETE
import ModalDelete from "../../Fragments/ModalDelete/ModalDelete";
import NoItems from "../../Fragments/NoItems/NoItems.jsx";
import deleteShipmentLocalById from "../../../services/shipmentsLocal/deleteShipmentLocalById.js";

export default function RetiroSucursal() {
    const { selectAll, showItemActions, truncarTexto, toastLoading, toastSuccess, toastError, dismissToast } = useStoreContext()

    const [loading, setLoading] = useState(true)
    const [shipmentsLocal, setShipmentsLocal] = useState([])

    const [allShipmentsLocalSelected, setAllShipmentsLocalSelected] = useState(false);
    const [showBtnActions, setShowBtnActions] = useState(false);
    const [modalInfo, setModalInfo] = useState({ showModal: false, shipmentLocalId: null, shipmentLocalProvince: '' });

    useEffect(() => {
        setLoading(true)
        fetchShipmentsLocal()
        return () => {
            dismissToast()
        }
    }, [])

    const fetchShipmentsLocal = async () => {
        const id = toastLoading("Cargando sucursales")
        try {
            const shipmentsLocal = await getShipmentsLocal()
            // const shipmentsLocal = [
            //     {
            //         id: "1",
            //         province: "Buenos Aires",
            //         locality: "CABA",
            //         postalCode: "1001",
            //         streetName: "Avenida Siempre Viva",
            //         streetNumber: "742",
            //         shipmentCost: 300.00
            //     },
            //     {
            //         id: "2",
            //         province: "Salta",
            //         locality: "Capital",
            //         postalCode: "4400",
            //         streetName: "Avenida Siempre Viva",
            //         streetNumber: "742",
            //         shipmentCost: 300.00
            //     },
            // ]
            const shipmentsLocalWithSelection = shipmentsLocal.map(shipment => ({ ...shipment, selected: false }))
            setShipmentsLocal(shipmentsLocalWithSelection)

            setTimeout(() => {
                setLoading(false)
                if (shipmentsLocal.length == 0) {
                    return toastSuccess(<>No hay sucursales cargadas: <strong>'{shipmentsLocal.length}'</strong></>, id)
                }

                return toastSuccess(<>Sucursales cargadas: <strong>'{shipmentsLocal.length}'</strong></>, id)
            }, 500)
        } catch (error) {
            toastError(
                <div className='text-center'><p className='mb-0'><strong>{error.msg}</strong></p></div>,
                id
            )
            setLoading(true)
        }
    }

    const selectShipmentLocal = (shipmentId) => {
        const newShipmentsLocal = shipmentsLocal.map(shipment =>
            shipment.id === shipmentId
                ? { ...shipment, selected: !shipment.selected }
                : shipment
        )
        setShipmentsLocal(newShipmentsLocal)

        const algunaSeleccionada = newShipmentsLocal.some(p => p.selected == true)
        if (algunaSeleccionada) {
            setAllShipmentsLocalSelected(false)
            setShowBtnActions(true)
        }

        const ningunoSeleccionado = newShipmentsLocal.every(shipment => shipment.selected == false)
        const todosSeleccionados = newShipmentsLocal.every(shipment => shipment.selected == true)
        if (ningunoSeleccionado) {
            setAllShipmentsLocalSelected(false)
            setShowBtnActions(false)
        } else if (todosSeleccionados) {
            setAllShipmentsLocalSelected(true)
            setShowBtnActions(true)
        }
        console.log("selected shipmentLocal", newShipmentsLocal);
    }

    const selectAllShipmentsLocal = () => {
        if (allShipmentsLocalSelected) {
            const newShipmentsLocal = selectAll(false, shipmentsLocal)
            setAllShipmentsLocalSelected(false)
            setShipmentsLocal(false)
            setShipmentsLocal(newShipmentsLocal)
        } else {
            const newShipmentsLocal = selectAll(true, shipmentsLocal)
            setAllShipmentsLocalSelected(true)
            setShowBtnActions(true)
            setShipmentsLocal(newShipmentsLocal)
        }
    }

    const deleteShipmentsLocalSelected = () => {
        const shipmentsLocalSelected = shipmentsLocal.filter(shipment => shipment.selected)
        const idShipmentsLocalSelected = shipmentsLocalSelected.map(prod => prod.id)
        console.log("shipmentsLocal seleccionados", shipmentsLocalSelected);
        console.log("id shipmentsLocal", idShipmentsLocalSelected)
    }

    const eliminarShipmentLocalPorId = async (id, shipmentProvice) => {
        setModalInfo({ showModal: false, shipmentLocalId: null, shipmentLocalProvince: '' });
        const toastId = toastLoading("Eliminando sucursal...")
        try {
            const result = await deleteShipmentLocalById(id)
            const shipmentsLocal = await getShipmentsLocal()
            const shipmentsLocalWithSelection = selectAll(false, shipmentsLocal);
            setShipmentsLocal(shipmentsLocalWithSelection);
            console.log("nuevas sucursales desde deleteById", shipmentsLocalWithSelection);
            return toastSuccess(<>Sucursal eliminada: <strong>'{shipmentProvice}'</strong> - cantidad: <strong>'{result.deletedCount}'</strong></>, toastId)
        } catch (error) {
            console.log(error);
            toastError(
                <div className='text-center'><p className='mb-0'><strong>{error.msg}</strong></p></div>,
                toastId
            )
        }
    }

    const openModal = (id, name) => {
        showItemActions(id)
        setModalInfo({ showModal: true, shipmentLocalId: id, shipmentLocalProvince: name });
    };

    const closeModal = () => {
        setModalInfo({ showModal: false, shipmentLocalId: null, shipmentLocalProvince: '' });
    };

    return (
        <>
            <section className="containerViewMain">
                <MainTitle mainTitle='Retiro en sucursal' linkToCreate='/admin/retiro-en-sucursal/crear' titleButton='Nueva sucursal' />
                <div className="text-secondary mb-2 fontSM-Custom">
                    <p className="m-0">Aqui estara tu sucursal para que tus clientes puedan retirar los productos de tu tienda</p>
                </div>
                {!loading ? (
                    shipmentsLocal.length > 0 ? (
                        <>
                            <ActionsInGroup handlebtnActionMains={showBtnActions} deleteGroup={deleteShipmentsLocalSelected} />
                            <div className="tableContainerMain rounded">
                                <table className="tableContainerViewMain bg-white w-100">
                                    <thead className="tableHeadTitlesMain fontXS-Custom textGray-Custom">
                                        <tr>
                                            <th className="thSpacingMain">
                                                <input
                                                    className="form-check-input inputCheckBoxTableMain"
                                                    type="checkbox"
                                                    checked={allShipmentsLocalSelected}
                                                    onChange={selectAllShipmentsLocal}
                                                />
                                            </th>
                                            <th className="thSpacingMain"><span>PROVINCIA</span></th>
                                            <th className="thSpacingMain"><span>LOCALIDAD</span></th>
                                            <th className="thSpacingMain"><span>NOMBRE CALLE</span></th>
                                            <th className="thSpacingMain"><span>COD POSTAL</span></th>
                                            <th className="thSpacingMain"><span>NÚMERO</span></th>
                                            <th className="thSpacingMain"><span>COSTO</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="fontSM-Custom">
                                        {shipmentsLocal.map((shipment, index) => (
                                            <tr key={shipment.id}>
                                                <td className="tdSpacingMain">
                                                    <input
                                                        className="form-check-input inputCheckBoxTableMain"
                                                        type="checkbox"
                                                        checked={shipment.selected}
                                                        onChange={() => selectShipmentLocal(shipment.id)}
                                                    />
                                                </td>
                                                <td className="fontSM-Custom tdSpacingMain">
                                                    <Link className="trBodyLinkNameMain" to={`/admin/retiro-en-sucursal/editar/${shipment.id}`}>
                                                        <span title={shipment.province}>{truncarTexto(shipment.province)}</span>
                                                    </Link>
                                                </td>
                                                <td className="fontSM-Custom textGray-Custom tdSpacingMain">
                                                    <span>{shipment.locality}</span>
                                                </td>
                                                <td className="fontSM-Custom textGray-Custom tdSpacingMain">
                                                    <span title={shipment.streetName}>{truncarTexto(shipment.streetName)}</span>
                                                </td>
                                                <td className="fontSM-Custom textGray-Custom tdSpacingMain">
                                                    <span>{shipment.postalCode}</span>
                                                </td>
                                                <td className="fontSM-Custom textGray-Custom tdSpacingMain">
                                                    <span>{shipment.streetNumber}</span>
                                                </td>
                                                <td className="fontSM-Custom tdSpacingMain text-success">
                                                    <span>${toNumberArgStandard(shipment.shipmentCost)}</span>
                                                </td>
                                                <td className="fontSM-Custom tdSpacingMain position-relative">
                                                    <div className="d-flex">
                                                        <button onClick={() => showItemActions(shipment.id)} className="btnMoreActionsMain /*w-100*/ position-relative border border-0">
                                                            <OutlineMore />
                                                        </button>
                                                        <ul id={shipment.id} className={`submenuPruebaMain shadow-lg ${index === shipmentsLocal.length - 1 && index !== 0 ? '' : ''}`}>
                                                            <li className="btnsMoreActionsContainerMain">
                                                                <Link to={`/admin/retiro-en-sucursal/editar/${shipment.id}`}>
                                                                    <button className="btnActionMain textGray700-Custom">
                                                                        <EditIcon></EditIcon>
                                                                        Editar
                                                                    </button>
                                                                </Link>
                                                                <button
                                                                    onClick={() => openModal(shipment.id, shipment.province)}
                                                                    className="btnActionMain bg-danger text-white fontSM-Custom">
                                                                    <DeleteIcon classList="text-white svgSize" />
                                                                    Eliminar
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {modalInfo.showModal && <ModalDelete
                                id={modalInfo.shipmentLocalId}
                                name={modalInfo.shipmentLocalProvince}
                                closeModal={closeModal}
                                functionDelete={eliminarShipmentLocalPorId}
                                entity="shipmentLocal"
                            />}
                        </>
                    ) : (
                        <NoItems msg="Todavia no se cargaron sucursales"/>
                    )
                ) : (
                    <section className='spinnerContainer'>
                        <div className="spinner-grow" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </section>
                )}
            </section>
        </>
    )
}