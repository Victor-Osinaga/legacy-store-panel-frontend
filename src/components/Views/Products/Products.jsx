import { Link } from "react-router-dom";
import getProducts from "../../../services/products/getProducts";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import useStoreContext from "../../../provider/storeProvider";
import MainTitle from "../../Fragments/MainTitle/MainTitle";
import ActionsInGroup from "../../Fragments/ActionsInGroup/ActionsInGroup";
import toNumberArgStandard from "../../../utils/toNumberArgStandard";

// modal
import ModalDelete from "../../Fragments/ModalDelete/ModalDelete";

// icons
import OutlineMore from "../../Icons/OutlineMore/OutlineMore";
import EditIcon from "../../Icons/EditIcon/EditIcon";
import DeleteIcon from "../../Icons/DeleteIcon/DeleteIcon";
import deleteProductById from "../../../services/products/deleteProductById";
import NoItems from "../../Fragments/NoItems/NoItems";

export default function Products() {
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
  const [products, setProducts] = useState([]);

  const [allProductsSelected, setAllProductsSelected] = useState(false);
  const [showBtnActions, setShowBtnActions] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    showModal: false,
    productId: null,
    productName: "",
  });

  useEffect(() => {
    setLoading(true);
    fetchProducts();
    return () => {
      dismissToast();
    };
  }, []);

  const fetchProducts = async () => {
    const id = toastLoading("Cargando productos...");
    try {
      const productos = await getProducts();
      const productsWithSelection = productos.map((product) => ({
        ...product,
        selected: false,
      }));
      setProducts(productsWithSelection);

      setTimeout(() => {
        // si const productos esta fuera del try no toma el valor para el condicional de abajo
        setLoading(false);
        if (productos.length == 0) {
          return toastSuccess(
            <>
              No hay productos cargados: <strong>'{productos.length}'</strong>
            </>,
            id
          );
        }

        return toastSuccess(
          <>
            Productos cargados: <strong>'{productos.length}'</strong>
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

  const selectProduct = (productId) => {
    const newProducts = products.map((prod) =>
      prod.id === productId ? { ...prod, selected: !prod.selected } : prod
    );
    setProducts(newProducts);

    // newProducts.forEach(prod => {
    //     if (prod.selected === true) {
    //         setAllProductsSelected(false)
    //         setShowBtnActions(true)
    //     }
    // })

    const algunaSeleccionada = newProducts.some((p) => p.selected == true);
    if (algunaSeleccionada) {
      setAllProductsSelected(false);
      setShowBtnActions(true);
    }

    const noHayProductosSeleccionados = newProducts.every(
      (producto) => producto.selected == false
    );
    const todosLosProductosSeleccionados = newProducts.every(
      (producto) => producto.selected == true
    );
    if (noHayProductosSeleccionados) {
      setAllProductsSelected(false);
      setShowBtnActions(false);
    } else if (todosLosProductosSeleccionados) {
      setAllProductsSelected(true);
      setShowBtnActions(true);
    }

    console.log("selected product", newProducts);
  };

  const selectAllProducts = () => {
    if (allProductsSelected) {
      const newProducts = selectAll(false, products);
      setAllProductsSelected(false);
      setShowBtnActions(false);
      setProducts(newProducts);
    } else {
      const newProducts = selectAll(true, products);
      setAllProductsSelected(true);
      setShowBtnActions(true);
      setProducts(newProducts);
    }
  };

  const deleteProductsSelected = () => {
    const productsSelected = products.filter((prod) => prod.selected);
    const idProductsSelected = productsSelected.map((prod) => prod.id);
    console.log("productos seleccionados", productsSelected);
    console.log("id productos", idProductsSelected);
  };

  const eliminarProductoPorId = async (productId, productName) => {
    setModalInfo({ showModal: false, productId: null, productName: "" });
    const toastId = toastLoading("Eliminando producto...");
    try {
      const result = await deleteProductById(productId, productName);
      const products = await getProducts();
      const productsWithSelection = selectAll(false, products);
      setProducts(productsWithSelection);
      console.log(
        "nuevos productos desde :  deleteById",
        productsWithSelection
      );
      return toastSuccess(
        <>
          Producto eliminado: <strong>'{productName}'</strong> - cantidad:{" "}
          <strong>'{result.data.deletedCount}'</strong>
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
    setModalInfo({ showModal: true, productId: id, productName: name });
  };

  const closeModal = () => {
    setModalInfo({ showModal: false, productId: null, productName: "" });
  };

  const calculateTotalStock = (sizes) => {
    let totalStock = 0;
    sizes.forEach((size) => {
      size.colors.forEach((color) => {
        totalStock += color.stock;
      });
    });
    return totalStock;
  };

  return (
    <>
      <section className="containerViewMain">
        <MainTitle
          mainTitle="Productos"
          linkToCreate="/admin/productos/crear"
          titleButton="Nuevo Producto"
        />
        <div className="text-secondary mb-2 fontSM-Custom">
          <p className="m-0">
            Aqui estaran las ordenes de compra de tus clientes con sus
            respectivos estados del proceso de compra
          </p>
        </div>
        {!loading ? (
          products.length > 0 ? (
            <>
              <ActionsInGroup
                handlebtnActionMains={showBtnActions}
                deleteGroup={deleteProductsSelected}
              />
              <div className="tableContainerMain rounded">
                <table className="tableContainerViewMain bg-white w-100">
                  <thead className="tableHeadTitlesMain fontXS-Custom textGray500-Custom">
                    <tr>
                      <th className="thSpacingMain">
                        <input
                          className="form-check-input inputCheckBoxTableMain"
                          type="checkbox"
                          checked={allProductsSelected}
                          onChange={selectAllProducts}
                        />
                      </th>
                      <th className="thSpacingMain">
                        <span>NOMBRE</span>
                      </th>
                      <th className="thSpacingMain">
                        <span>PRECIO</span>
                      </th>
                      <th className="thSpacingMain">
                        <span>STOCK</span>
                      </th>
                      <th className="thSpacingMain">
                        <span>CATEGORIA PRIMARIA</span>
                      </th>
                      <th className="thSpacingMain">
                        <span>AGREGADO</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="fontSM-Custom">
                    {products.map((product, index) => (
                      <tr key={product.id}>
                        <td className="tdSpacingMain">
                          <input
                            className="form-check-input inputCheckBoxTableMain"
                            type="checkbox"
                            checked={product.selected}
                            onChange={() => selectProduct(product.id)}
                          />
                        </td>
                        <td className="fontSM-Custom tdSpacingMain">
                          <Link
                            className="trBodyLinkNameMain"
                            to={`/admin/productos/editar/${product.id}`}
                          >
                            <img
                              className="productImgMain"
                              src={product.image}
                              alt={product.name}
                            />
                            <span title={product.name}>
                              {truncarTexto(product.name)}
                            </span>
                          </Link>
                        </td>
                        <td className="fontSM-Custom tdSpacingMain text-success">
                          <span>${toNumberArgStandard(product.price)}</span>
                        </td>
                        <td className="fontSM-Custom textGray500-Custom tdSpacingMain fw-bold">
                          <span>{calculateTotalStock(product.sizes)} u</span>
                        </td>
                        <td className="fontSM-Custom textGray500-Custom tdSpacingMain">
                          <span
                            className={
                              product.categories[0].categoria.name ==
                                "Uncategorized" ||
                              product.categories[0].categoria.name ==
                                "uncategoried"
                                ? "text-danger fw-bold"
                                : ""
                            }
                          >
                            {product.categories[0].categoria.name}
                          </span>
                        </td>
                        <td className="fontSM-Custom textGray500-Custom tdSpacingMain">
                          <span>{product.timestamp}</span>
                        </td>
                        <td className="fontSM-Custom tdSpacingMain position-relative">
                          {/* poner el id a este contenedor para poder agregarle el mostrar more actions */}
                          <div className="d-flex ">
                            {/*  el width del button de abajo si esta activo el btn deja de ser cuadrado */}
                            <button
                              onClick={() => showItemActions(product.id)}
                              className="btnMoreActionsMain /*w-100*/ position-relative border border-0"
                            >
                              <OutlineMore />
                            </button>
                            <ul
                              id={product.id}
                              className={`submenuPruebaMain shadow-lg ${
                                index === products.length - 1 && index !== 0
                                  ? ""
                                  : ""
                              }`}
                            >
                              <li className="btnsMoreActionsContainerMain">
                                <Link
                                  to={`/admin/productos/editar/${product.id}`}
                                >
                                  <button className="btnActionMain textGray700-Custom">
                                    <EditIcon></EditIcon>
                                    Editar
                                  </button>
                                </Link>
                                {/* <button
                                                                    onClick={() => openModal(product.id, product.name)}
                                                                    className="btnActionMain textGray700-Custom"
                                                                >
                                                                    <DeleteIcon classList="textGray500-Custom svgSize" />
                                                                    Eliminar
                                                                </button> */}
                                <button
                                  onClick={() =>
                                    openModal(product.id, product.name)
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
                  id={modalInfo.productId}
                  name={modalInfo.productName}
                  closeModal={closeModal}
                  functionDelete={eliminarProductoPorId}
                  entity="product"
                />
              )}
            </>
          ) : (
            <NoItems msg="Todavia no se cargaron productos" />
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
