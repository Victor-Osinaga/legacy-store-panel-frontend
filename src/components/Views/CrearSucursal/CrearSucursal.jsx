import { useEffect, useState } from "react"
import useStoreContext from "../../../provider/storeProvider"
import { useForm, Controller } from "react-hook-form"
import { NumericFormat } from 'react-number-format';
import { validateLocality, validatePostalCode, validateProvince, validateStreetName, validateStreetNumber } from "../../../validators/validators.js";
import createShipmentLocal from "../../../services/shipmentsLocal/createShipmentLocal.js";

export default function CrearSucursal() {
    const { toastLoading, toastSuccess, toastError, dismissToast } = useStoreContext()
    const [loading, setLoading] = useState(true)

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        defaultValues: {
            province: "Buenos aires",
            locality: "La plata",
            postalCode: "9900",
            streetName: "Av Bicentenario",
            streetNumber: "678",
            shipingCost: 0
        }
    })

    useEffect(() => {
        setLoading(true)
        fetch()
        return () => {
            dismissToast()
        };
    }, [])

    const fetch = async () => {
        const id = toastLoading("Cargando formulario")
        try {
            // const currentValues = getValues()
            // reset({
            //     ...currentValues,
            // });
            setTimeout(() => {
                // si const productos esta fuera del try no toma el valor para el condicional de abajo
                setLoading(false)
                return toastSuccess("Completo", id)
            }, 500);


        } catch (error) {
            toastError(
                // <div className='text-center'><p className='mb-0'><strong>{error.msg}</strong></p></div>,
                <div className='text-center'><p className='mb-0'><strong>ERROR</strong></p></div>,
                id
            )
            setLoading(true)
        }
    }

    const onSubmit = async (data) => {
        console.log("data", data);
        const toastId = toastLoading("Creando sucursal")
        try {
            const sucursal = await createShipmentLocal(data)
            return toastSuccess(<>Sucursal creada: <strong>'{sucursal.province}'</strong> - id: <strong>'{sucursal.id}'</strong></>, toastId)
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
                                        <p className='col-12 mb-2 text-center fw-semibold textGray-Custom fontSM-Custom'>Tu sucursal</p>
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
                                            {/* LOCALITY */}
                                            <div className="d-flex flex-column mb-3">
                                                <label htmlFor="locality" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                    Localidad
                                                </label>
                                                <input type="text" id="locality" className='form-control fontSM-Custom custom-placeholder' placeholder='La plata' {
                                                    ...register('locality', {
                                                        required: {
                                                            value: true,
                                                            message: "La 'localidad' es requerida"
                                                        },
                                                        validate: validateLocality
                                                    })
                                                } />
                                                {errors.locality && <span className='mt-1 fontXS-Custom text-danger'>{errors.locality.message} <span className='fw-semibold'>*</span></span>}
                                            </div>

                                            {/* STREET NAME */}
                                            <div className="col-6 d-flex flex-column mb-3">
                                                <label htmlFor="streetName" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                    Nombre de calle
                                                </label>
                                                <input type="text" id="streetName" className='form-control fontSM-Custom custom-placeholder' placeholder='9900' {
                                                    ...register('streetName', {
                                                        required: {
                                                            value: true,
                                                            message: "El 'nombre de la calle' es requerida"
                                                        },
                                                        validate: validateStreetName
                                                    })
                                                } />
                                                {errors.streetName && <span className='mt-1 fontXS-Custom text-danger'>{errors.streetName.message} <span className='fw-semibold'>*</span></span>}
                                            </div>

                                            {/* STREET NUMBER */}
                                            <div className="col-6 d-flex flex-column mb-3">
                                                <label htmlFor="streetNumber" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                    Número de calle
                                                </label>
                                                <input type="text" id="streetNumber" className='form-control fontSM-Custom custom-placeholder' placeholder='9900' {
                                                    ...register('streetNumber', {
                                                        required: {
                                                            value: true,
                                                            message: "El 'número' es requerida"
                                                        },
                                                        validate: validateStreetNumber
                                                    })
                                                } />
                                                {errors.streetNumber && <span className='mt-1 fontXS-Custom text-danger'>{errors.streetNumber.message} <span className='fw-semibold'>*</span></span>}
                                            </div>

                                            {/* POSTAL CODE */}
                                            <div className="col-6 d-flex flex-column mb-3">
                                                <label htmlFor="postalCode" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                    Codigo Postal
                                                </label>
                                                <input type="text" id="postalCode" className='form-control fontSM-Custom custom-placeholder' placeholder='9900' {
                                                    ...register('postalCode', {
                                                        required: {
                                                            value: true,
                                                            message: "El 'codigo postal' es requerido"
                                                        },
                                                        validate: validatePostalCode
                                                    })
                                                } />
                                                {errors.postalCode && <span className='mt-1 fontXS-Custom text-danger'>{errors.postalCode.message} <span className='fw-semibold'>*</span></span>}
                                            </div>

                                            {/* COSTO DE RETIRO */}
                                            <div className="col-6 d-flex flex-column mb-3">
                                                <label htmlFor="shipingCost" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                    Costo de retiro
                                                </label>
                                                {/* <input type="text" className='form-control fontSM-Custom custom-placeholder' placeholder='9900' {
                                                    ...register('shipingCost', {
                                                        required: {
                                                            value: true,
                                                            message: "El 'costo de retiro' es requerido"
                                                        },
                                                    })
                                                } />
                                                {errors.shipingCost && <span className='mt-1 fontXS-Custom text-danger'>{errors.shipingCost.message} <span className='fw-semibold'>*</span></span>} */}
                                                <Controller
                                                    name="shipingCost"
                                                    id="shipingCost"
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
                                                            {errors.shipingCost && <span className='mt-1 fontXS-Custom text-danger'>{errors.shipingCost.message} <span className='fw-semibold'>*</span></span>}
                                                        </>
                                                    )}
                                                />
                                            </div>
                                            
                                            {/* BTN SUBMIT */}
                                            <div className="col-12 d-flex flex-column mb-2">
                                                <button type="submit" className="btn btn-primary w-100 btn-sm fontSM-Custom">CREAR SUCURSAL</button>
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