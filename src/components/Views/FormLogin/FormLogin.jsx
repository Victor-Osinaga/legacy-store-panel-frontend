import "./formLogin.css";
import legacyLogo from "/logolegacy.svg";
import { Link } from "react-router-dom";
import useStoreContext from "../../../provider/storeProvider.jsx";
import { useForm } from "react-hook-form";
import login from "../../../services/auth/login.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import config from "../../../../config.js";
import redirectSubdomain from "../../../utils/redirectSubdomain.js";

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
        // redirectSubdomain(response.subdomain)
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
    <section id="login">
      <div className="div1"></div>
      <div className="div2"></div>
      {/* <div className="div3"></div> */}
      <div className="main bg-white rounded-0 d-flex">
        <div className="main_left flex-column justify-content-center align-items-center text-white">
          {user.proyectName ? (
            <h3 className="font-monospace">{user.proyectName}</h3>
          ) : (
            <h3 className="font-monospace">LEGACY STORE</h3>
          )}
          <img
            src={legacyLogo}
            className="logo-login img-fluid rounded"
            alt="company logo"
          />
        </div>

        <div className="main_right col-12 col-md-7">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="formLogin px-5 d-flex flex-column justify-content-center align-items-center"
          >
            <h3
              className="glitchLogin text-center fw-semibold"
              data-text="Iniciar sesion"
            >
              Iniciar sesion
            </h3>
            <div className="form-group w-100 d-flex flex-column mb-3">
              <label className="mb-1" htmlFor="nombreUsuario">
                Correo
              </label>
              <input
                id="nombreUsuario"
                type="email"
                name="nombreUsuario"
                placeholder="john_doe@email.com"
                className="rounded-0 form-control fontSM-Custom custom-placeholder inputStyles"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El 'email' es requerido",
                  },
                })}
              />
              {errors.email && (
                <span className="mt-1 fontXS-Custom text-danger">
                  {errors.email.message} <span className="fw-semibold">*</span>
                </span>
              )}
            </div>
            <div className="form-group w-100 d-flex flex-column mb-3">
              <label className="mb-1" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Tu contraseña..."
                className="rounded-0 form-control fontSM-Custom custom-placeholder inputStyles"
                {...register("password", {
                  required: {
                    value: true,
                    message: "El 'password' es requerido",
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
              className="btnLogin rounded-0 mb-2 text-white"
              type="submit"
              value="Submit"
            >
              <p className="m-0 fw-semibold">INICIAR SESION</p>
            </button>

            <Link
              to={"/auth/register"}
              className="linkNotAccount fontSM-Custom text-decoration-underline"
            >
              <p className="m-0 text-center">¿No tienes una cuenta?</p>
              <p className="m-0 text-center font-monospace">REGISTRATE</p>
            </Link>
            {/* <button type="submit" className="btn btn-primary w-100 btn-sm fontSM-Custom">INICIAR</button> */}
          </form>
        </div>
      </div>
    </section>
  );
}
