import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useStoreContext from "../../../provider/storeProvider";
import { useForm, useFieldArray } from "react-hook-form";
import { nameCategorieValidator } from "../../../validators/validators";
import createCategorie from "../../../services/categorys/createCategorie";

export default function CreateCategorie() {
  const { toastLoading, toastSuccess, toastError, dismissToast } =
    useStoreContext();

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      id: uuidv4(),
      // name: 'MUJERESSSSSS',
      name: "",
      subCategories: [
        {
          id: uuidv4(),
          // name: 'INVIERNOOOOO',
          name: "",
          categories: [
            {
              id: uuidv4(),
              // name: 'CAMPERASSSSS',
              name: "",
            },
          ],
        },
        // {
        //     id: uuidv4(),
        //     // name: 'VERANOOOOOOO',
        //     name: '',
        //     categories: [
        //         {
        //             id: uuidv4(),
        //             // name: 'REMERASSSSSSS',
        //             name: ''
        //         },
        //         {
        //             id: uuidv4(),
        //             // name: 'SHORTSSSSSS',
        //             name: '',
        //         }
        //     ]
        // },
      ],
    },
  });

  const {
    fields: subCategoriesFields,
    append: appendSubCategorie,
    remove: removeSubCategorie,
  } = useFieldArray({
    control,
    name: "subCategories",
  });

  useEffect(() => {
    setLoading(true);
    fetch();
    return () => {
      dismissToast();
    };
  }, []);

  const fetch = async () => {
    const id = toastLoading("Cargando...");
    try {
      // const currentValues = getValues()
      // reset({
      //     ...currentValues,
      // });
      setTimeout(() => {
        // si const productos esta fuera del try no toma el valor para el condicional de abajo
        setLoading(false);
        return toastSuccess("Completo", id);
      }, 500);
    } catch (error) {
      toastError(
        // <div className='text-center'><p className='mb-0'><strong>{error.msg}</strong></p></div>,
        <div className="text-center">
          <p className="mb-0">
            <strong>ERROR</strong>
          </p>
        </div>,
        id
      );
      setLoading(true);
    }
  };

  const handleAddSubCategorie = () => {
    const toastId = toastLoading("Añdiendo categoria secundaria");
    try {
      const newSubCategorie = {
        id: uuidv4(),
        // name: 'categoria secundaria incorporada',
        name: "",
        categories: [
          {
            id: uuidv4(),
            // name: "categoria terciaria incorporada",
            name: "",
          },
        ],
      };
      appendSubCategorie(newSubCategorie);
      toastSuccess(
        "Categoria secundaria añadida, porfavor completa sus datos",
        toastId
      );
    } catch (error) {
      // console.log("error al añadir el talle");
      toastError(
        <div className="text-center">
          <p className="mb-0">
            <strong>Error al añadir una categoria secundaria </strong>
          </p>
        </div>,
        toastId
      );
    }
  };

  const handleRemoveSubCategorieById = (subCategorieId, subCategorieName) => {
    const toastId = toastLoading("Eliminando subcategoria...");
    const index = subCategoriesFields.findIndex(
      (sub) => sub.id === subCategorieId
    );
    if (index !== -1 && subCategoriesFields.length > 1) {
      removeSubCategorie(index);
      return toastSuccess(
        <>
          Categoria secundaria eliminada: <strong>'{subCategorieName}'</strong>{" "}
          - id: <strong>'{subCategorieId}'</strong>
        </>,
        toastId
      );
    } else {
      toastError(
        <div className="text-center">
          <p className="mb-0">
            Minimo una categoria secundaria<strong></strong>
          </p>
        </div>,
        toastId
      );
    }
  };

  const handleRemoveTerciaryCategoryById = (
    subCategorieIndex,
    terciaryCategorieId,
    terciaryCategorieName
  ) => {
    const toastId = toastLoading("Eliminando categoria terciaria...");

    const categoriesOfSubCategorie = getValues(
      `subCategories[${subCategorieIndex}].categories`
    );
    const terciaryCategorieIndex = categoriesOfSubCategorie.findIndex(
      (categorie) => categorie.id === terciaryCategorieId
    );
    if (terciaryCategorieIndex !== -1 && categoriesOfSubCategorie.length > 1) {
      categoriesOfSubCategorie.splice(terciaryCategorieIndex, 1);
      setValue(
        `subCategories[${subCategorieIndex}].categories`,
        categoriesOfSubCategorie
      );
      return toastSuccess(
        <>
          Categoria terciaria eliminada:{" "}
          <strong>'{terciaryCategorieName}'</strong> - id:{" "}
          <strong>'{terciaryCategorieId}'</strong>
        </>,
        toastId
      );
    } else {
      toastError(
        <div className="text-center">
          <span>Minimo una categoria terciaria</span>
        </div>,
        toastId
      );
    }
  };

  const handleAddTerciaryCategorie = (subCategorieIndex) => {
    const toastId = toastLoading("Añadiendo categoria terciaria...");

    const categoriesOfSubcategorie = getValues(
      `subCategories[${subCategorieIndex}].categories`
    );
    categoriesOfSubcategorie.push({
      id: uuidv4(),
      name: "",
    });
    setValue(
      `subCategories[${subCategorieIndex}].categories`,
      categoriesOfSubcategorie
    );

    return toastSuccess(
      "Categoria terciaria añadida, porfavor completa sus datos",
      toastId
    );
  };

  const onSubmit = async (data) => {
    console.log("data", data);
    const toastId = toastLoading("Creando categoria");
    try {
      const categorie = await createCategorie(data);
      return toastSuccess(
        <>
          Categoria creada: <strong>'{categorie.name}'</strong> - id:{" "}
          <strong>'{categorie.id}'</strong>
        </>,
        toastId
      );
    } catch (error) {
      toastError(
        <div className="text-center">
          <span>{error.msg}</span>
        </div>,
        toastId
      );
    }
  };

  // watch()

  return (
    <>
      <section className="containerViewMain">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            <h3 className="fs-4 mainTitle">Nueva Categoria</h3>
          </div>
        </div>

        {/* ESPACIADOR */}
        <div className="btnActionMainsContainer mb-2"></div>

        {!loading ? (
          <div className="container-fluid p-0">
            <div className="row justify-content-between p-2 p-md-0 m-0">
              <div className="col-12 col-md-7 p-0 pe-md-3 mb-3 mb-md-0">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white border px-4 py-4 rounded"
                >
                  {/* CATEGORIA PRIMARIA */}
                  <div className="row mb-3">
                    <p className="col-12 mb-2 text-center fw-semibold textGray500-Custom fontSM-Custom">
                      Categoria Primaria
                    </p>
                    <div className="row rounded border col-12 p-0 py-2 mx-auto">
                      <div className="d-flex flex-column mb-2">
                        <label
                          htmlFor="nombre"
                          className="d-flex mb-1 fw-semibold textGray500-Custom fontSM-Custom"
                        >
                          Nombre - Categoria Primaria
                        </label>
                        <input
                          type="text"
                          className="form-control fontSM-Custom custom-placeholder"
                          placeholder="HOMBRE"
                          {...register("name", {
                            required: {
                              value: true,
                              message: "El 'nombre primario' es requerido",
                            },
                            validate: nameCategorieValidator,
                          })}
                        />
                        {errors.name && (
                          <span className="mt-1 fontXS-Custom text-danger">
                            {errors.name.message}{" "}
                            <span className="fw-semibold">*</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* CATEGORIA SECUNDARIA Y TERCIARIA */}
                  {subCategoriesFields.map((sub, subIndex) => (
                    <div key={sub.id} className="row mb-3">
                      <p className="col-12 mb-2 text-center fw-semibold textGray500-Custom fontSM-Custom">
                        Categoria Secundaria y Terciaria
                      </p>
                      {/* {subIndex == 0 ? (
                                            <p className='col-12 mb-2 text-center fw-semibold textGray500-Custom fontSM-Custom'>Categoria Secundaria y Terciaria</p>
                                            ) : ""} */}
                      <div
                        id={sub.id}
                        className="row rounded border col-12 p-0 py-2 mx-auto"
                      >
                        <div className="d-flex flex-column mb-2">
                          <label className="d-flex mb-1 fw-semibold textGray500-Custom fontSM-Custom">
                            Nombre - Categoria Secundaria
                          </label>
                          <div className="d-flex gap-1">
                            <input
                              type="text"
                              className="form-control fontSM-Custom custom-placeholder"
                              placeholder="Invierno"
                              {...register(`subCategories.${subIndex}.name`, {
                                required: {
                                  value: true,
                                  message:
                                    "El 'nombre secundaria' es requerido",
                                },
                                validate: nameCategorieValidator,
                              })}
                            />
                            <button
                              onClick={() =>
                                handleRemoveSubCategorieById(
                                  sub.id,
                                  getValues(`subCategories.${subIndex}.name`)
                                )
                              }
                              type="button"
                              className="btn btn-outline-danger btn-sm rounded"
                              title="Eliminar categoria SECUNDARIA"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                style={{ color: "inherit" }}
                                className="svgSize"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                ></path>
                              </svg>
                            </button>
                          </div>
                          {errors.subCategories?.[subIndex]?.name && (
                            <span className="mt-1 fontXS-Custom text-danger">
                              {errors.subCategories?.[subIndex]?.name?.message}{" "}
                              <span className="fw-semibold">*</span>
                            </span>
                          )}
                        </div>
                        {watch(`subCategories[${subIndex}].categories`).map(
                          (subsub, subsubIndex) => (
                            <div
                              key={subsub.id}
                              className="d-flex flex-column mb-2"
                            >
                              {subsubIndex == 0 ? (
                                <label className="d-flex mb-1 fw-semibold textGray500-Custom fontSM-Custom">
                                  Nombre - Categoria Terciaria
                                </label>
                              ) : (
                                ""
                              )}
                              <div className="d-flex gap-1">
                                <input
                                  type="text"
                                  className="form-control fontSM-Custom custom-placeholder"
                                  placeholder="Camperas"
                                  {...register(
                                    `subCategories.${subIndex}.categories.${subsubIndex}.name`,
                                    {
                                      required: {
                                        value: true,
                                        message:
                                          "El 'nombre terciario' es requerido",
                                      },
                                      validate: nameCategorieValidator,
                                    }
                                  )}
                                />

                                {/* BTN ELIMINAR CATEGORIA TERCIARIA */}
                                <button
                                  onClick={() =>
                                    handleRemoveTerciaryCategoryById(
                                      subIndex,
                                      subsub.id,
                                      getValues(
                                        `subCategories.${subIndex}.categories.${subsubIndex}.name`
                                      )
                                    )
                                  }
                                  type="button"
                                  className="btn btn-outline-danger btn-sm rounded"
                                  title="Eliminar categoria TERCIARIA"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    style={{ color: "inherit" }}
                                    className="svgSize"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    ></path>
                                  </svg>
                                </button>
                              </div>
                              {errors.subCategories?.[subIndex]?.categories?.[
                                subsubIndex
                              ]?.name && (
                                <span className="mt-1 fontXS-Custom text-danger">
                                  {
                                    errors.subCategories?.[subIndex]
                                      ?.categories?.[subsubIndex]?.name.message
                                  }{" "}
                                  <span className="fw-semibold">*</span>
                                </span>
                              )}
                            </div>
                          )
                        )}

                        {/* BTN AÑADIR CATEGORIA TERCIARIA */}
                        <div className="col-12  mb-2">
                          <button
                            onClick={() => handleAddTerciaryCategorie(subIndex)}
                            type="button"
                            className="btnAddColor btn btn-outline-primary w-100 btn-sm fontSM-Custom"
                            onMouseEnter={() => {
                              document
                                .getElementById(sub.id)
                                .classList.add("hovered");
                            }}
                            onMouseLeave={() => {
                              document
                                .getElementById(sub.id)
                                .classList.remove("hovered");
                            }}
                          >
                            Añadir Categoria Terciaria
                          </button>
                          {/* <button type="button" className="btn btn-primary w-100 btn-sm fontSM-Custom">Añadir color</button> */}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* BTN AÑADIR CATEGORIA SECUNDARIA */}
                  <div className="row col-12 mx-auto mb-2">
                    <div
                      className="col-6 mx-auto"
                      onClick={handleAddSubCategorie}
                    >
                      <button
                        type="button"
                        className="btn btn-outline-primary w-100 btn-sm fontSM-Custom"
                        onClick={() => handleAddColor(sizeIndex)}
                      >
                        Añadir Categoria Secundaria
                      </button>
                      {/* <button type="button" className="btn btn-primary w-100 btn-sm fontSM-Custom">Añadir talle</button> */}
                    </div>
                  </div>

                  {/* BTN CREAR CATEGORIA */}
                  <div className="row">
                    <div className="row col-12 p-0 py-2 mx-auto">
                      <button
                        type="submit"
                        className="btn btn-primary w-100 btn-sm fontSM-Custom"
                      >
                        CREAR CATEGORIA
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
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
