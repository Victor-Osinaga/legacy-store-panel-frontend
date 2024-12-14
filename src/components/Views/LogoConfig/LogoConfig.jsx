import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useStoreContext from "../../../provider/storeProvider";

export default function LogoConfig() {
  const { configStore } = useStoreContext();
  const [loading, setLoading] = useState(true);
  // const [logoPreview, setLogoPreview] = useState(false);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    getValues,
    control,
    setValue,
  } = useForm();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Observa el archivo seleccionado
  const logoFile = watch("storeLogo");

  // Genera la URL de vista previa si hay un archivo seleccionado
  const logoPreview =
    logoFile && logoFile[0] ? URL.createObjectURL(logoFile[0]) : null;

  const onSubmit = async (data) => {
    console.log("logosssss", data);
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
            <strong>&quot;.webp&quot;</strong> y hasta{" "}
            <strong>&quot;200KB&quot;</strong> de tamaño.
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
                        LOGO
                      </h4>
                      <p className="textGray-Custom fontSM-Custom m-0">
                        Legacy tip: se recomienda los formatos .webp .png .svg
                        ya que admiten imagenes con fondo transparente
                      </p>
                      {/* LOGO */}
                      <div className="row rounded border col-12 p-0 py-2 mx-auto">
                        <div className="d-flex flex-column">
                          <label
                            htmlFor="logoIcon"
                            className="d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom"
                          >
                            Tu logo
                          </label>

                          {logoPreview && (
                            <div className="d-flex justify-content-center align-items-center flex-column py-3 gap-3">
                              <h5 className="text-center fw-semibold textGray-Custom fontSM-Custom">
                                Previsualización
                              </h5>
                              <img
                                src={logoPreview}
                                width={200}
                                alt="Vista previa del logo"
                              />
                            </div>
                          )}
                          <input
                            type="file"
                            accept=".svg, .png, .jpg, .webp"
                            className="form-control form-control-sm"
                            id="image"
                            {...register("storeLogo", {
                              required: {
                                value: true,
                                message: "Debes cargar tu logo",
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
                        </div>
                      </div>

                      {/* BTN */}
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
                    </div>
                  </form>
                </div>
                <div className="col-12 col-md-5">
                  <h5 className="text-center fw-semibold textGray-Custom fontSM-Custom">
                    Logo actual
                  </h5>
                  <div className="text-center">
                    <img
                      src={configStore.logoConfig.logoUrl}
                      alt="logo company"
                    />
                  </div>
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
