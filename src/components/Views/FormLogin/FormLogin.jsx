// para titulos: fw-bold (fw:700) fontXL-Custom (1.25rem = 20px)

import "./formLogin.css";
import legacyLogo from "/logolegacy.svg";
import { Link } from "react-router-dom";
import useStoreContext from "../../../provider/storeProvider.jsx";
import { useForm } from "react-hook-form";
import login from "../../../services/auth/login.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import config from "../../../../config.js";
import SopaDeLetras from "./Soap.jsx";

export default function FormLogin() {
  const navigate = useNavigate();
  const {
    toastLoading,
    toastSuccess,
    toastError,
    dismissToast,
    setUser,
    user,
    setIsAuthenticated,
    isAuthenticated,
  } = useStoreContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    getValues,
    control,
    setValue,
  } = useForm({
    emai: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/productos");
    }
  }, [isAuthenticated]);

  const onSubmit = async (data) => {
    console.log("data desde login", data);
    const toastId = toastLoading("Verificando...");
    try {
      const response = await login(data);
      toastSuccess(
        <>
          ¡Bienvenid@{" "}
          <strong>
            {response.name} {response.lastname}
          </strong>
          ! ¿Cómo has estado?
        </>,
        toastId
      );
      setTimeout(() => {
        console.log("sesion iniciada", response);
        setUser(response);
        setIsAuthenticated(true);
        navigate("/admin/productos");
      }, 3000);
    } catch (error) {
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
      <section id="login">
        <div className="div1"></div>
        <div className="div2"></div>
        {/* <div className="div3"></div> */}
        <div className="main bg-white rounded-0 d-flex">
          <div className="main_left bgGrayMedium flex-column justify-content-center align-items-center text-white">
            <img
              src={legacyLogo}
              className="logo-login img-fluid rounded"
              alt="company logo"
            />
            {user.proyectName ? (
              <h3 className="font-monospace">{user.proyectName}</h3>
            ) : (
              <h3 className="font-monospace">LEGACY STORE</h3>
            )}
          </div>

          <div className="main_right col-12 col-md-7 textWhiteMedium-Custom">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="formLogin px-5 d-flex flex-column justify-content-center align-items-center fontSM-Custom"
            >
              <div className="sub-logo mb-4 text-center">
                <img
                  src={legacyLogo}
                  className="logo-login img-fluid rounded"
                  alt="legacy software logo"
                />
                <p className="font-monospace">LEGACY-STORE</p>
              </div>
              <h3
                className="glitchLogin text-center fw-bold fontXXL-Custom"
                data-text="Iniciar sesion"
              >
                Iniciar sesion
              </h3>
              <p className="textGray300-Custom fontXS-Custom">
                Entrá a tu panel de control para manejar tu tienda como un
                profesional.
              </p>
              <div className="form-group w-100 d-flex flex-column mb-3 fw-semibold">
                <label className="mb-1" htmlFor="nombreUsuario">
                  E-mail
                </label>
                <input
                  id="nombreUsuario"
                  type="email"
                  name="nombreUsuario"
                  placeholder="john_doe@email.com"
                  autoComplete="off"
                  className="rounded-0 form-control custom-placeholder textWhiteMedium-Custom inputStyles fontSM-Custom"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "El 'email' es requerido",
                    },
                  })}
                />
                {errors.email && (
                  <span className="mt-1 fontXS-Custom text-danger">
                    {errors.email.message}{" "}
                    <span className="fw-semibold">*</span>
                  </span>
                )}
              </div>
              <div className="form-group w-100 d-flex flex-column mb-3 fw-semibold">
                <label className="mb-1" htmlFor="password">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Tu contraseña..."
                  className="rounded-0 form-control custom-placeholder textWhiteMedium-Custom inputStyles fontSM-Custom"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "La 'contraseña' es requerida",
                    },
                  })}
                />
                {errors.password && (
                  <span className="mt-1 fontXS-Custom text-danger">
                    {errors.password.message}{" "}
                    <span className="fw-semibold">*</span>
                  </span>
                )}
              </div>
              <button
                className="btnLogin rounded-0 mb-4 text-white"
                type="submit"
                value="Submit"
              >
                <p className="m-0 fw-semibold">INICIAR SESION</p>
              </button>

              <Link
                // to={"/auth/register"}
                to={"/plans"}
              >
                {/* <p className="m-0 text-center">¿No tienes una cuenta?</p>
              <p className="m-0 text-center font-monospace">REGISTRATE</p> */}

                <p className="m-0 text-center textWhiteMedium-Custom">
                  ¿Querés tu propia tienda online?
                </p>
                <p className="m-0 text-center font-monospace linkNotAccount fontBase-Custom fw-bold">
                  {/* Registrate y empezá a vender hoy */}
                  CREAR TIENDA
                </p>
              </Link>
              {/* <button type="submit" className="btn btn-primary w-100 btn-sm">INICIAR</button> */}
            </form>
          </div>
        </div>
      </section>
      {/* <SopaDeLetras
        palabras={[
          "React",
          "Hook",
          "HOLAAAAAAAAAAAAAAAAA",
          "AGUA",
          "TESORO",
          "ROCA",
          "ECTOR",
        ]}
        // relleno={["."]}
        relleno={[
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "w",
          "x",
          "y",
          "z",
        ]}
        styles={{
          // "spacing-x": "10px",
          // "spacing-y": "10px",
          "bg-selected": "#afe",
          // radius: "10%",
        }}
      /> */}
    </>
  );
}
