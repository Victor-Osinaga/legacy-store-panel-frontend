import './navigation.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
    const [activeSection, setActiveSection] = useState(""); // Estado para rastrear la sección activa
    const [showSubmenuColores, setShowSubmenuColores] = useState(false);

    const handleSectionClick = (sectionId) => {
        setActiveSection(sectionId); // Actualizar la sección activa cuando se hace clic en una sección


        // si hace click en algun link se oculta el nav si esta debajo de los 1000px
        if (window.innerWidth <= 1000) {
            const scrollable = document.getElementById('menu-container')
            scrollable.classList.toggle('navigationVisible')


            const burguer = document.getElementById('header-burguer')
            burguer.classList.toggle('shadow')
            burguer.style.color = "inherit";
        }
    };

    const handleShowSubmenuColores = () => {
        console.log("Submenu coloressssssssssssss");
        setShowSubmenuColores(!showSubmenuColores)
    }

    const getLinkClassName = (sectionId) => {

        // Función para determinar la clase CSS en función de la sección activa
        return sectionId === activeSection ? "text-primary bg-secondary-subtle" : "text-gray";
    };

    return (
        <section id="menu-container" className="menu-container bg-white" >
            {/* <div className="w-100"> */}
            <ul className='w-100 fontSM-Custom'>
                {/* <li className={`w-100 navLink ${getLinkClassName('dashboard')}`}>
                    <Link to={'/admin/dashboard'} onClick={() => handleSectionClick('dashboard')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="svgSize text-gray">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        <span className={`ms-3`}>Dashboard</span>
                    </Link>
                </li>
                <li className={`w-100 navLink ${getLinkClassName('clientes')}`}>
                    <Link to={'/admin/clientes'} onClick={() => handleSectionClick('clientes')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray svgSize">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <span className={`ms-3`}>Clientes</span>
                    </Link>
                </li> */}
                <li className={`w-100 navLink ${getLinkClassName('productos')}`}>
                    <Link to={'/admin/productos'} onClick={() => handleSectionClick('productos')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray svgSize">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                        </svg>
                        <span className={`ms-3`}>Productos</span>
                    </Link>
                </li>
                <li className={`w-100 navLink ${getLinkClassName('categorias')}`}>
                    <Link to={'/admin/categorias'} onClick={() => handleSectionClick('categorias')}>
                        <svg className="text-gray svgSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g fill="none" fillRule="evenodd" stroke="#200E32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(2 2)">
                                <path d="M14.2855094 9.76996262e-15L17.5521036 9.76996262e-15C18.9036211 9.76996262e-15 20 1.10589743 20 2.47018211L20 5.76410278C20 7.12735391 18.9036211 8.23428489 17.5521036 8.23428489L14.2855094 8.23428489C12.9329672 8.23428489 11.8365883 7.12735391 11.8365883 5.76410278L11.8365883 2.47018211C11.8365883 1.10589743 12.9329672 9.76996262e-15 14.2855094 9.76996262e-15zM2.44892104 9.76996262e-15L5.71449064 9.76996262e-15C7.06703281 9.76996262e-15 8.16341169 1.10589743 8.16341169 2.47018211L8.16341169 5.76410278C8.16341169 7.12735391 7.06703281 8.23428489 5.71449064 8.23428489L2.44892104 8.23428489C1.09637888 8.23428489 3.55271368e-15 7.12735391 3.55271368e-15 5.76410278L3.55271368e-15 2.47018211C3.55271368e-15 1.10589743 1.09637888 9.76996262e-15 2.44892104 9.76996262e-15zM2.44892104 11.7657151L5.71449064 11.7657151C7.06703281 11.7657151 8.16341169 12.8716125 8.16341169 14.2369308L8.16341169 17.5298179C8.16341169 18.8941026 7.06703281 20 5.71449064 20L2.44892104 20C1.09637888 20 3.55271368e-15 18.8941026 3.55271368e-15 17.5298179L3.55271368e-15 14.2369308C3.55271368e-15 12.8716125 1.09637888 11.7657151 2.44892104 11.7657151zM14.2855094 11.7657151L17.5521036 11.7657151C18.9036211 11.7657151 20 12.8716125 20 14.2369308L20 17.5298179C20 18.8941026 18.9036211 20 17.5521036 20L14.2855094 20C12.9329672 20 11.8365883 18.8941026 11.8365883 17.5298179L11.8365883 14.2369308C11.8365883 12.8716125 12.9329672 11.7657151 14.2855094 11.7657151z"></path>
                            </g>
                        </svg>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray svgSize">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                        </svg> */}
                        <span className={`ms-3`}>Categorias</span>
                    </Link>
                </li>
                <li className={`w-100 navLink mb-4 ${getLinkClassName('ordenes-retiro')}`}>
                    <Link to={'/admin/ordenes-retiro'} onClick={() => handleSectionClick('ordenes-retiro')}>
                        {/* <svg className="text-gray svgSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g fill="none" fillRule="evenodd" stroke="#200E32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(2 2)">
                                <path d="M14.2855094 9.76996262e-15L17.5521036 9.76996262e-15C18.9036211 9.76996262e-15 20 1.10589743 20 2.47018211L20 5.76410278C20 7.12735391 18.9036211 8.23428489 17.5521036 8.23428489L14.2855094 8.23428489C12.9329672 8.23428489 11.8365883 7.12735391 11.8365883 5.76410278L11.8365883 2.47018211C11.8365883 1.10589743 12.9329672 9.76996262e-15 14.2855094 9.76996262e-15zM2.44892104 9.76996262e-15L5.71449064 9.76996262e-15C7.06703281 9.76996262e-15 8.16341169 1.10589743 8.16341169 2.47018211L8.16341169 5.76410278C8.16341169 7.12735391 7.06703281 8.23428489 5.71449064 8.23428489L2.44892104 8.23428489C1.09637888 8.23428489 3.55271368e-15 7.12735391 3.55271368e-15 5.76410278L3.55271368e-15 2.47018211C3.55271368e-15 1.10589743 1.09637888 9.76996262e-15 2.44892104 9.76996262e-15zM2.44892104 11.7657151L5.71449064 11.7657151C7.06703281 11.7657151 8.16341169 12.8716125 8.16341169 14.2369308L8.16341169 17.5298179C8.16341169 18.8941026 7.06703281 20 5.71449064 20L2.44892104 20C1.09637888 20 3.55271368e-15 18.8941026 3.55271368e-15 17.5298179L3.55271368e-15 14.2369308C3.55271368e-15 12.8716125 1.09637888 11.7657151 2.44892104 11.7657151zM14.2855094 11.7657151L17.5521036 11.7657151C18.9036211 11.7657151 20 12.8716125 20 14.2369308L20 17.5298179C20 18.8941026 18.9036211 20 17.5521036 20L14.2855094 20C12.9329672 20 11.8365883 18.8941026 11.8365883 17.5298179L11.8365883 14.2369308C11.8365883 12.8716125 12.9329672 11.7657151 14.2855094 11.7657151z"></path>
                            </g>
                        </svg> */}


                        <svg className='text-gray svgSize' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#200E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 15l2 2l4 -4" />
                        </svg>
                        <span className={`ms-3`}>Ordenes de retiro</span>
                    </Link>
                </li>




                <li className={`w-100 navLink ${getLinkClassName('retiro-en-sucursal')}`}>
                    <Link to={'/admin/retiro-en-sucursal'} onClick={() => handleSectionClick('retiro-en-sucursal')}>
                        {/* <svg className="text-gray svgSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g fill="none" fillRule="evenodd" stroke="#200E32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(2 2)">
                                <path d="M14.2855094 9.76996262e-15L17.5521036 9.76996262e-15C18.9036211 9.76996262e-15 20 1.10589743 20 2.47018211L20 5.76410278C20 7.12735391 18.9036211 8.23428489 17.5521036 8.23428489L14.2855094 8.23428489C12.9329672 8.23428489 11.8365883 7.12735391 11.8365883 5.76410278L11.8365883 2.47018211C11.8365883 1.10589743 12.9329672 9.76996262e-15 14.2855094 9.76996262e-15zM2.44892104 9.76996262e-15L5.71449064 9.76996262e-15C7.06703281 9.76996262e-15 8.16341169 1.10589743 8.16341169 2.47018211L8.16341169 5.76410278C8.16341169 7.12735391 7.06703281 8.23428489 5.71449064 8.23428489L2.44892104 8.23428489C1.09637888 8.23428489 3.55271368e-15 7.12735391 3.55271368e-15 5.76410278L3.55271368e-15 2.47018211C3.55271368e-15 1.10589743 1.09637888 9.76996262e-15 2.44892104 9.76996262e-15zM2.44892104 11.7657151L5.71449064 11.7657151C7.06703281 11.7657151 8.16341169 12.8716125 8.16341169 14.2369308L8.16341169 17.5298179C8.16341169 18.8941026 7.06703281 20 5.71449064 20L2.44892104 20C1.09637888 20 3.55271368e-15 18.8941026 3.55271368e-15 17.5298179L3.55271368e-15 14.2369308C3.55271368e-15 12.8716125 1.09637888 11.7657151 2.44892104 11.7657151zM14.2855094 11.7657151L17.5521036 11.7657151C18.9036211 11.7657151 20 12.8716125 20 14.2369308L20 17.5298179C20 18.8941026 18.9036211 20 17.5521036 20L14.2855094 20C12.9329672 20 11.8365883 18.8941026 11.8365883 17.5298179L11.8365883 14.2369308C11.8365883 12.8716125 12.9329672 11.7657151 14.2855094 11.7657151z"></path>
                            </g>
                        </svg> */}


                        <svg className="text-gray svgSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.258 10.258l-7.258 -7.258l-9 9h2v7a2 2 0 0 0 2 2h4" /><path d="M9 21v-6a2 2 0 0 1 2 -2h1.5" /><path d="M17.8 20.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" />
                        </svg>
                        <span className={`ms-3`}>Retiro en sucursal</span>
                    </Link>
                </li>
                <li className={`w-100 navLink mb-4 ${getLinkClassName('envios')}`}>
                    <Link to={'/admin/envios'} onClick={() => handleSectionClick('envios')}>
                        <svg className="text-gray svgSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#200E32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" /><path d="M3 9l4 0" />
                        </svg>
                        {/* <svg className="text-gray svgSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g fill="none" fillRule="evenodd" stroke="#200E32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(2 2)">
                                <path d="M14.2855094 9.76996262e-15L17.5521036 9.76996262e-15C18.9036211 9.76996262e-15 20 1.10589743 20 2.47018211L20 5.76410278C20 7.12735391 18.9036211 8.23428489 17.5521036 8.23428489L14.2855094 8.23428489C12.9329672 8.23428489 11.8365883 7.12735391 11.8365883 5.76410278L11.8365883 2.47018211C11.8365883 1.10589743 12.9329672 9.76996262e-15 14.2855094 9.76996262e-15zM2.44892104 9.76996262e-15L5.71449064 9.76996262e-15C7.06703281 9.76996262e-15 8.16341169 1.10589743 8.16341169 2.47018211L8.16341169 5.76410278C8.16341169 7.12735391 7.06703281 8.23428489 5.71449064 8.23428489L2.44892104 8.23428489C1.09637888 8.23428489 3.55271368e-15 7.12735391 3.55271368e-15 5.76410278L3.55271368e-15 2.47018211C3.55271368e-15 1.10589743 1.09637888 9.76996262e-15 2.44892104 9.76996262e-15zM2.44892104 11.7657151L5.71449064 11.7657151C7.06703281 11.7657151 8.16341169 12.8716125 8.16341169 14.2369308L8.16341169 17.5298179C8.16341169 18.8941026 7.06703281 20 5.71449064 20L2.44892104 20C1.09637888 20 3.55271368e-15 18.8941026 3.55271368e-15 17.5298179L3.55271368e-15 14.2369308C3.55271368e-15 12.8716125 1.09637888 11.7657151 2.44892104 11.7657151zM14.2855094 11.7657151L17.5521036 11.7657151C18.9036211 11.7657151 20 12.8716125 20 14.2369308L20 17.5298179C20 18.8941026 18.9036211 20 17.5521036 20L14.2855094 20C12.9329672 20 11.8365883 18.8941026 11.8365883 17.5298179L11.8365883 14.2369308C11.8365883 12.8716125 12.9329672 11.7657151 14.2855094 11.7657151z"></path>
                            </g>
                        </svg> */}
                        <span className={`ms-3`}>Envio a domilicio</span>
                    </Link>
                </li>
                {/* <li className={`w-100 navLink ${getLinkClassName('presupuestos')}`}>
                    <Link to={'/admin/presupuestos'} onClick={() => handleSectionClick('presupuestos')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray svgSize">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                        <span className={`ms-3`}>Presupuestos</span>
                    </Link>
                </li>
                <li className={`w-100 navLink ${getLinkClassName('facturas')}`}>
                    <Link to={'/admin/facturas'} onClick={() => handleSectionClick('facturas')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray svgSize">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span className={`ms-3`}>Facturas</span>
                    </Link>
                </li>
                <li className={`w-100 navLink ${getLinkClassName('facturasFrecuentes')}`}>
                    <Link to={'/admin/facturas/frecuentes'} onClick={() => handleSectionClick('facturasFrecuentes')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray svgSize">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span className={`ms-3`}>Facturas Frecuentes</span>
                    </Link>
                </li>
                <li className={`w-100 navLink ${getLinkClassName('pagos')}`}>
                    <Link to={'/admin/pagos'} onClick={() => handleSectionClick('pagos')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="svgSize text-gray">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                        </svg>
                        <span className={`ms-3`}>Pagos</span>
                    </Link>
                </li>
                <li className={`w-100 navLink mb-4 ${getLinkClassName('gastos')}`}>
                    <Link to={'/admin/gastos'} onClick={() => handleSectionClick('gastos')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="svgSize text-gray">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                        <span className={`ms-3`}>Gastos</span>
                    </Link>
                </li>
                <li className={`w-100 navLink ${getLinkClassName('modulos')}`}>
                    <Link to={'/admin/modulos'} onClick={() => handleSectionClick('modulos')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="svgSize text-gray">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>
                        </svg>
                        <span className={`ms-3`}>Módulos</span>
                    </Link>
                </li>
                <li className={`w-100 navLink ${getLinkClassName('usuarios')}`}>
                    <Link to={'/admin/usuarios'} onClick={() => handleSectionClick('usuarios')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="svgSize text-gray">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                        </svg>
                        <span className={`ms-3`}>Usuarios</span>
                    </Link>
                </li>
                <li className={`w-100 navLink ${getLinkClassName('reportes')}`}>
                    <Link to={'/admin/reportes'} onClick={() => handleSectionClick('reportes')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="svgSize text-gray">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                        </svg>
                        <span className={`ms-3`}>Reportes</span>
                    </Link>
                </li> */}
                <li className={`w-100 navLink`}>
                    <Link onClick={() => handleShowSubmenuColores()}>
                        <svg className="svgSize text-gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span className={`ms-3`}>Mi tienda</span>
                        {showSubmenuColores ? (
                            <svg className='svgSize ms-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 15l6 -6l6 6" />
                            </svg>
                        ) : (
                            <svg className='svgSize ms-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        )}
                    </Link>
                    {showSubmenuColores && (
                        <ul id='subMenuAjustes' className='submenuAjustes'>
                            <li className={`w-100 navLink ${getLinkClassName('colores')}`}>
                                <Link className='' to={'/admin/ajustes/tienda/colores'} onClick={() => handleSectionClick('colores')}>
                                    {/* <svg className="svgSize text-gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>
                                    </svg> */}
                                    <svg className='svgSize text-gray' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 21v-4a4 4 0 1 1 4 4h-4" /><path d="M21 3a16 16 0 0 0 -12.8 10.2" /><path d="M21 3a16 16 0 0 1 -10.2 12.8" /><path d="M10.6 9a9 9 0 0 1 4.4 4.4" />
                                    </svg>
                                    <span className={`ms-3`}>Colores</span>
                                </Link>
                            </li>
                            <li className={`w-100 navLink ${getLinkClassName('footer')}`}>
                                <Link className='' to={'/admin/ajustes/tienda/footer'} onClick={() => handleSectionClick('footer')}>
                                    {/* <svg className="svgSize text-gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>
                                    </svg> */}
                                    <svg className='svgSize text-gray' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M4 15l16 0" />
                                    </svg>
                                    <span className={`ms-3`}>Pie de página</span>
                                </Link>
                            </li>
                            {/* <li className={`w-100 navLink ${getLinkClassName('panel')}`}>
                                <Link to={'/admin/ajustes/panel'} onClick={() => handleSectionClick('panel')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="svgSize text-gray">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>
                                    </svg>
                                    <span className={`ms-3`}>Estilos panel</span>
                                </Link>
                            </li> */}
                        </ul>
                    )}

                </li>
            </ul>
            {/* </div> */}
        </section>
    )
}