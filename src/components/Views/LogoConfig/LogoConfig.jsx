import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useStoreContext from "../../../provider/storeProvider";
import "./logoConfig.css";

export default function LogoConfig() {
  const { configStore } = useStoreContext();
  const [loading, setLoading] = useState(true);
  const [borderStyle, setBorderStyle] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null); // Almacena la URL de vista previa
  const [logoSizeKb, setLogoSizeKb] = useState(null); // Almacena el tamaño en KB
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    getValues,
    control,
    setValue,
    trigger,
  } = useForm();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Observa el archivo seleccionado
  let logoFile = watch("storeLogo");
  console.log("logoFile", logoFile);
  console.log("logoPreview", logoPreview);
  console.log("logoSizeKb", logoSizeKb);

  useEffect(() => {
    if (logoFile && logoFile[0]) {
      const file = logoFile[0];
      setLogoPreview(URL.createObjectURL(file)); // Actualiza la URL de vista previa
      setLogoSizeKb(parseInt(file.size / 1024)); // Actualiza el tamaño en KB
    } else {
      setLogoPreview(null); // Resetea si no hay archivo
      setLogoSizeKb(null);
    }
  }, [logoFile]); // Se ejecuta cada vez que cambia logoFile

  // Liberar las urls creadas con URL.createObjectURL para evitar fugas de memoria
  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);
  // // Genera la URL de vista previa si hay un archivo seleccionado
  // const logoPreview =
  //   logoFile && logoFile[0] ? URL.createObjectURL(logoFile[0]) : null;

  // // Genera el peso en KB del logo seleccionado
  // const logoSizeKb =
  //   logoFile && logoFile[0] ? parseInt(logoFile[0].size / 1024) : null;

  const onSubmit = async (data) => {
    console.log("logosssss", data);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  // const handleDrop = (event) => {
  //   event.preventDefault();
  //   setDragging(false);
  //   const droppedFile = event.dataTransfer.files[0];
  //   setValue("storeLogo", droppedFile);
  //   console.log("Archivo arrastrado:", droppedFile);
  // };
  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      // Crea un objeto FileList similar al que usa un input file
      const fileList = [droppedFile];
      // Usa setValue para actualizar el campo en React Hook Form
      setValue("storeLogo", fileList, { shouldValidate: true });
      trigger("storeLogo"); // Valida explícitamente el campo
    }
    console.log("Archivo arrastrado:", droppedFile);
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
            Aquí podrás cambiar el logo de tu tienda, los formatos admitidos
            son: <strong>&quot;.svg&quot;</strong>{" "}
            <strong>&quot;.png&quot;</strong> <strong>&quot;.jpg&quot;</strong>{" "}
            <strong>&quot;.webp&quot;</strong> y el tamaño máxmio admitido es de{" "}
            <strong>&quot;200KB&quot;</strong>.
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
                    className={
                      borderStyle
                        ? "bg-white border px-4 py-4 rounded-2"
                        : "bg-white border px-4 py-4 rounded-0"
                    }
                  >
                    <div className="row mb-3 gap-3">
                      <h5 className="col-12 text-center fw-semibold textGray700-Custom m-0">
                        LOGO
                      </h5>
                      <p className="textGray500-Custom fontSM-Custom m-0">
                        Legacy tip: Un logo en un eCommerce es clave para la
                        identidad de marca, genera confianza, refuerza el
                        reconocimiento visual y mejora la conexión emocional con
                        los clientes.
                      </p>
                      {/* LOGO */}
                      <div
                        className={
                          borderStyle
                            ? "row rounded-2 border col-12 p-0 py-2 mx-auto"
                            : "row rounded-0 border col-12 p-0 py-2 mx-auto"
                        }
                      >
                        <div className="d-flex flex-column">
                          <label
                            htmlFor="logoIcon"
                            className="d-flex mb-1 fw-semibold textGray700-Custom"
                          >
                            Subir archivo
                          </label>
                          <span className="text-secondary mb-2 fontSM-Custom">
                            Hacer click o arrastrar archivo
                          </span>

                          <div className="mb-2">
                            <div
                              // role="button"
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={handleDrop}
                              className={
                                borderStyle
                                  ? `d-flex flex-column justify-content-center align-items-center mb-3 rounded-2 custom-dropzone ${
                                      dragging ? "dragging" : ""
                                    }`
                                  : `d-flex flex-column justify-content-center align-items-center mb-3 rounded-0 custom-dropzone ${
                                      dragging ? "dragging" : ""
                                    }`
                              }
                              onClick={() =>
                                document.getElementById("file-input").click()
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                // width="24"
                                // height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="p-2 textGray700-Custom"
                                style={{
                                  width: "80px",
                                }}
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                                <path d="M7 9l5 -5l5 5" />
                                <path d="M12 4l0 12" />
                              </svg>
                              {logoPreview ? (
                                <span className="textGray300-Custom fw-semibold fontSM-Custom ">
                                  Tamaño: {logoSizeKb} KB
                                </span>
                              ) : (
                                <span className="textGray300-Custom fw-semibold fontSM-Custom ">
                                  Ningun archivo seleccionado
                                </span>
                              )}
                            </div>
                            <div className="d-flex justify-content-between">
                              <span className="fw-semibold  textGray500-Custom fontSM-Custom">
                                Formatos admitidos: WEBP, PNG, SVG
                              </span>
                              <span className="fw-semibold textGray500-Custom fontSM-Custom">
                                Tamaño máximo: 200KB
                              </span>
                            </div>
                          </div>
                          <input
                            type="file"
                            accept=".svg, .png, .webp"
                            className="form-control form-control-sm d-none"
                            id="file-input"
                            {...register("storeLogo", {
                              required: {
                                value: true,
                                message: "Debes cargar tu logo",
                              },
                              validate: {
                                isValidSize: (fileList) =>
                                  fileList &&
                                  fileList[0] &&
                                  fileList[0].size <= 200 * 1024
                                    ? true
                                    : "El archivo debe pesar menos de 200KB",
                                isValidType: (fileList) =>
                                  fileList &&
                                  fileList[0] &&
                                  [
                                    "image/svg+xml",
                                    "image/png",
                                    "image/webp",
                                  ].includes(fileList[0].type)
                                    ? true
                                    : "El archivo debe ser .svg, .png o .webp",
                              },
                            })}
                            // onChange={handleLogoChange}
                          />
                          {errors.storeLogo && (
                            <span className="mt-1 fontXS-Custom text-danger">
                              {errors.storeLogo.message}{" "}
                              <span className="fw-semibold">*</span>
                            </span>
                          )}

                          {/* BTN */}
                          <div className="row">
                            <div className="d-flex justify-content-start gap-2 py-2 mx-auto">
                              <button
                                type="reset"
                                className={
                                  borderStyle
                                    ? "btn btn-light rounded-2 border w-50 fontSM-Custom fw-semibold"
                                    : "btn btn-light rounded-0 border w-50 fontSM-Custom fw-semibold"
                                }
                                onClick={() => {
                                  reset({ storeLogo: null });
                                  setLogoPreview(null);
                                  setLogoSizeKb(null);
                                }}
                              >
                                Cancelar
                              </button>
                              <button
                                type="submit"
                                className={
                                  borderStyle
                                    ? "btnLegacyFormLogo w-50 rounded-2 fontSM-Custom fw-semibold"
                                    : "btnLegacyFormLogo w-50 rounded-0 fontSM-Custom fw-semibold"
                                }
                              >
                                Guardar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* BTN */}
                    </div>
                  </form>
                </div>
                <div className="col-12 col-md-5">
                  <div>
                    <h5 className="text-center fw-semibold textGray500-Custom fontSM-Custom">
                      Logo actual
                    </h5>
                    <div className="text-center">
                      <img
                        style={{
                          width: "200px",
                        }}
                        src={configStore.logoConfig.logoUrl}
                        alt="logo company"
                      />
                    </div>
                  </div>
                  {logoPreview ? (
                    <div>
                      <h5 className="text-center fw-semibold textGray500-Custom fontSM-Custom">
                        Logo nuevo
                      </h5>
                      <div className="text-center">
                        <img
                          style={{
                            width: "200px",
                          }}
                          src={logoPreview}
                          alt="logo company"
                        />
                      </div>
                    </div>
                  ) : null}
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
