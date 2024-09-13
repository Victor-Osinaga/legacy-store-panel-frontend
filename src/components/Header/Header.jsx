import './header.css'
import { Link } from 'react-router-dom';
// import viteLogo from '../../assets/logo-jarry.png'
import viteLogo from '../../assets/logolegacy.svg'
import { useEffect, useState } from 'react';
import avatar from '../../assets/avatar.jpg';
import useStoreContext from '../../provider/storeProvider';
import DeleteIcon from '../Icons/DeleteIcon/DeleteIcon';
import logoutClient from '../../services/auth/logoutClient.js';
import config from '../../../config.js';

export default function Header() {
    const { configStore, loadingConfigStore, user, toastLoading, toastSuccess, toastError, dismissToast, setUser, setIsAuthenticated } = useStoreContext()
    // Cuando renderizas un componente en React, la lógica en tiempo de renderización se evalúa solo en el momento de la renderización inicial. Si el tamaño de la ventana cambia después de que el componente ya se haya renderizado, el contenido no se actualizará automáticamente.
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        // console.log("cambiando SIZE");
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        console.log("configStore desde componente", configStore);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [loadingConfigStore]);

    function handleScrollable() {
        const scrollable = document.getElementById('menu-container')
        scrollable.classList.toggle('navigationVisible')

        const burguer = document.getElementById('header-burguer')
        burguer.classList.toggle('shadow')
    }

    function handleClick(id) {
        const listAcciones = document.getElementById(id)
        listAcciones.classList.toggle('mostrar')
    }

    const logoutClientAuth = async () => {
        console.log("cerr");
        const toastId = toastLoading("Cerrando sesion")
        try {
            const result = await logoutClient()
            toastSuccess("Sesion finalizada", toastId)
            setTimeout(() => {
                setIsAuthenticated(false)
                setUser({})
            }, 2000);
        } catch (error) {
            toastError(
                <div className='text-center'><p className='mb-0'><strong>Error al añadir un talle/tamaño</strong></p></div>,
                toastId
            )
        }
    }
    return (
        <>
            {
                loadingConfigStore ? (
                    <div id='header' className='d-flex'>
                        <nav className="container-fluid px-5 d-flex justify-content-center align-items-center">
                            <section className='spinnerContainer'>
                                <div className="spinner-grow" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </section>
                        </nav>
                    </div >
                ) : (
                    <header id='header' className='d-flex fontSM-Custom' style={{ backgroundImage: `linear-gradient(to right, #ffffff, ${configStore.primaryColorStore}) ` }}>
                        <nav className="container-fluid px-5">
                            <ul className='d-flex align-items-center justify-content-between h-100'>
                                <li className='navLogo'>
                                    {/* {console.log(windowWidth)} */}
                                    {windowWidth < 1000 ? (
                                        <div id='header-burguer' className='header-burguer rounded' onClick={handleScrollable}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray svgSize" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className='h-100 d-flex flex-column align-items-center justify-content-center'>
                                            <img className="h-100 header-logo" src={viteLogo} alt="legacy software logo" title='Legacy Software'/>
                                            <span className='title_company'>LEGACY</span>
                                        </div>
                                    )
                                    }
                                </li>
                                <li className='navUtils d-flex align-items-center justify-content-end'>

                                    <div className="d-none d-md-flex position-relative h-100 ">

                                        <button onClick={() => handleClick('asd1')} className="containerPlusIcon h-100 rounded btnMoreActionsMain position-relative border border-0 bg-white">
                                            <svg className='svgSize text-gray' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>

                                        {/* LLEVAR A UN COMPONENTE APARTE */}
                                        <ul id='asd1' className="submenuPruebaMain shadow-lg ">
                                            <li className="btnsMoreActionsContainerMain">
                                                <Link to={`/#`}>
                                                    <button className="btnActionMain fontSM-Custom textGray700-Custom">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="textGray-Custom svgSize">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                                        </svg>
                                                        Nueva Factura
                                                    </button>
                                                </Link>
                                                <Link to={`/#`}>
                                                    <button className="btnActionMain fontSM-Custom textGray700-Custom">

                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="textGray-Custom svgSize">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                                        </svg>
                                                        Nuevo Presupuesto
                                                    </button>
                                                </Link>
                                                <Link to={`/admin/clientes/crear`}>
                                                    <button className="btnActionMain fontSM-Custom textGray700-Custom">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="textGray-Custom svgSize">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                        </svg>
                                                        Nuevo Cliente
                                                    </button>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className='d-none d-md-flex align-items-center h-100 bg-white px-2 rounded'>
                                        <svg className='svgSize text-gray' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                        <input className='inputSearch rounded ml-2' placeholder='Buscar...' type="text" name="search" id="" />
                                    </div>
                                    <div className='d-none d-md-flex align-items-center justify-content-center rounded santaClaraInc fw-bold h-100 text-white pe-3 ps-3'>
                                        <span>{user.proyectName}</span>
                                    </div>
                                    <div className='d-flex gap-1 align-items-center justify-content-center rounded santaClaraInc fw-bold h-100 text-white pe-3 ps-3'>
                                        {/* <span>Mi tienda</span> */}
                                        {config.env == 'dev' ? (
                                            <>
                                                <svg className='svgSize text-gray' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 21l18 0" /><path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" /><path d="M5 21l0 -10.15" /><path d="M19 21l0 -10.15" /><path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
                                                </svg>
                                                <Link className='text-white' target='blank' to={`http://${user.subdomain}-legacystore.localhost:5174/`}>MI TIENDA</Link>
                                            </>
                                        ) : (
                                            <>
                                                <svg className='svgSize text-gray' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 21l18 0" /><path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" /><path d="M5 21l0 -10.15" /><path d="M19 21l0 -10.15" /><path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
                                                </svg>
                                                <Link className='text-white' target='blank' to={`https://${user.subdomain}-legacystore.vercel.app`}>Mi tienda</Link>
                                            </>
                                        )}
                                    </div>
                                    {/* <div className=''>
                            <img className='navImageUser rounded' src={avatar} alt="Avatar perfil" />
                        </div> */}

                                    {/* PROFILE SETTINGS */}
                                    <div className="d-flex position-relative h-100">
                                        <img onClick={() => handleClick('profileSettings')} className='navImageUser rounded' src={avatar} alt="Avatar perfil" />

                                        {/* LLEVAR A UN COMPONENTE APARTE */}
                                        <ul id='profileSettings' className="submenuPruebaMain shadow-lg">
                                            <li className="btnsMoreActionsContainerMain">
                                                <Link to={`/#`}>
                                                    <button className="btnActionMain fontSM-Custom textGray700-Custom">
                                                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray svgSize">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                                                        </svg> */}
                                                        <svg className='svgSize text-gray' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 21l18 0" /><path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" /><path d="M5 21l0 -10.15" /><path d="M19 21l0 -10.15" /><path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
                                                        </svg>

                                                        Mi tienda
                                                    </button>
                                                </Link>
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
                )
            }
        </>
    )
}