import { useEffect, useState } from "react";
import MainTitle from "../../Fragments/MainTitle/MainTitle";
import NoItems from "../../Fragments/NoItems/NoItems";
import ActionsInGroup from "../../Fragments/ActionsInGroup/ActionsInGroup";
import { Link } from "react-router-dom";
import useStoreContext from "../../../provider/storeProvider";
import toNumberArgStandard from "../../../utils/toNumberArgStandard.js";
import OutlineMore from "../../Icons/OutlineMore/OutlineMore";
import EditIcon from "../../Icons/EditIcon/EditIcon";
import DeleteIcon from "../../Icons/DeleteIcon/DeleteIcon";
import ModalDelete from "../../Fragments/ModalDelete/ModalDelete";
import getShipmentsDelivery from "../../../services/shipmentsDelivery/getShipmentsDelivery.js";
import deleteShipmentDeliveryById from "../../../services/shipmentsDelivery/deleteShipmentDeliveryById.js";

export default function ShipmentsDelivery() {
  const {
    selectAll,
    showItemActions,
    truncarTexto,
    toastLoading,
    toastSuccess,
    toastError,
    dismissToast,
  } = useStoreContext();

  const [loading, setLoading] = useState(true);
  const [shipmentsDelivery, setShipmentsDelivery] = useState([]);

  const [allShipmentsDeliverySelected, setAllShipmentsDeliverySelected] =
    useState(false);
  const [showBtnActions, setShowBtnActions] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    showModal: false,
    shipmentDeliveryId: null,
    shipmentDeliveryProvince: "",
  });

  useEffect(() => {
    setLoading(true);
    fetchShipmentsDelivery();
    return () => {
      dismissToast();
    };
  }, []);

  const fetchShipmentsDelivery = async () => {
    const id = toastLoading("Cargando provincias");
    try {
      const shipmentsDelivery = await getShipmentsDelivery();
      // const shipmentsDelivery = [
      //     {
      //         id: "1",
      //         province: "Buenos Aires",
      //         shipmentCost: 300.00
      //     },
      //     {
      //         id: "2",
      //         province: "Salta",
      //         shipmentCost: 300.00
      //     },
      // ]
      const shipmentsDeliveryWithSelection = shipmentsDelivery.map(
        (shipment) => ({ ...shipment, selected: false })
      );
      setShipmentsDelivery(shipmentsDeliveryWithSelection);

      setTimeout(() => {
        setLoading(false);
        if (shipmentsDelivery.length == 0) {
          return toastSuccess(
            <>
              No hay sucursales cargadas:{" "}
              <strong>'{shipmentsDelivery.length}'</strong>
            </>,
            id
          );
        }

        return toastSuccess(
          <>
            Provincias cargadas: <strong>'{shipmentsDelivery.length}'</strong>
          </>,
          id
        );
      }, 500);
    } catch (error) {
      toastError(
        <div className="text-center">
          <p className="mb-0">
            <strong>{error.msg}</strong>
          </p>
        </div>,
        id
      );
      setLoading(true);
    }
  };

  const selectShipmentDelivery = (shipmentId) => {
    const newShipmentsDelivery = shipmentsDelivery.map((shipment) =>
      shipment.id === shipmentId
        ? { ...shipment, selected: !shipment.selected }
        : shipment
    );
    setShipmentsDelivery(newShipmentsDelivery);

    const algunaSeleccionada = newShipmentsDelivery.some(
      (p) => p.selected == true
    );
    if (algunaSeleccionada) {
      setAllShipmentsDeliverySelected(false);
      setShowBtnActions(true);
    }

    const ningunoSeleccionado = newShipmentsDelivery.every(
      (shipment) => shipment.selected == false
    );
    const todosSeleccionados = newShipmentsDelivery.every(
      (shipment) => shipment.selected == true
    );
    if (ningunoSeleccionado) {
      setAllShipmentsDeliverySelected(false);
      setShowBtnActions(false);
    } else if (todosSeleccionados) {
      setAllShipmentsDeliverySelected(true);
      setShowBtnActions(true);
    }
    console.log("selected shipmentDelivery", newShipmentsDelivery);
  };

  const selectAllShipmentsDelivery = () => {
    if (allShipmentsDeliverySelected) {
      const newShipmentsDelivery = selectAll(false, shipmentsDelivery);
      setAllShipmentsDeliverySelected(false);
      setShipmentsDelivery(newShipmentsDelivery);
    } else {
      const newShipmentsDelivery = selectAll(true, shipmentsDelivery);
      setAllShipmentsDeliverySelected(true);
      setShowBtnActions(true);
      setShipmentsDelivery(newShipmentsDelivery);
    }
  };

  const deleteShipmentsDeliverySelected = () => {
    const shipmentsDeliverySelected = shipmentsDelivery.filter(
      (shipment) => shipment.selected
    );
    const idShipmentsDeliverySelected = shipmentsDeliverySelected.map(
      (prod) => prod.id
    );
    console.log("shipmentsDelivery seleccionados", shipmentsDeliverySelected);
    console.log("id shipmentsDelivery", idShipmentsDeliverySelected);
  };

  const eliminarShipmentDeliveryPorId = async (id, shipmentProvice) => {
    setModalInfo({
      showModal: false,
      shipmentDeliveryId: null,
      shipmentDeliveryProvince: "",
    });
    const toastId = toastLoading("Eliminando provincia...");
    try {
      const result = await deleteShipmentDeliveryById(id);
      console.log("result desde eliminarShipmentDeliveryPorId: ", result);

      const shipmentsDelivery = await getShipmentsDelivery();
      const shipmentsDeliveryWithSelection = selectAll(
        false,
        shipmentsDelivery
      );
      setShipmentsDelivery(shipmentsDeliveryWithSelection);
      console.log(
        "nuevas provincias desde deleteById",
        shipmentsDeliveryWithSelection
      );
      return toastSuccess(
        <>
          Provincia eliminada: <strong>'{shipmentProvice}'</strong> - cantidad:{" "}
          <strong>'{result.deletedCount}'</strong>
        </>,
        toastId
      );
    } catch (error) {
      console.log(error);
      toastError(
        <div className="text-center">
          <p className="mb-0">
            <strong>{error.msg}</strong>
          </p>
        </div>,
        toastId
      );
    }
  };

  const openModal = (id, name) => {
    showItemActions(id);
    setModalInfo({
      showModal: true,
      shipmentDeliveryId: id,
      shipmentDeliveryProvince: name,
    });
  };

  const closeModal = () => {
    setModalInfo({
      showModal: false,
      shipmentDeliveryId: null,
      shipmentDeliveryProvince: "",
    });
  };

  return (
    <>
      <section className="containerViewMain">
        <MainTitle
          mainTitle="Envios a provincias"
          linkToCreate="/admin/envios/crear"
          titleButton="Crear provincia"
        />
        <div className="text-secondary mb-2 fontSM-Custom">
          <p className="m-0">
            Aqui estaran todas las provincias a las que admitas enviar tus
            productos con su costo
          </p>
        </div>

        {!loading ? (
          shipmentsDelivery.length > 0 ? (
            <>
              <ActionsInGroup
                handlebtnActionMains={showBtnActions}
                deleteGroup={deleteShipmentsDeliverySelected}
              />
              <div className="tableContainerMain rounded">
                <table className="tableContainerViewMain bg-white w-100">
                  <thead className="tableHeadTitlesMain fontXS-Custom textGray500-Custom">
                    <tr>
                      <th className="thSpacingMain">
                        <input
                          className="form-check-input inputCheckBoxTableMain"
                          type="checkbox"
                          checked={allShipmentsDeliverySelected}
                          onChange={selectAllShipmentsDelivery}
                        />
                      </th>
                      <th className="thSpacingMain">
                        <span>PROVINCIA</span>
                      </th>
                      <th className="thSpacingMain">
                        <span>COSTO</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="fontSM-Custom">
                    {shipmentsDelivery.map((shipment, index) => (
                      <tr key={shipment.id}>
                        <td className="tdSpacingMain">
                          <input
                            className="form-check-input inputCheckBoxTableMain"
                            type="checkbox"
                            checked={shipment.selected}
                            onChange={() => selectShipmentDelivery(shipment.id)}
                          />
                        </td>
                        <td className="fontSM-Custom tdSpacingMain">
                          <Link
                            className="trBodyLinkNameMain"
                            to={`/admin/retiro-en-sucursal/editar/${shipment.id}`}
                          >
                            <span title={shipment.province}>
                              {truncarTexto(shipment.province)}
                            </span>
                          </Link>
                        </td>
                        <td className="fontSM-Custom tdSpacingMain text-success">
                          <span>
                            ${toNumberArgStandard(shipment.shipmentCost)}
                          </span>
                        </td>
                        <td className="fontSM-Custom tdSpacingMain position-relative">
                          <div className="d-flex">
                            <button
                              onClick={() => showItemActions(shipment.id)}
                              className="btnMoreActionsMain /*w-100*/ position-relative border border-0"
                            >
                              <OutlineMore />
                            </button>
                            <ul
                              id={shipment.id}
                              className={`submenuPruebaMain shadow-lg ${
                                index === shipmentsDelivery.length - 1 &&
                                index !== 0
                                  ? ""
                                  : ""
                              }`}
                            >
                              <li className="btnsMoreActionsContainerMain">
                                <Link
                                  to={`/admin/envios/editar/${shipment.id}`}
                                >
                                  <button className="btnActionMain textGray700-Custom">
                                    <EditIcon></EditIcon>
                                    Editar
                                  </button>
                                </Link>
                                <button
                                  onClick={() =>
                                    openModal(shipment.id, shipment.province)
                                  }
                                  className="btnActionMain bg-danger text-white fontSM-Custom"
                                >
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
              {modalInfo.showModal && (
                <ModalDelete
                  id={modalInfo.shipmentDeliveryId}
                  name={modalInfo.shipmentDeliveryProvince}
                  closeModal={closeModal}
                  functionDelete={eliminarShipmentDeliveryPorId}
                  entity="shipmentDelivery"
                />
              )}
            </>
          ) : (
            <NoItems msg="Todavia no se cargaron provincias" />
          )
        ) : (
          <section className="spinnerContainer">
            <div className="spinner-grow" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </section>
        )}
      </section>
    </>
  );
}
