import { useEffect, useState } from "react";
import useStoreContext from "../../../provider/storeProvider";
import { useForm } from "react-hook-form";
import updateStoreConfiguration from "../../../services/storeConfiguration/updateStoreConfiguration.js";

export default function FooterConfig() {
  const [loading, setLoading] = useState(true);
  const {
    toastLoading,
    toastSuccess,
    toastError,
    configStore,
    loadingConfigStore,
    setConfigStore,
  } = useStoreContext();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      colors: {
        primaryColorFooter: "",
      },
      social: {
        facebook: "",
        instagram: "",
        gmail: "",
        storeAddress: "",
        whatsapp: "",
      },
    },
  });

  useEffect(() => {
    console.log("CONFIG STOREEEEEEEEEEEE:", configStore);
    setTimeout(() => {
      setLoading(false);
      reset(configStore.footerConfig);
    }, 500);
  }, []);

  const onSubmit = async (data) => {
    console.log("data footerConfig", data);
    const toastId = toastLoading("Actualizando");

    try {
      const { footerConfig, ...rest } = configStore;
      const newObj = {
        ...rest,
        footerConfig: data,
      };
      console.log("newObj", newObj);
      const updated = await updateStoreConfiguration(configStore.id, newObj);
      console.log("updated", updated);
      reset(updated.footerConfig);
      setConfigStore(updated);
      return toastSuccess(
        <>
          Footer actualizado: <strong>'{updated.storeConfigName}'</strong> - id:{" "}
          <strong>'{updated.id}'</strong>
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
          <>
            <div className="container-fluid p-0">
              <div className="row justify-content-between p-2 p-md-0 m-0">
                <div className="col-12 col-md-7 p-0 pe-md-3 mb-3 mb-md-0">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white border px-4 py-4 rounded"
                  >
                    <div className="row mb-3 gap-3">
                      <h4 className="col-12 text-center fw-semibold textGray-Custom fontSM-Custom m-0">
                        COLOR PRIMARIO
                      </h4>
                      <p className="textGray-Custom fontSM-Custom m-0">
                        Tip: el color primario es el color de fondo de tu pie de
                        página
                      </p>

                      {/* COLOR PRIMARIO */}
                      <div className="row rounded border col-12 p-0 py-2 mx-auto">
                        <div className="d-flex flex-column">
                          <label
                            htmlFor="colors.primaryColorFooter"
                            className="d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom"
                          >
                            Color primario
                          </label>
                          <div className="d-flex gap-3 align-items-center">
                            <input
                              type="color"
                              className="form-control h-100 form-control-sm form-control-color"
                              id="colors.primaryColorStore"
                              title="Elige un color"
                              {...register(`colors.primaryColorFooter`, {
                                required: {
                                  value: true,
                                  message:
                                    "El 'primaryColorFooter' es requerido",
                                },
                                // validate: validateStoreConfigurationPrimaryColor
                              })}
                            />
                            {/* {<span>{watch('primaryColorFooter')}</span>} */}
                            <input
                              className="form-control form-control-sm h-100"
                              value={watch("colors.primaryColorFooter")}
                              disabled
                            />
                            <div
                              className="btn btn-sm btn-outline-secondary rounded"
                              title="reset"
                              onClick={() => {
                                setValue(
                                  "colors.primaryColorFooter",
                                  "#000000"
                                );
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
                                                        ...register('primaryColorFooter', {
                                                            required: {
                                                                value: true,
                                                                message: "Desde input"
                                                            }
                                                        })
                                                    }/> */}
                          </div>
                          {errors.colors?.primaryColorFooter && (
                            <span className="mt-1 fontXS-Custom text-danger">
                              {errors.colors?.primaryColorFooter.message}{" "}
                              <span className="fw-semibold">*</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <h4 className="col-12 text-center fw-semibold textGray-Custom fontSM-Custom m-0">
                        REDES SOCIALES
                      </h4>
                      <p className="textGray-Custom fontSM-Custom m-0">
                        Tip: tus clientes podran clickear y acceder a tus redes
                        asi que es importante tener configurado esta sección
                      </p>
                      {/* SOCIAL */}
                      <div className="row rounded border col-12 p-0 py-2 mx-auto">
                        <div className="d-flex flex-column mb-2">
                          <label
                            htmlFor="social.facebook"
                            className="d-flex align-items-end mb-1 fw-semibold textGray-Custom fontSM-Custom"
                          >
                            <span>Tu link de facebook</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                            </svg>
                          </label>
                          <div className="d-flex align-items-center">
                            <input
                              id="social.facebook"
                              type="text"
                              className="form-control fontSM-Custom custom-placeholder"
                              {...register(`social.facebook`, {
                                required: {
                                  value: true,
                                  message: "El 'facebook' es requerido",
                                },
                                // validate: validateStoreConfigurationPrimaryColor
                              })}
                            />
                          </div>
                          {errors.social?.facebook && (
                            <span className="mt-1 fontXS-Custom text-danger">
                              {errors.social?.facebook.message}{" "}
                              <span className="fw-semibold">*</span>
                            </span>
                          )}
                        </div>

                        <div className="d-flex flex-column mb-2">
                          <label
                            htmlFor="social.instagram"
                            className="d-flex align-items-end mb-1 fw-semibold textGray-Custom fontSM-Custom"
                          >
                            Tu link de instagram
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                              <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                              <path d="M16.5 7.5l0 .01" />
                            </svg>
                          </label>
                          <div className="d-flex align-items-center">
                            <input
                              id="social.instagram"
                              type="text"
                              className="form-control fontSM-Custom custom-placeholder"
                              {...register(`social.instagram`, {
                                required: {
                                  value: true,
                                  message: "El 'instagram' es requerido",
                                },
                                // validate: validateStoreConfigurationPrimaryColor
                              })}
                            />
                          </div>
                          {errors.social?.instagram && (
                            <span className="mt-1 fontXS-Custom text-danger">
                              {errors.social?.instagram.message}{" "}
                              <span className="fw-semibold">*</span>
                            </span>
                          )}
                        </div>

                        <div className="d-flex flex-column mb-2">
                          <label
                            htmlFor="social.gmail"
                            className="d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom"
                          >
                            Tu mail
                          </label>
                          <div className="d-flex align-items-center">
                            <input
                              id="social.gmail"
                              type="text"
                              className="form-control fontSM-Custom custom-placeholder"
                              {...register(`social.gmail`, {
                                required: {
                                  value: true,
                                  message: "El 'gmail' es requerido",
                                },
                                // validate: validateStoreConfigurationPrimaryColor
                              })}
                            />
                          </div>
                          {errors.social?.gmail && (
                            <span className="mt-1 fontXS-Custom text-danger">
                              {errors.social?.gmail.message}{" "}
                              <span className="fw-semibold">*</span>
                            </span>
                          )}
                        </div>

                        <div className="d-flex flex-column mb-2">
                          <label
                            htmlFor="social.whatsapp"
                            className="d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom"
                          >
                            Tu número de whastapp
                          </label>
                          <div className="d-flex align-items-center">
                            <input
                              id="social.whatsapp"
                              type="text"
                              className="form-control fontSM-Custom custom-placeholder"
                              {...register(`social.whatsapp`, {
                                required: {
                                  value: true,
                                  message: "El 'whatsapp' es requerido",
                                },
                                // validate: validateStoreConfigurationPrimaryColor
                              })}
                            />
                          </div>
                          {errors.social?.whatsapp && (
                            <span className="mt-1 fontXS-Custom text-danger">
                              {errors.social?.whatsapp.message}{" "}
                              <span className="fw-semibold">*</span>
                            </span>
                          )}
                        </div>

                        <div className="d-flex flex-column mb-2">
                          <label
                            htmlFor="social.whatsapp"
                            className="d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom"
                          >
                            La direccion de tu local
                          </label>
                          <div className="d-flex align-items-center">
                            <input
                              id="social.storeAddress"
                              type="text"
                              className="form-control fontSM-Custom custom-placeholder"
                              {...register(`social.storeAddress`, {
                                required: {
                                  value: true,
                                  message: "El 'storeAddress' es requerido",
                                },
                                // validate: validateStoreConfigurationPrimaryColor
                              })}
                            />
                          </div>
                          {errors.social?.storeAddress && (
                            <span className="mt-1 fontXS-Custom text-danger">
                              {errors.social?.storeAddress.message}{" "}
                              <span className="fw-semibold">*</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

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
          </>
        ) : (
          <>
            <section className="spinnerContainer">
              <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </section>
          </>
        )}
      </section>
    </>
  );
}
