import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useStoreContext from "../../../provider/storeProvider.jsx";
import {
  validateStoreConfigurationName,
  validateStoreConfigurationPrimaryColor,
} from "../../../validators/validators.js";
import createStoreConfiguration from "../../../services/storeConfiguration/createStoreConfiguration.js";
import getStoreConfig from "../../../services/storeConfiguration/getStoreConfig.js";
import updateStoreConfiguration from "../../../services/storeConfiguration/updateStoreConfiguration.js";
import mplogo from "../../../assets/mp.svg";
import MpSvg from "../../Icons/MpSvg/MpSvg.jsx";

export default function ColorsStoreConfig() {
  const {
    toastLoading,
    toastSuccess,
    toastError,
    dismissToast,
    setConfigStore,
  } = useStoreContext();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      id: "",
      storeConfigName: "",
      colors: {
        primaryColorStore: "",
        secondaryColorStore: "",
        tertiaryColorStore: "",
      },
    },
  });

  const [loading, setLoading] = useState(true);

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
      const config = await getStoreConfig();
      // const currentValues = getValues()

      setTimeout(() => {
        // si const productos esta fuera del try no toma el valor para el condicional de abajo
        setLoading(false);
        reset(config);
        return toastSuccess(`Completo ${config.id}`, id);
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

  const onSubmit = async (data) => {
    console.log("data", data);
    const toastId = toastLoading("Guardando Configuracion");
    try {
      const configStore = await updateStoreConfiguration(getValues("id"), data);
      console.log("configStore", configStore);

      reset(configStore);
      setConfigStore(configStore);
      return toastSuccess(
        <>
          Configuracion actualizada:{" "}
          <strong>'{configStore.storeConfigName}'</strong> - id:{" "}
          <strong>'{configStore.id}'</strong>
        </>,
        toastId
      );
    } catch (error) {
      console.log("error desde componente ", error);

      toastError(
        <div className="text-center">
          <span>{error.msg}</span>
        </div>,
        toastId
      );
    }
  };

  watch();

  return (
    <>
      <section className="containerViewMain">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            <h3 className="fs-4 mainTitle">Configuracion de tu tienda</h3>
          </div>
        </div>

        <div className="text-secondary mb-2 fontSM-Custom">
          <p className="m-0">
            Aqui podrás configurar a tu gusto los colores de tu tienda
          </p>
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
                  {/* storeConfigName */}
                  {/* <div className="row mb-3">
                                        <p className='col-12 mb-2 text-center fw-semibold textGray500-Custom fontSM-Custom'>NOMBRE</p>
                                        <div className='row rounded border col-12 p-0 py-2 mx-auto'>
                                            <div className='d-flex flex-column mb-2'>
                                                <label htmlFor="nombre" className='d-flex mb-1 fw-semibold textGray500-Custom fontSM-Custom'>
                                                    Nombre de la configuracion
                                                </label>
                                                <input type="text" className='form-control fontSM-Custom custom-placeholder' placeholder='Estilos 1' {
                                                    ...register('storeConfigName', {
                                                        required: {
                                                            value: true,
                                                            message: "El 'storeConfigName' es requerido"
                                                        },
                                                        validate: validateStoreConfigurationName
                                                    })
                                                } />
                                                {errors.storeConfigName && <span className='mt-1 fontXS-Custom text-danger'>{errors.storeConfigName.message} <span className='fw-semibold'>*</span></span>}
                                            </div>
                                        </div>
                                    </div> */}

                  <div className="row mb-3 gap-3">
                    <h4 className="col-12 text-center fw-semibold textGray500-Custom fontSM-Custom">
                      COLORES PRINCIPALES
                    </h4>
                    <p className="textGray500-Custom fontSM-Custom">
                      <span className="fw-bold">Tip:</span> El color de texto se
                      ajustará automaticamente a color blanco o negro
                      dependiendo el color de fondo que elijas (mejora la
                      lectura)
                    </p>
                    {/* PRIMARYCOLORSTORE */}
                    <div className="row rounded border col-12 p-0 py-2 mx-auto">
                      <div className="d-flex flex-column">
                        <label
                          htmlFor="colors.primaryColorStore"
                          className="d-flex mb-1 fw-semibold textGray500-Custom fontSM-Custom"
                        >
                          Color primario (botones)
                        </label>

                        <div className="d-flex gap-3 align-items-center">
                          <input
                            type="color"
                            className="form-control h-100 form-control-sm form-control-color"
                            id="colors.primaryColorStore"
                            title="Elige un color"
                            {...register(`colors.primaryColorStore`, {
                              required: {
                                value: true,
                                message: "El 'primaryColorStore' es requerido",
                              },
                              validate: validateStoreConfigurationPrimaryColor,
                            })}
                          />
                          {/* {<span>{watch('primaryColorStore')}</span>} */}
                          <input
                            className="form-control form-control-sm h-100"
                            value={watch("colors.primaryColorStore")}
                            disabled
                          />
                          <div
                            className="btn btn-sm btn-outline-secondary rounded"
                            title="reset"
                            onClick={() => {
                              setValue("colors.primaryColorStore", "#084c61");
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                              <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                            </svg>
                          </div>
                          {/* <input type="text" className="form-control form-control-sm h-100" {
                                                        ...register('primaryColorStore', {
                                                            required: {
                                                                value: true,
                                                                message: "Desde input"
                                                            }
                                                        })
                                                    }/> */}
                        </div>
                        {errors.colors?.primaryColorStore && (
                          <span className="mt-1 fontXS-Custom text-danger">
                            {errors.colors?.primaryColorStore.message}{" "}
                            <span className="fw-semibold">*</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* secondaryColorStore */}
                    <div className="row rounded border col-12 p-0 py-2 mx-auto">
                      <div className="d-flex flex-column">
                        <label
                          htmlFor="colors.secondaryColorStore"
                          className="d-flex mb-1 fw-semibold textGray500-Custom fontSM-Custom"
                        >
                          Color secundario (fondo de tarjeta de producto o
                          cualquier elemento sobresaliente)
                        </label>

                        <div className="d-flex gap-3 align-items-center">
                          <input
                            type="color"
                            className="form-control h-100 form-control-sm form-control-color"
                            id="colors.secondaryColorStore"
                            title="Elige un color"
                            {...register(`colors.secondaryColorStore`, {
                              required: {
                                value: true,
                                message:
                                  "El 'secondaryColorStore' es requerido",
                              },
                              validate: validateStoreConfigurationPrimaryColor,
                            })}
                          />
                          {/* {<span>{watch('secondaryColorStore')}</span>} */}
                          <input
                            className="form-control form-control-sm h-100"
                            value={watch("colors.secondaryColorStore")}
                            disabled
                          />
                          <div
                            className="btn btn-sm btn-outline-secondary rounded"
                            title="reset"
                            onClick={() => {
                              setValue("colors.secondaryColorStore", "#2B2D38");
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                              <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                            </svg>
                          </div>
                          {/* <input type="text" className="form-control form-control-sm h-100" {
                                                        ...register('secondaryColorStore', {
                                                            required: {
                                                                value: true,
                                                                message: "Desde input"
                                                            }
                                                        })
                                                    }/> */}
                        </div>
                        {errors.colors?.secondaryColorStore && (
                          <span className="mt-1 fontXS-Custom text-danger">
                            {errors.colors?.secondaryColorStore.message}{" "}
                            <span className="fw-semibold">*</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* tertiaryColorStore */}
                    <div className="row rounded border col-12 p-0 py-2 mx-auto">
                      <div className="d-flex flex-column">
                        <label
                          htmlFor="colors.tertiaryColorStore"
                          className="d-flex mb-1 fw-semibold textGray500-Custom fontSM-Custom"
                        >
                          Color terciario (fondo)
                        </label>

                        <div className="d-flex gap-3 align-items-center">
                          <input
                            type="color"
                            className="form-control h-100 form-control-sm form-control-color"
                            id="colors.tertiaryColorStore"
                            title="Elige un color"
                            {...register(`colors.tertiaryColorStore`, {
                              required: {
                                value: true,
                                message: "El 'tertiaryColorStore' es requerido",
                              },
                              validate: validateStoreConfigurationPrimaryColor,
                            })}
                          />
                          {/* {<span>{watch('tertiaryColorStore')}</span>} */}
                          <input
                            className="form-control form-control-sm h-100"
                            value={watch("colors.tertiaryColorStore")}
                            disabled
                          />
                          <div
                            className="btn btn-sm btn-outline-secondary rounded"
                            title="reset"
                            onClick={() => {
                              setValue("colors.tertiaryColorStore", "#23252F");
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                              <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                            </svg>
                          </div>
                          {/* <input type="text" className="form-control form-control-sm h-100" {
                                                        ...register('tertiaryColorStore', {
                                                            required: {
                                                                value: true,
                                                                message: "Desde input"
                                                            }
                                                        })
                                                    }/> */}
                        </div>
                        {errors.colors?.tertiaryColorStore && (
                          <span className="mt-1 fontXS-Custom text-danger">
                            {errors.colors?.tertiaryColorStore.message}{" "}
                            <span className="fw-semibold">*</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* secondaryColorStore */}
                  {/* <div className="row mb-3">
                                        <p className='col-12 mb-2 text-center fw-semibold textGray500-Custom fontSM-Custom'>COLORES</p>
                                        <div className='row rounded border col-12 p-0 py-2 mx-auto'>
                                            <div className='d-flex flex-column mb-2'>
                                                <label htmlFor="colors.secondaryColorStore" className='d-flex mb-1 fw-semibold textGray500-Custom fontSM-Custom'>
                                                    Color primario de mi tienda
                                                </label>

                                                <div className="d-flex gap-3 align-items-center">
                                                    <input type="color" className="form-control h-100 form-control-sm form-control-color" id="colors.secondaryColorStore" title="Elige un color" {
                                                        ...register(`colors.secondaryColorStore`, {
                                                            required: {
                                                                value: true,
                                                                message: "El 'secondaryColorStore' es requerido"
                                                            },
                                                            validate: validateStoreConfigurationPrimaryColor
                                                        })
                                                    } />
                                                    <input 
                                                        className="form-control form-control-sm h-100"
                                                    value={watch('colors.secondaryColorStore')} 
                                                    disabled
                                                    />
                                                </div>
                                                {errors.colors?.secondaryColorStore && <span className='mt-1 fontXS-Custom text-danger'>{errors.colors?.secondaryColorStore.message} <span className='fw-semibold'>*</span></span>}
                                            </div>
                                        </div>
                                    </div> */}

                  {/* apiKeyMp */}
                  {/* <div className="row mb-3">
                                        <p className='col-12 mb-2 text-center fw-semibold textGray500-Custom fontSM-Custom '>MERCADO PAGO <MpSvg /></p>
                                        <div className='row rounded border col-12 p-0 py-2 mx-auto'>
                                            <div className='d-flex flex-column mb-2'>
                                                <label htmlFor="nombre" className='d-flex mb-1 fw-semibold textGray500-Custom fontSM-Custom'>
                                                    Api key Mercado Pago
                                                </label>
                                                <input type="text" className='form-control fontSM-Custom custom-placeholder' placeholder="APP_USR-31431324123-532432-bh11ncjasd12-3987563" {
                                                    ...register('apiKeyMp', {
                                                        required: {
                                                            value: true,
                                                            message: "El 'storeConfigName' es requerido"
                                                        },
                                                        validate: validateStoreConfigurationName
                                                    })
                                                } />
                                                {errors.storeConfigName && <span className='mt-1 fontXS-Custom text-danger'>{errors.storeConfigName.message} <span className='fw-semibold'>*</span></span>}
                                            </div>
                                        </div>
                                    </div> */}

                  {/* MENSAJES ROTATITVOS BANNER 1 */}
                  {/* <div className="row mb-3">
                                        <p className='col-12 mb-2 text-center fw-semibold textGray500-Custom fontSM-Custom '>
                                            MENSAJES ROTATITIVOS (BANNER 1)
                                        </p>
                                        <div className='row rounded border col-12 p-0 py-2 mx-auto'>
                                            <div className='d-flex flex-column mb-2'>
                                                <label htmlFor="nombre" className='d-flex mb-1 fw-semibold textGray500-Custom fontSM-Custom'>
                                                    Texto 1
                                                </label>
                                                <input type="text" className='form-control fontSM-Custom custom-placeholder' placeholder="APP_USR-31431324123-532432-bh11ncjasd12-3987563" {
                                                    ...register('dinamicMessages', {
                                                        required: {
                                                            value: true,
                                                            message: "El 'storeConfigName' es requerido"
                                                        },
                                                        validate: validateStoreConfigurationName
                                                    })
                                                } />
                                                {errors.storeConfigName && <span className='mt-1 fontXS-Custom text-danger'>{errors.storeConfigName.message} <span className='fw-semibold'>*</span></span>}
                                            </div>
                                        </div>
                                    </div> */}

                  {/* BTN GUARDAR */}
                  <div className="row">
                    <div className="row col-12 p-0 py-2 mx-auto">
                      <button
                        type="submit"
                        className="btn btn-primary w-100 btn-sm fontSM-Custom"
                      >
                        GUARDAR
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
