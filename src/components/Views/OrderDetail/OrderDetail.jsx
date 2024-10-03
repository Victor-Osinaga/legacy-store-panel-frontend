import { useEffect, useState } from "react"
import MainTitle from "../../Fragments/MainTitle/MainTitle"
import useStoreContext from "../../../provider/storeProvider"
import { useLocation } from "react-router-dom"
import NoItems from "../../Fragments/NoItems/NoItems"
import toNumberArgStandard from "../../../utils/toNumberArgStandard"
import { useForm } from "react-hook-form"
import updateOrderStatus from "../../../services/orders/updateOrderStatus.js"

export default function OrderDetail() {
    const { truncarTexto, toastLoading, toastSuccess, toastError, dismissToast, calcPriceFinal } = useStoreContext()
    const { register, handleSubmit, formState: { errors }, control, setValue, reset } = useForm({
        defaultValues: {
            order_status: "",
        }
    })
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState(null)

    const location = useLocation();
    console.log("location desde order detail", location);

    useEffect(() => {
        setLoading(true)
        fetchOrder()
        return () => {
            dismissToast()
        };
    }, [])

    const fetchOrder = async () => {
        const id = toastLoading("Cargando orden...");
        try {
            const order = location.state?.order;

            if (!order) {
                setLoading(false);
                throw { msg: "No se encontró esa orden" };
            }

            // Simular retraso (si realmente lo necesitas)
            setTimeout(() => {
                setOrder(order);
                setValue("order_status", order.order_status)
                setLoading(false);
                toastSuccess(<>Orden cargada: <strong>'{order.id}'</strong></>, id);
            }, 500);

        } catch (error) {
            setLoading(false);
            toastError(
                <div className='text-center'><p className='mb-0'><strong>{error.msg || 'Error al cargar la orden'}</strong></p></div>,
                id
            );
        }
    }

    const onSubmit = async (data) => {
        console.log("data", data);


        const toastId = toastLoading("Actualizando orden...")

        try {
            const updatedOrder = await updateOrderStatus(order.id, data)
            toastSuccess(<>Orden actualizada: <strong>'{order.id}'</strong></>, toastId)
            setOrder(updatedOrder)
        } catch (error) {
            toastError(
                <div className='text-center'><p className='mb-0'><strong>{error.msg}</strong></p></div>,
                toastId
            )
        }
    };


    return (
        <>
            <section className='containerViewMain'>
                {/* <MainTitle mainTitle='Orden de retiro' linkToCreate='/admin/ordenes-retiro/editar/' titleButton='Editar Orden' /> */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='d-flex justify-content-between align-items-center w-100 mb-2'>
                        <div>
                            <h3 className='fs-4 mainTitle'>Orden de retiro</h3>
                        </div>
                        <button className='btnNewContainer rounded py-1 border-0'>
                            <div className='d-flex px-4 justify-content-between align-items-center'>
                                <svg className='svgSize text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <div type="submit" className='btnNew border border-0 text-white bg-transparent'>
                                    Actualizar orden
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="order_status" className="mb-1 fw-bold textGray-Custom">Actualiza el estado:</label>
                        <select className="form-select mb-2" id="order_status" {...register('order_status', {
                            required: {
                                value: true,
                                message: "Por favor, elige un estado"
                            },
                            validate: (v) => {
                                const values = ["pendiente", "procesado", "listo", "enviado/retirado"]
                                const validate = values.find(value => v == value)
                                console.log("validateeeeeee", validate);

                                if (!validate) return "Valor no admitido"

                                if (order.order_status == v) {
                                    return `La orden ya se encuentra en estado ${order.order_status}`
                                }

                            }
                        })}>
                            <option value="">Elige un estado</option>
                            <option value="pendiente">Estado pendiente</option>
                            <option value="procesado">Estado procesado</option>
                            <option value="listo">Estado listo</option>
                            <option value="enviado/retirado">Estado Enviado/retirado</option>
                        </select>
                        {errors.order_status && <span className='mt-1 fontXS-Custom text-danger'>{errors.order_status.message} <span className='fw-semibold'>*</span></span>}
                    </div>
                </form>

                {!loading ? (
                    order ? (
                        <>
                            <div className="bg-white py-3 px-4 rounded-3 shadow-lg mb-3">
                                <h4 className="m-0 fw-bold mb-3">
                                    <svg className="textGray-Custom svgSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path>
                                    </svg>
                                    <span className="ms-1">Detalles de la orden</span>
                                </h4>
                                <p><span className="fw-bold">ID de orden:</span> {order.id}</p>
                                <p><span className="fw-bold">ID de pago:</span> {order.payment_id}</p>
                                <p><span className="fw-bold">Estado:</span> <span className="text-capitalize status_order" data-status={order.order_status}>{order.order_status}</span></p>
                                <p><span className="fw-bold">Fecha:</span> {order.timestamp}</p>
                                <p><span className="fw-bold">Cuotas:</span> {order.installments}</p>
                            </div>

                            <div className="bg-white py-3 px-4 rounded-3 shadow-lg mb-3">
                                <h4 className="m-0 fw-bold mb-3">
                                    <svg className="textGray-Custom svgSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    <span className="ms-1">Información del cliente</span>

                                </h4>
                                <p><span className="fw-bold">Nombre:</span> {order.client_info_contact.name}</p>
                                <p><span className="fw-bold">Apellido:</span> {order.client_info_contact.surname}</p>
                                <p><span className="fw-bold">Email:</span> {order.client_info_contact.email}</p>
                                <p><span className="fw-bold">Telefono:</span> ({order.client_info_contact.phone.area_code}) {order.client_info_contact.phone.number}</p>
                            </div>

                            <div className="bg-white py-3 px-4 rounded-3 shadow-lg mb-3">
                                <h4 className="m-0 fw-bold mb-3">
                                    <svg className="textGray-Custom svgSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle>
                                    </svg>
                                    <span className="ms-1">Sucursal de retiro</span>

                                </h4>
                                <p><span className="fw-bold">Dirección:</span> {order.shipment_info.street_name} - {order.shipment_info.street_number}</p>
                                <p><span className="fw-bold">Provincia:</span> {order.shipment_info.province}</p>
                                <p><span className="fw-bold">Localidad:</span> {order.shipment_info.locality}</p>
                                <p><span className="fw-bold">Código postal:</span> {order.shipment_info.postal_code}</p>
                                <p><span className="fw-bold">Tipo de envio:</span> {order.shipment_info.shipment_type}</p>
                            </div>

                            <div className="bg-white py-3 px-4 rounded-3 shadow-lg mb-3">
                                <h4 className="m-0 fw-bold mb-3">
                                    <svg className="textGray-Custom svgSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path>
                                    </svg>
                                    <span className="ms-1">Productos</span>
                                </h4>
                                {order.products.map((item) => (
                                    <>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: '100px 1fr 100px',
                                            gap: '1rem',
                                            marginBottom: '2rem',
                                            // outline: '1px solid red'
                                        }}>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                width={100}
                                                height={100}
                                                style={{
                                                    borderRadius: '0.5rem',
                                                    objectFit: 'cover',
                                                    aspectRatio: '1',
                                                }}
                                            />
                                            <div className='d-flex flex-column justify-content-center align-items-start'>
                                                {/* <h3 style={{ fontWeight: '600' }}>{item.name} <h6><span>(${item.price} c/u)</span></h6> </h3> */}
                                                <p className='m-0' style={{ fontWeight: 'bold' }}>{item.name}</p>
                                                <div style={{ fontSize: '.75rem', display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '0rem' }}>

                                                    <p className="m-0 d-flex align-items-center">
                                                        Talla: {item.selected_size_name}, Color: {item.selected_color_name} 
                                                        <span
                                                        className="rounded ms-1"
                                                        style={{
                                                            width: "10px",
                                                            height: "10px",
                                                            backgroundColor: `${item.selected_color_value_hexa}`,
                                                            display: "flex",
                                                            // border: "1px solid white"
                                                        }}
                                                    ></span></p>

                                                    <span className="m-0">Cantidad: {item.quantity}</span>
                                                    <span className="m-0">Precio: ${item.price}</span>
                                                </div>
                                            </div>
                                            <div className='d-flex flex-column justify-content-center align-items-end'>
                                                <span className='fw-bold'>Subtotal</span>
                                                <p className="text-success fw-bold">${toNumberArgStandard(item.quantity * item.price)}</p>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>

                            <div className="bg-white py-3 px-4 rounded-3 shadow-lg mb-3">
                                <h4 className="m-0 fw-bold mb-3">
                                    <svg className="textGray-Custom svgSize" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line>
                                    </svg>
                                    <span className="ms-1">Resumen de pago</span>

                                </h4>
                                <p><span className="fw-bold">Subtotal: </span>${toNumberArgStandard(calcPriceFinal(order.products, 0))}</p>
                                <p><span className="fw-bold">Costo de retiro: </span>${toNumberArgStandard(order.shipment_info.shipment_cost)}</p>
                                <p><span className="fw-bold">Total pagado: </span>${toNumberArgStandard(order.total_paid_amount)}</p>
                                <p><span className="fw-bold">Monto neto recibido: </span><span className="text-success fw-bold">${toNumberArgStandard(order.net_received_amount)}</span></p>
                                <p><span className="fw-bold">Fecha de liberación: </span>{order.money_release_date}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <NoItems msg="No se encontro esa orden" />
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
        </>
    )
}