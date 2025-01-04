import { useEffect, useState } from "react";
import MainTitle from "../../Fragments/MainTitle/MainTitle";
import getCategories from "../../../services/categorys/getCategories.js";
import useStoreContext from "../../../provider/storeProvider";
import { Link } from "react-router-dom";
import calculateTerciaryCategories from "../../../utils/calculateTerciaryCategories.js";
import DeleteIcon from "../../Icons/DeleteIcon/DeleteIcon.jsx";
import EditIcon from "../../Icons/EditIcon/EditIcon.jsx";
import OutlineMore from "../../Icons/OutlineMore/OutlineMore.jsx";
import ActionsInGroup from "../../Fragments/ActionsInGroup/ActionsInGroup.jsx";
import ModalDelete from "../../Fragments/ModalDelete/ModalDelete.jsx";
import deleteCategorieById from "../../../services/categorys/deleteCategorieById.js";
import getTotalProductsByCategoryId from "../../../utils/getTotalProductsByCategoryId.js";
import getProducts from "../../../services/products/getProducts.js";
import NoItems from "../../Fragments/NoItems/NoItems.jsx";

export default function Categories() {
  const {
    selectAll,
    toastLoading,
    toastSuccess,
    toastError,
    dismissToast,
    showItemActions,
    truncarTexto,
  } = useStoreContext();

  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [showBtnActions, setShowBtnActions] = useState(false);
  const [allCategoriesSelected, setAllCategoriesSelected] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    showModal: false,
    categorieId: null,
    categorieName: "",
  });

  useEffect(() => {
    setLoading(true);
    fetchCategories();
    fetchProducts();
    return () => {
      dismissToast();
    };
  }, []);

  const fetchCategories = async () => {
    const id = toastLoading("Cargando categorias...");
    try {
      const categorias = await getCategories();
      const categoriasWithSelection = categorias.map((cat) => ({
        ...cat,
        selected: false,
      }));
      setCategories(categoriasWithSelection);

      setTimeout(() => {
        // si const productos esta fuera del try no toma el valor para el condicional de abajo
        setLoading(false);
        if (categorias.length == 0) {
          return toastSuccess(
            <>
              Cantidad: <strong>'{categorias.length}'</strong>
            </>,
            id
          );
        }

        return toastSuccess(
          <>
            Categorias cargadas: <strong>'{categorias.length}'</strong>
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
              Cantidad: <strong>'{productos.length}'</strong>
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

  const deleteCategoriesSelected = () => {
    const categoriesSelected = categories.filter((cat) => cat.selected);
    const idProductsSelected = categoriesSelected.map((cat) => cat.id);
    console.log("categorias seleccionados", categoriesSelected);
    console.log("id categorias seleccionadas", idProductsSelected);
  };

  const selectAllCategories = () => {
    if (allCategoriesSelected) {
      const newCategories = selectAll(false, categories);
      setAllCategoriesSelected(false);
      setShowBtnActions(false);
      setCategories(newCategories);
    } else {
      const newCategories = selectAll(true, categories);
      setAllCategoriesSelected(true);
      setShowBtnActions(true);
      setCategories(newCategories);
    }
  };

  const selectCategorie = (categorieId) => {
    const newCategories = categories.map((cat) =>
      cat.id === categorieId ? { ...cat, selected: !cat.selected } : cat
    );
    setCategories(newCategories);

    const algunaSeleccionada = newCategories.some(
      (cat) => cat.selected == true
    );
    if (algunaSeleccionada) {
      setAllCategoriesSelected(false);
      setShowBtnActions(true);
    }

    const noHayCategoriasSeleccionadas = newCategories.every(
      (cat) => cat.selected == false
    );
    const todosLasCategoriasSeleccionadas = newCategories.every(
      (cat) => cat.selected == true
    );
    if (noHayCategoriasSeleccionadas) {
      setAllCategoriesSelected(false);
      setShowBtnActions(false);
    } else if (todosLasCategoriasSeleccionadas) {
      setAllCategoriesSelected(true);
      setShowBtnActions(true);
    }

    console.log("selected categorie", newCategories);
  };

  const openModal = (id, name) => {
    showItemActions(id);
    setModalInfo({ showModal: true, categorieId: id, categorieName: name });
  };

  const closeModal = () => {
    setModalInfo({ showModal: false, categorieId: null, categorieName: "" });
  };

  const eliminarCategoriaPorId = async (categorieId, categorieName) => {
    setModalInfo({ showModal: false, categorieId: null, categorieName: "" });
    const toastId = toastLoading("Eliminando categoria...");
    try {
      const result = await deleteCategorieById(categorieId, categorieName);
      const categories = await getCategories();
      const categoriesWithSelection = selectAll(false, categories);
      setCategories(categoriesWithSelection);
      console.log(
        "nuevas categorias desde deleteById",
        categoriesWithSelection
      );
      const products = await getProducts();
      const productsWithSelection = products.map((product) => ({
        ...product,
        selected: false,
      }));
      setProducts(productsWithSelection);
      return toastSuccess(
        <>
          Categoria eliminada: <strong>'{categorieName}'</strong>
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

  return (
    <>
      <section className="containerViewMain">
        <MainTitle
          mainTitle="Categorias"
          linkToCreate="/admin/categorias/crear"
          titleButton="Nueva Categoria"
        />
        <div className="text-secondary mb-2 fontSM-Custom">
          <p className="m-0">
            Aqui estaran todas las categorias de tu tienda, si eliminas una
            categoria no se eliminaran los productos asociados sino que estos se
            moveran a una categoria especial
          </p>
        </div>
        {/* <div className='d-flex justify-content-between align-items-center w-100'>
                    <div>
                        <h3 className='fs-4 mainTitle'>Categorias</h3>
                    </div>
                    <div className='btnNewContainer rounded py-1 '>
                        <Link to='/admin/categorias/crear' className='d-flex px-4 justify-content-between align-items-center'>
                            <svg className='svgSize text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <button className='btnNew border border-0 text-white bg-transparent'>
                                Nueva Categoria
                            </button>
                        </Link>
                    </div>
                </div> */}
        {!loading ? (
          categories.length > 0 && products ? (
            <>
              <ActionsInGroup
                handlebtnActionMains={showBtnActions}
                deleteGroup={deleteCategoriesSelected}
              />
              <div className="tableContainerMain rounded">
                <table className="tableContainerViewMain bg-white w-100">
                  <thead className="tableHeadTitlesMain fontXS-Custom textGray500-Custom">
                    <tr>
                      <th className="thSpacingMain">
                        <input
                          className="form-check-input inputCheckBoxTableMain"
                          type="checkbox"
                          checked={allCategoriesSelected}
                          onChange={selectAllCategories}
                        />
                      </th>
                      <th className="thSpacingMain">
                        <span>PRIMARIA</span>
                      </th>
                      <th className="thSpacingMain">
                        <span>SECUNDARIA</span>
                      </th>
                      <th className="thSpacingMain">
                        <span>TERCIARIA</span>
                      </th>
                      <th className="thSpacingMain">
                        <span>PRODUCTOS</span>
                      </th>
                      {/* <th className='thSpacingMain'><span>AGREGADO</span></th> */}
                    </tr>
                  </thead>
                  <tbody className="fontSM-Custom">
                    {categories.map((cat, index) => (
                      <tr key={cat.id}>
                        <td className="tdSpacingMain">
                          <input
                            className="form-check-input inputCheckBoxTableMain"
                            type="checkbox"
                            checked={cat.selected}
                            onChange={() => selectCategorie(cat.id)}
                          />
                        </td>
                        <td className="fontSM-Custom tdSpacingMain">
                          <Link
                            className="trBodyLinkNameMain"
                            to={`/admin/categorias/editar/${cat.id}`}
                          >
                            {/* <img className='productImgMain' src={cat.image} alt={cat.name} /> */}
                            <span title={cat.name}>
                              {truncarTexto(cat.name)}
                            </span>
                          </Link>
                        </td>
                        <td className="fontSM-Custom tdSpacingMain">
                          <span>{cat.subCategories.length} (total)</span>
                        </td>
                        <td className="fontSM-Custom textGray500-Custom tdSpacingMain fw-bold">
                          <span>
                            {calculateTerciaryCategories(cat.subCategories)}{" "}
                            (total)
                          </span>
                        </td>
                        <td className="fontSM-Custom textGray500-Custom tdSpacingMain fw-bold">
                          <span>
                            {getTotalProductsByCategoryId(cat.id, products)}{" "}
                            (total)
                          </span>
                        </td>
                        {/* <td className="fontSM-Custom textGray500-Custom tdSpacingMain"><span>{product.timestamp}</span></td> */}
                        <td className="fontSM-Custom tdSpacingMain position-relative">
                          {/* poner el id a este contenedor para poder agregarle el mostrar more actions */}
                          <div className="d-flex ">
                            {/*  el width del button de abajo si esta activo el btn deja de ser cuadrado */}
                            <button
                              onClick={() => showItemActions(cat.id)}
                              className="btnMoreActionsMain /*w-100*/ position-relative border border-0"
                            >
                              <OutlineMore />
                            </button>
                            <ul
                              id={cat.id}
                              className={`submenuPruebaMain shadow-lg ${
                                index === cat.length - 1 && index !== 0
                                  ? ""
                                  : ""
                              }`}
                            >
                              <li className="btnsMoreActionsContainerMain">
                                {/* <Link to={`/admin/categorias/editar/${cat.id}`}>
                                                                    <button className="btnActionMain textGray700-Custom">
                                                                        <EditIcon />
                                                                        Editar
                                                                    </button>
                                                                </Link> */}
                                <button
                                  onClick={() => openModal(cat.id, cat.name)}
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
                  id={modalInfo.categorieId}
                  name={modalInfo.categorieName}
                  closeModal={closeModal}
                  functionDelete={eliminarCategoriaPorId}
                  entity="category"
                />
              )}
            </>
          ) : (
            <NoItems msg="Todavia no se cargaron categorias" />
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
