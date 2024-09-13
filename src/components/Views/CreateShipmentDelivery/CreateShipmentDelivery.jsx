import { useEffect, useState } from "react";
import useStoreContext from "../../../provider/storeProvider";
import { useForm, Controller } from "react-hook-form";
import { validateProvince } from "../../../validators/validators.js";
import { NumericFormat } from "react-number-format";
import createShipmentDelivery from "../../../services/shipmentsDelivery/createShipmentDelivery.js";

export default function CreateShipmentDelivery() {
    const { toastLoading, toastSuccess, toastError, dismissToast } = useStoreContext()
    const [loading, setLoading] = useState(true)

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: {
            province: "SALTAAAA",
            shipmentCost: "99"
        }
    })

    useEffect(() => {
        setLoading(true)
        fetch()
        return () => {
            dismissToast()
        }
    }, [])

    const fetch = async () => {
        const id = toastLoading("Cargando formulario0")
        try {
            setTimeout(() => {
                setLoading(false)
                return toastSuccess("Completo", id)
            }, 500);
        } catch (error) {
            toastError(
                // <div className='text-center'><p className='mb-0'><strong>{error.msg}</strong></p></div>,
                <div className='text-center'><p className='mb-0'><strong>ERROR</strong></p></div>,
                id
            )
        }
    }

    const onSubmit = async (data) => {
        console.log("data", data);
        const toastId = toastLoading("Creando punto de envio")
        try {
            const provincia = await createShipmentDelivery(data)
            return toastSuccess(<>Punto de envio creado: <strong>'{provincia.province}'</strong> - id: <strong>'{provincia.id}'</strong></>, toastId)
        } catch (error) {
            toastError(
                <div className='text-center'>
                    <span>{error.msg}</span>
                </div>,
                toastId
            )
        }
    }

    return (
        <>
            <section className="containerViewMain">
                <div className='d-flex justify-content-between align-items-center w-100'>
                    <div>
                        <h3 className='fs-4 mainTitle'>Nueva Sucursal</h3>
                    </div>
                </div>

                {/* ESPACIADOR */}
                <div className='btnActionMainsContainer mb-2'></div>
                {!loading ? (
                    <div className="container-fluid p-0">
                        <div className="row justify-content-between p-2 p-md-0 m-0">
                            <div className="col-12 col-md-7 p-0 pe-md-3 mb-3 mb-md-0">
                                <form onSubmit={handleSubmit(onSubmit)} className="bg-white border px-4 py-4 rounded">
                                    {/* PROVINCE */}
                                    <div className="row mb-3">
                                        <p className='col-12 mb-2 text-center fw-semibold textGray-Custom fontSM-Custom'>Tu punto de envio a distancia</p>
                                        <div className="row rounded border col-12 p-0 py-2 mx-auto">
                                            <div className="d-flex flex-column mb-3">
                                                <label htmlFor="province" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                    Provincia
                                                </label>
                                                <input type="text" id="province" className='form-control fontSM-Custom custom-placeholder' placeholder='Buenos aires' {
                                                    ...register('province', {
                                                        required: {
                                                            value: true,
                                                            message: "La 'provincia' es requerida"
                                                        },
                                                        validate: validateProvince
                                                    })
                                                } />
                                                {errors.province && <span className='mt-1 fontXS-Custom text-danger'>{errors.province.message} <span className='fw-semibold'>*</span></span>}
                                            </div>

                                            {/* COSTO DE RETIRO */}
                                            <div className="col-6 d-flex flex-column mb-3">
                                                <label htmlFor="shipmentCost" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                    Costo de envio
                                                </label>
                                                <Controller
                                                    name="shipmentCost"
                                                    id="shipmentCost"
                                                    control={control}
                                                    rules={{
                                                        required: {
                                                            value: true,
                                                            message: "El 'costo de retiro' es requerido"
                                                        },
                                                        validate: {
                                                            positive: (value) => value >= 0 || "El valor debe ser mayor o igual a cero",
                                                            maxLength: (value) => value.toString().length <= 10 || "Maximo 10 digitos"
                                                        }
                                                    }}
                                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                        <>
                                                            <NumericFormat
                                                                className='form-control fontSM-Custom custom-placeholder'
                                                                placeholder='$ 0'
                                                                value={value}
                                                                onValueChange={(values) => {
                                                                    onChange(values.floatValue);
                                                                }}
                                                                thousandSeparator="."
                                                                decimalSeparator=","
                                                                decimalScale={2}
                                                                fixedDecimalScale={true}
                                                                allowNegative={false}
                                                                allowLeadingZeros={false}
                                                                valueIsNumericString={true}
                                                                prefix="$ "
                                                            />
                                                            {errors.shipmentCost && <span className='mt-1 fontXS-Custom text-danger'>{errors.shipmentCost.message} <span className='fw-semibold'>*</span></span>}
                                                        </>
                                                    )}
                                                />
                                            </div>
                                            
                                            {/* BTN SUBMIT */}
                                            <div className="col-12 d-flex flex-column mb-2">
                                                <button type="submit" className="btn btn-primary w-100 btn-sm fontSM-Custom">CREAR PUNTO DE ENVIO</button>
                                            </div>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : (
                    <section className='spinnerContainer'>
                        <div className="spinner-grow" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </section>
                )}
            </section>
        </>
    )
}