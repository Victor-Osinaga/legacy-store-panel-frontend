import "./header.css";
import { Link } from "react-router-dom";
// import viteLogo from '../../assets/logo-jarry.png'
import legacyLogo from "../../assets/logolegacy.svg";
import { useEffect, useState } from "react";
import avatar from "../../assets/avatar.jpg";
import useStoreContext from "../../provider/storeProvider";
import DeleteIcon from "../Icons/DeleteIcon/DeleteIcon";
import logoutClient from "../../services/auth/logoutClient.js";
import config from "../../../config.js";
import getTextColor from "../../utils/getTextColor.js";

export default function Header() {
  const {
    configStore,
    loadingConfigStore,
    user,
    toastLoading,
    toastSuccess,
    toastError,
    dismissToast,
    setUser,
    setIsAuthenticated,
  } = useStoreContext();
  // Cuando renderizas un componente en React, la lógica en tiempo de renderización se evalúa solo en el momento de la renderización inicial. Si el tamaño de la ventana cambia después de que el componente ya se haya renderizado, el contenido no se actualizará automáticamente.
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    // console.log("cambiando SIZE");
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    console.log("configStore desde componente", configStore);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [loadingConfigStore]);

  function handleScrollable() {
    const scrollable = document.getElementById("menu-container");
    scrollable.classList.toggle("navigationVisible");

    const burguer = document.getElementById("header-burguer");
    burguer.classList.toggle("shadow");
  }

  function handleClick(id) {
    const listAcciones = document.getElementById(id);
    listAcciones.classList.toggle("mostrar");
  }

  const logoutClientAuth = async () => {
    console.log("cerr");
    const toastId = toastLoading("Cerrando sesion");
    try {
      const result = await logoutClient();
      toastSuccess("Sesion finalizada", toastId);
      setTimeout(() => {
        setIsAuthenticated(false);
        setUser({});
      }, 2000);
    } catch (error) {
      toastError(
        <div className="text-center">
          <p className="mb-0">
            <strong>Error al añadir un talle/tamaño</strong>
          </p>
        </div>,
        toastId
      );
    }
  };
  return (
    <>
      {loadingConfigStore ? (
        <div id="header" className="d-flex">
          <nav className="container-fluid px-5 d-flex justify-content-center align-items-center">
            <section className="spinnerContainer">
              <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </section>
          </nav>
        </div>
      ) : (
        <header
          id="header"
          className="d-flex fontSM-Custom"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff, ${configStore.colors.primaryColorStore}) `,
          }}
        >
          <nav className="container-fluid px-2 px-md-5">
            <ul className="d-flex align-items-center justify-content-between h-100">
              <li className="navLogo">
                {/* {console.log(windowWidth)} */}
                {windowWidth < 1000 ? (
                  <>
                    <div
                      id="header-burguer"
                      className="header-burguer rounded"
                      onClick={handleScrollable}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray svgSize"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                      </svg>
                    </div>
                    <div className="h-100 d-flex flex-column align-items-center justify-content-center ms-2">
                      <img
                        className="h-100 header-logo"
                        src={legacyLogo}
                        alt="legacy software logo"
                        title="Legacy Software"
                      />
                      <span className="title_company">LEGACY</span>
                    </div>
                  </>
                ) : (
                  <div className="h-100 d-flex flex-column align-items-center justify-content-center">
                    <img
                      className="h-100 header-logo"
                      src={legacyLogo}
                      alt="legacy software logo"
                      title="Legacy Software"
                    />
                    <span className="title_company">LEGACY</span>
                  </div>
                )}
              </li>
              <li className="navUtils d-flex align-items-center justify-content-end">
                <div className="d-none d-md-flex position-relative h-100 ">
                  <div
                    onClick={() => handleClick("asd1")}
                    // className="containerPlusIcon rounded btnMoreActionsMain position-relative border border-0 bg-white"
                    className="containerPlusIcon text-white rounded position-relative d-flex justify-content-center align-items-center"
                    data-primary-color={getTextColor(
                      configStore.colors.primaryColorStore
                    )}
                  >
                    {/* <svg
                      className="svgSize text-gray"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg> */}
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
                      className="svgSize"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 5l0 14" />
                      <path d="M5 12l14 0" />
                    </svg>
                  </div>

                  {/* LLEVAR A UN COMPONENTE APARTE */}
                  <ul id="asd1" className="submenuPruebaMain shadow-lg ">
                    <li className="btnsMoreActionsContainerMain">
                      <Link
                        to={`/admin/productos/crear`}
                        onClick={() => handleClick("asd1")}
                      >
                        <button className="btnActionMain fontSM-Custom textGray700-Custom">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="text-gray svgSize"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            ></path>
                          </svg>
                          Nuevo Producto
                        </button>
                      </Link>
                      <Link
                        to={`/admin/categorias/crear`}
                        onClick={() => handleClick("asd1")}
                      >
                        <button className="btnActionMain fontSM-Custom textGray700-Custom">
                          <svg
                            className="text-gray svgSize"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <g
                              fill="none"
                              fillRule="evenodd"
                              stroke="#200E32"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              transform="translate(2 2)"
                            >
                              <path d="M14.2855094 9.76996262e-15L17.5521036 9.76996262e-15C18.9036211 9.76996262e-15 20 1.10589743 20 2.47018211L20 5.76410278C20 7.12735391 18.9036211 8.23428489 17.5521036 8.23428489L14.2855094 8.23428489C12.9329672 8.23428489 11.8365883 7.12735391 11.8365883 5.76410278L11.8365883 2.47018211C11.8365883 1.10589743 12.9329672 9.76996262e-15 14.2855094 9.76996262e-15zM2.44892104 9.76996262e-15L5.71449064 9.76996262e-15C7.06703281 9.76996262e-15 8.16341169 1.10589743 8.16341169 2.47018211L8.16341169 5.76410278C8.16341169 7.12735391 7.06703281 8.23428489 5.71449064 8.23428489L2.44892104 8.23428489C1.09637888 8.23428489 3.55271368e-15 7.12735391 3.55271368e-15 5.76410278L3.55271368e-15 2.47018211C3.55271368e-15 1.10589743 1.09637888 9.76996262e-15 2.44892104 9.76996262e-15zM2.44892104 11.7657151L5.71449064 11.7657151C7.06703281 11.7657151 8.16341169 12.8716125 8.16341169 14.2369308L8.16341169 17.5298179C8.16341169 18.8941026 7.06703281 20 5.71449064 20L2.44892104 20C1.09637888 20 3.55271368e-15 18.8941026 3.55271368e-15 17.5298179L3.55271368e-15 14.2369308C3.55271368e-15 12.8716125 1.09637888 11.7657151 2.44892104 11.7657151zM14.2855094 11.7657151L17.5521036 11.7657151C18.9036211 11.7657151 20 12.8716125 20 14.2369308L20 17.5298179C20 18.8941026 18.9036211 20 17.5521036 20L14.2855094 20C12.9329672 20 11.8365883 18.8941026 11.8365883 17.5298179L11.8365883 14.2369308C11.8365883 12.8716125 12.9329672 11.7657151 14.2855094 11.7657151z"></path>
                            </g>
                          </svg>
                          Nueva Categoria
                        </button>
                      </Link>
                      {/* <Link to={`/admin/clientes/crear`}>
                                                    <button className="btnActionMain fontSM-Custom textGray700-Custom">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="textGray500-Custom svgSize">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                        </svg>
                                                        Nuevo Cliente
                                                    </button>
                                                </Link> */}
                    </li>
                  </ul>
                </div>

                {/* <div className='d-none d-md-flex align-items-center h-100 bg-white px-2 rounded'>
                                        <svg className='svgSize text-gray' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                        <input className='inputSearch rounded ml-2' placeholder='Buscar...' type="text" name="search" id="" />
                                    </div> */}
                <div
                  data-primary-color={getTextColor(
                    configStore.colors.primaryColorStore
                  )}
                  className="d-none d-md-flex align-items-center justify-content-center rounded fw-bold h-100 text-white pe-3 ps-3"
                >
                  <span>{user.proyectName}</span>
                </div>
                <div
                  className="d-flex gap-1 align-items-center justify-content-center rounded fw-bold h-100 text-white"
                  data-primary-color={getTextColor(
                    configStore.colors.primaryColorStore
                  )}
                >
                  {/* <span>Mi tienda</span> */}
                  {config.env == "dev" ? (
                    <>
                      <Link
                        className="text-white pe-3 ps-3"
                        target="blank"
                        to={`http://${user.subdomain}-legacystore.localhost:5174/`}
                      >
                        <svg
                          className="svgSize text-gray"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M3 21l18 0" />
                          <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
                          <path d="M5 21l0 -10.15" />
                          <path d="M19 21l0 -10.15" />
                          <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
                        </svg>
                        <span className="ms-1">Mi tienda</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        className="text-white pe-3 ps-3"
                        target="blank"
                        to={`https://${user.subdomain}-legacystore.vercel.app`}
                      >
                        <svg
                          className="svgSize text-gray"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M3 21l18 0" />
                          <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
                          <path d="M5 21l0 -10.15" />
                          <path d="M19 21l0 -10.15" />
                          <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
                        </svg>
                        <span className="ms-1">Mi tienda</span>
                      </Link>
                    </>
                  )}
                </div>
                {/* <div className=''>
                            <img className='navImageUser rounded' src={avatar} alt="Avatar perfil" />
                        </div> */}

                {/* PROFILE SETTINGS */}
                <div className="d-flex position-relative h-100">
                  {/* <img
                    onClick={() => handleClick("profileSettings")}
                    className=" rounded"
                    src={avatar}
                    alt="Avatar"
                  /> */}
                  <div
                    className="avatar-user d-flex rounded text-white justify-content-center align-items-center"
                    onClick={() => handleClick("profileSettings")}
                    data-primary-color={getTextColor(
                      configStore.colors.primaryColorStore
                    )}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="svgSize"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                  </div>

                  {/* LLEVAR A UN COMPONENTE APARTE */}
                  <ul
                    id="profileSettings"
                    className="submenuPruebaMain shadow-lg"
                  >
                    <li className="btnsMoreActionsContainerMain">
                      {config.env == "dev" ? (
                        <>
                          <Link
                            to={`http://${user.subdomain}-legacystore.localhost:5174/`}
                            target="blank"
                          >
                            <button className="btnActionMain fontSM-Custom textGray700-Custom">
                              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray svgSize">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                                                        </svg> */}
                              <svg
                                className="svgSize text-gray"
                                xmlns="http://www.w3.org/2000/svg"
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
                                <path d="M3 21l18 0" />
                                <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
                                <path d="M5 21l0 -10.15" />
                                <path d="M19 21l0 -10.15" />
                                <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
                              </svg>
                              Mi tienda
                            </button>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to={`https://${user.subdomain}-legacystore.vercel.app`}
                            target="blank"
                          >
                            <button className="btnActionMain fontSM-Custom textGray700-Custom">
                              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray svgSize">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                                                        </svg> */}
                              <svg
                                className="svgSize text-gray"
                                xmlns="http://www.w3.org/2000/svg"
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
                                <path d="M3 21l18 0" />
                                <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
                                <path d="M5 21l0 -10.15" />
                                <path d="M19 21l0 -10.15" />
                                <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
                              </svg>
                              Mi tienda
                            </button>
                          </Link>
                        </>
                      )}
                      <div onClick={logoutClientAuth}>
                        <button className="btnActionMain bg-danger text-white fontSM-Custom">
                          <DeleteIcon classList="text-white svgSize" />
                          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white svgSize">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                            </svg> */}
                          Cerrar sesion
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        </header>
      )}
    </>
  );
}
