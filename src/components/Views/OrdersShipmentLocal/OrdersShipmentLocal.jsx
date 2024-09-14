// import { useState } from 'react'
// import './orders.css'


// export default function Orders() {
//     const [darkMode, setDarkMode] = useState(false)

//     const toggleDarkMode = () => {
//         setDarkMode(!darkMode)
//     }

//     const sampleOrders = [
//         { id: '001', customer: 'Juan Pérez', date: '2023-06-01', total: 150.00, status: 'pendiente' },
//         { id: '002', customer: 'María García', date: '2023-06-02', total: 200.50, status: 'procesando' },
//         { id: '003', customer: 'Carlos López', date: '2023-06-03', total: 75.25, status: 'listo' },
//         { id: '004', customer: 'Ana Martínez', date: '2023-06-04', total: 300.00, status: 'retirado' },
//         { id: '005', customer: 'Pedro Sánchez', date: '2023-06-05', total: 125.75, status: 'pendiente' },
//       ]
//     return (
//         <section className="containerViewMain">
//             <div className={`app ${darkMode ? 'dark' : 'light'}`}>
//                 <div className="container">
//                     <h1>Panel de Órdenes</h1>
//                     <button onClick={toggleDarkMode} className="toggle-btn">
//                         {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
//                     </button>
//                     <table className="orders-table">
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Cliente</th>
//                                 <th>Fecha</th>
//                                 <th>Total</th>
//                                 <th>Estado</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {sampleOrders.map((order) => (
//                                 <tr key={order.id}>
//                                     <td>{order.id}</td>
//                                     <td>{order.customer}</td>
//                                     <td>{order.date}</td>
//                                     <td>${order.total.toFixed(2)}</td>
//                                     <td>
//                                         <span className={`status ${order.status}`}>{order.status}</span>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </section>
//     )
// }

// _____________________________________________________________________________________________________________________________________________________________________

// import { useState } from 'react'
// import styles from './OrderTable.module.css'

// export default function Orders() {
//     const [filter, setFilter] = useState('todos')

//     const orders = [
//         { id: '001', customer: 'Juan Pérez', date: '2023-06-01', total: 150.00, status: 'pendiente' },
//         { id: '002', customer: 'María García', date: '2023-06-02', total: 200.50, status: 'procesando' },
//         { id: '003', customer: 'Carlos López', date: '2023-06-03', total: 75.25, status: 'listo' },
//         { id: '004', customer: 'Ana Martínez', date: '2023-06-04', total: 300.00, status: 'retirado' },
//         { id: '005', customer: 'Pedro Sánchez', date: '2023-06-05', total: 125.75, status: 'pendiente' },
//       ]

//   const filteredOrders = filter === 'todos' 
//     ? orders 
//     : orders.filter(order => order.status === filter)

//     const getStatusBadgeClass = (status) => {
//         switch(status) {
//           case 'pendiente': return styles.badgePendiente
//           case 'procesando': return styles.badgeProcesando
//           case 'listo': return styles.badgeListo
//           case 'retirado': return styles.badgeRetirado
//           default: return ''
//         }
//       }

//     return (
//         <section className="containerViewMain">
//             <div className={styles.container}>
//                 <h1 className={styles.title}>Órdenes de Compra</h1>
//                 <div className={styles.filterContainer}>
//                     <select
//                         className={styles.select}
//                         onChange={(e) => setFilter(e.target.value)}
//                         value={filter}
//                     >
//                         <option value="todos">Todos</option>
//                         <option value="pendiente">Pendiente</option>
//                         <option value="procesando">Procesando</option>
//                         <option value="listo">Listo</option>
//                         <option value="retirado">Retirado</option>
//                     </select>
//                 </div>
//                 <table className={styles.table}>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Cliente</th>
//                             <th>Fecha</th>
//                             <th>Total</th>
//                             <th>Estado</th>
//                             <th>Acciones</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredOrders.map((order) => (
//                             <tr key={order.id}>
//                                 <td>{order.id}</td>
//                                 <td>{order.customer}</td>
//                                 <td>{order.date}</td>
//                                 <td>${order.total.toFixed(2)}</td>
//                                 <td>
//                                     <span className={`${styles.badge} ${getStatusBadgeClass(order.status)}`}>
//                                         {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                                     </span>
//                                 </td>
//                                 <td>
//                                     <button className={styles.button}>
//                                         <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                                         </svg>
//                                     </button>
//                                     <button className={styles.button}>
//                                         <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
//                                         </svg>
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </section>
//     )
// }

import { useEffect, useState } from "react"
import ActionsInGroup from "../../Fragments/ActionsInGroup/ActionsInGroup"
import NoItems from "../../Fragments/NoItems/NoItems"
import useStoreContext from "../../../provider/storeProvider"
import { Link } from "react-router-dom"
import OutlineMore from "../../Icons/OutlineMore/OutlineMore"
import EditIcon from "../../Icons/EditIcon/EditIcon"
import DeleteIcon from "../../Icons/DeleteIcon/DeleteIcon"
import useHandlerTable from "../../../customHooks/useHandlerTable"
import getOrdersLocal from "../../../services/orders/getOrdersLocal.js"
import ModalDelete from "../../Fragments/ModalDelete/ModalDelete.jsx"
import deleteOrderById from "../../../services/orders/deleteOrderById.js"

export default function OrdersShipmentLocal() {
    const { truncarTexto, showItemActions, dismissToast, toastLoading, toastSuccess, toastError } = useStoreContext()

    const [orders, setOrders] = useState([])

    const { select, showBtnActions, entity, allSelected, selectAllItems, deleteItemsSelected } = useHandlerTable(orders)

    const [loading, setLoading] = useState(false)

    const [modalInfo, setModalInfo] = useState({ showModal: false, id: null, name: '' });

    useEffect(() => {
        setLoading(true)
        fetchOrders()
        return () => {
            dismissToast()
        }
    }, [])

    const fetchOrders = async () => {
        const id = toastLoading("Cargando ordenes...")
        try {

            const ordenes = await getOrdersLocal()
            const ordersWithSelection = ordenes.map(orden => ({ ...orden, selected: false }));
            setOrders(ordersWithSelection);

            setTimeout(() => {
                // si const productos esta fuera del try no toma el valor para el condicional de abajo
                setLoading(false)
                if (ordenes.length == 0) {
                    return toastSuccess(<>No hay ordenes creadas: <strong>'{ordenes.length}'</strong></>, id)
                }

                return toastSuccess(<>Ordenes cargadas: <strong>'{ordenes.length}'</strong></>, id)
            }, 500);


        } catch (error) {
            toastError(
                <div className='text-center'><p className='mb-0'><strong>{error.msg}</strong></p></div>,
                id
            )
            setLoading(true)
        }

    }

    const deleteOrderByIdComponent = async (orderId, name) => {
        setModalInfo({ showModal: false, id: null, name: '' })
        const toastId = toastLoading("Eliminando orden")
        try {
            const result = await deleteOrderById(orderId, name)
            const orders = await getOrdersLocal()
            const ordersWithSelection = orders.map(order => ({ ...order, selected: false }));
            setOrders(ordersWithSelection);

            console.log("nuevas ordenesLocal desde : deleteOrderById", ordersWithSelection);
            return toastSuccess(<>Orden eliminada eliminado: <strong>'{name}'</strong> - cantidad: <strong>'{result.data.deletedCount}'</strong></>, toastId)
        } catch (error) {
            console.log(error);
            toastError(
                <div className='text-center'><p className='mb-0'><strong>{error.msg}</strong></p></div>,
                toastId
            )
        }
    }

    const openModal = (id, name) => {
        showItemActions(id)
        setModalInfo({ showModal: true, id: id, name: name });
    };

    const closeModal = () => {
        setModalInfo({ showModal: false, id: null, name: '' });
    };


    return (
        <section className="containerViewMain">
            <div className='d-flex justify-content-between align-items-center w-100 mb-2'>
                <div>
                    <h3 className='fs-4 mainTitle'>Ordenes de compra - Retiros</h3>
                </div>
            </div>

            <div className="text-secondary mb-2 fontSM-Custom">
                <p className="m-0">Aqui estaran todas las ordenes de compra para retiro en local y sus respectivos estados de compra</p>
            </div>

            {!loading ? (
                entity.length > 0 ? (
                    <>
                        <ActionsInGroup
                            handlebtnActionMains={showBtnActions}
                            deleteGroup={deleteItemsSelected}
                        />
                        <div className="tableContainerMain rounded">
                            <table className='tableContainerViewMain bg-white w-100'>
                                <thead className='tableHeadTitlesMain fontXS-Custom textGray-Custom'>
                                    <tr>
                                        <th className='thSpacingMain'>
                                            <input
                                                className="form-check-input inputCheckBoxTableMain"
                                                type='checkbox'
                                                checked={allSelected}
                                                onChange={selectAllItems}
                                            />
                                        </th>
                                        <th className='thSpacingMain'><span>CLIENTE</span></th>
                                        <th className='thSpacingMain'><span>FECHA</span></th>
                                        <th className='thSpacingMain'><span>TOTAL</span></th>
                                        <th className='thSpacingMain'><span>ESTADO</span></th>
                                        {/* <th className='thSpacingMain'><span>AGREGADO</span></th> */}
                                    </tr>
                                </thead>
                                <tbody className='fontSM-Custom'>
                                    {entity.map((order, index) => (
                                        <tr key={order.id}>
                                            <td className='tdSpacingMain'>
                                                <input
                                                    className="form-check-input inputCheckBoxTableMain"
                                                    type='checkbox'
                                                    checked={order.selected}
                                                    onChange={() => select(order.id)}
                                                />
                                            </td>
                                            <td className="fontSM-Custom tdSpacingMain">
                                                <Link className="trBodyLinkNameMain" to={`/admin`}>
                                                    {/* <img className='productImgMain' src={product.image} alt={product.name} /> */}
                                                    <span title={`${order.client_info_contact.name} ${order.client_info_contact.surname}`}>{truncarTexto(`${order.client_info_contact.name} ${order.client_info_contact.surname}`)}</span>
                                                </Link>
                                            </td>
                                            <td className="fontSM-Custom textGray-Custom tdSpacingMain"><span>{order.timestamp}</span></td>
                                            <td className="fontSM-Custom tdSpacingMain text-success"><span>$ {order.total_paid_amount}</span></td>
                                            <td className="fontSM-Custom tdSpacingMain textGray-Custom"><span>{order.order_status}</span></td>
                                            <td className='fontSM-Custom tdSpacingMain position-relative'>
                                                {/* poner el id a este contenedor para poder agregarle el mostrar more actions */}
                                                <div className='d-flex '>
                                                    {/*  el width del button de abajo si esta activo el btn deja de ser cuadrado */}
                                                    <button
                                                        onClick={() => showItemActions(order.id)}
                                                        className="btnMoreActionsMain /*w-100*/ position-relative border border-0"
                                                    >
                                                        <OutlineMore />
                                                    </button>
                                                    <ul id={order.id} className={`submenuPruebaMain shadow-lg ${index === entity.length - 1 && index !== 0 ? '' : ''}`}>
                                                        <li className='btnsMoreActionsContainerMain'>
                                                            <Link /*to={`/admin/productos/editar/${product.id}`}*/>
                                                                <button className="btnActionMain textGray700-Custom">
                                                                    <EditIcon></EditIcon>
                                                                    Editar
                                                                </button>
                                                            </Link>
                                                            <button
                                                                onClick={() => openModal(order.id, `${order.client_info_contact.name} ${order.client_info_contact.surname}`)}
                                                                className="btnActionMain bg-danger text-white fontSM-Custom">
                                                                <DeleteIcon classList="text-white svgSize" />
                                                                Eliminar
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {modalInfo.showModal && <ModalDelete
                            id={modalInfo.id}
                            name={modalInfo.name}
                            closeModal={closeModal}
                            functionDelete={deleteOrderByIdComponent}
                            entity="order"
                        />}
                    </>
                ) : (
                    <>
                        <NoItems msg="Todavia no se cargaron ordenes" />
                    </>
                )
            ) : (
                <>
                    <section className='spinnerContainer'>
                        <div className="spinner-grow" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </section>
                </>
            )}
        </section>
    )
}