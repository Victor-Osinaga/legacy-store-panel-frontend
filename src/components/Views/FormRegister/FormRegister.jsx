import "./formRegister.css";
import legacyLogo from "/public/logolegacy.svg";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useStoreContext from "../../../provider/storeProvider";
import registerClient from "../../../services/auth/registerClient.js";
import {
  validatePassword,
  validateEmail,
  validateProyectName,
  validateName,
  validateLastname,
  validateSubdomain,
} from "../../../validators/validators.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function FormRegister() {
  const navigate = useNavigate();
  const {
    toastLoading,
    toastSuccess,
    toastError,
    dismissToast,
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
    proyectName: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/productos");
    }
  }, [isAuthenticated]);

  const onSubmit = async (data) => {
    console.log("data desde register", data);
    const toastId = toastLoading("Verificando...");
    try {
      const response = await registerClient(data);
      console.log("desde componente register", response);
      console.log("desde componente", response);
      toastSuccess(
        <>
          !Proyecto creado <strong>{response.proyectName}</strong>!
        </>,
        toastId
      );
      setTimeout(() => {
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
      <section id="login" className="py-4">
        <div className="div1"></div>
        <div className="div2"></div>
        {/* <div className="div3"></div> */}
        <div className="main rounded d-flex">
          <div className="main_left flex-column justify-content-center align-items-center text-white">
            <h3 className="font-monospace">LEGACY STORE</h3>
            <img
              src={legacyLogo}
              className="logo-login img-fluid rounded"
              alt="legacy company logo"
            />
          </div>

          <div className="main_right col-12 col-md-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="formLogin px-5 py-3 d-flex flex-column justify-content-center align-items-center"
            >
              <h3
                className="glitchLogin text-center fw-semibold"
                data-text="Crear cuenta"
              >
                Crear cuenta
              </h3>

              {/* EMAIL */}
              <div className="form-group w-100 d-flex flex-column mb-3">
                <label className="mb-1 " htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="nombreUsuario"
                  placeholder="john_doe@email.com"
                  className="rounded-0 form-control fontSM-Custom custom-placeholder inputStyles"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "El 'email' es requerido",
                    },
                    validate: validateEmail,
                  })}
                />
                {errors.email && (
                  <span className="mt-1 fontXS-Custom text-danger">
                    {errors.email.message}{" "}
                    <span className="fw-semibold">*</span>
                  </span>
                )}
              </div>

              {/* PASSWORD */}
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
                    validate: validatePassword,
                  })}
                />
                {errors.password && (
                  <span className="mt-1 fontXS-Custom text-danger">
                    {errors.password.message}{" "}
                    <span className="fw-semibold">*</span>
                  </span>
                )}
              </div>

              <div className="container-fluid p-0">
                <div className="row ">
                  {/* NAME */}
                  <div className="form-group d-flex flex-column mb-3 col-6">
                    <label className="mb-1" htmlFor="name">
                      Nombre
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Jhon"
                      className="rounded-0 form-control fontSM-Custom custom-placeholder inputStyles"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "El 'name' es requerido",
                        },
                        validate: validateName,
                      })}
                    />
                    {errors.name && (
                      <span className="mt-1 fontXS-Custom text-danger">
                        {errors.name.message}{" "}
                        <span className="fw-semibold">*</span>
                      </span>
                    )}
                  </div>

                  {/* APELLIDO */}
                  <div className="form-group d-flex flex-column mb-3 col-6">
                    <label className="mb-1" htmlFor="lastname">
                      Apellido
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      name="lastname"
                      placeholder="Doe"
                      className="rounded-0 form-control fontSM-Custom custom-placeholder inputStyles"
                      {...register("lastname", {
                        required: {
                          value: true,
                          message: "El 'lastname' es requerido",
                        },
                        validate: validateLastname,
                      })}
                    />
                    {errors.lastname && (
                      <span className="mt-1 fontXS-Custom text-danger">
                        {errors.lastname.message}{" "}
                        <span className="fw-semibold">*</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* PROYECTNAME */}
              <div className="form-group w-100 d-flex flex-column mb-3">
                <label className="mb-1" htmlFor="proyectName">
                  Nombre del proyecto
                </label>
                <input
                  id="proyectName"
                  type="text"
                  name="proyectName"
                  placeholder="mitienda"
                  className="rounded-0 form-control fontSM-Custom custom-placeholder inputStyles"
                  {...register("proyectName", {
                    required: {
                      value: true,
                      message: "El 'proyectName' es requerido",
                    },
                    validate: validateProyectName,
                  })}
                />
                {errors.proyectName && (
                  <span className="mt-1 fontXS-Custom text-danger">
                    {errors.proyectName.message}{" "}
                    <span className="fw-semibold">*</span>
                  </span>
                )}
              </div>

              {/* SUBDOMAIN */}
              <div className="form-group w-100 d-flex flex-column mb-3">
                <label className="mb-1" htmlFor="subdomain">
                  Subdominio
                </label>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <input
                    id="subdomain"
                    type="text"
                    name="subdomain"
                    placeholder="mitienda"
                    className="rounded-0 form-control fontSM-Custom custom-placeholder inputStyles"
                    {...register("subdomain", {
                      required: {
                        value: true,
                        message: "El 'subdomain' es requerido",
                      },
                      validate: validateSubdomain,
                    })}
                  />
                  <span className="fw-bold fontSM-Custom">
                    .legacystore.vercel.app
                  </span>
                </div>
                {errors.subdomain && (
                  <span className="mt-1 fontXS-Custom text-danger">
                    {errors.subdomain.message}{" "}
                    <span className="fw-semibold">*</span>
                  </span>
                )}
              </div>

              <button
                className="btnLogin rounded-0 mb-2 text-white"
                type="submit"
                value="Submit"
              >
                <b>REGISTRARME</b>
              </button>

              <Link
                to={"/auth/login"}
                className="linkNotAccount fontSM-Custom text-decoration-underline"
              >
                <p className="m-0 text-center">¿Ya tienes una cuenta?</p>
                <p className="m-0 text-center font-monospace">INICIAR SESION</p>
              </Link>
              {/* <button type="submit" className="btn btn-primary w-100 btn-sm fontSM-Custom">INICIAR</button> */}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
