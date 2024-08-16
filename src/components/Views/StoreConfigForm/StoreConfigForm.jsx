
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import useStoreContext from "../../../provider/storeProvider.jsx"
import { validateStoreConfigurationName, validateStoreConfigurationPrimaryColor } from "../../../validators/validators.js"
import createStoreConfiguration from "../../../services/storeConfiguration/createStoreConfiguration.js"
import getStoreConfig from "../../../services/storeConfiguration/getStoreConfig.js"
import updateStoreConfiguration from "../../../services/storeConfiguration/updateStoreConfiguration.js"
import mplogo from "../../../assets/mp.svg"
import MpSvg from "../../Icons/MpSvg/MpSvg.jsx"

export default function StoreConfigForm() {
    const { toastLoading, toastSuccess, toastError, dismissToast, setConfigStore } = useStoreContext()
    const { reset, register, handleSubmit, formState: { errors }, control, getValues, setValue, watch } = useForm({
        defaultValues: {
            id: "",
            storeConfigName: "",
            primaryColorStore: "",
            apiKeyMp: ""
        }
    })

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch()
        return () => {
            dismissToast()
        };
    }, [])

    const fetch = async () => {
        const id = toastLoading("Cargando...")
        try {
            const config = await getStoreConfig()
            // const currentValues = getValues()

            setTimeout(() => {
                // si const productos esta fuera del try no toma el valor para el condicional de abajo
                setLoading(false)
                reset(config);
                return toastSuccess(`Completo ${config.id}`, id)
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
        const toastId = toastLoading("Guardando Configuracion")
        try {
            const configStore = await updateStoreConfiguration(getValues('id'), data)
            console.log("configStore", configStore);

            reset(configStore);
            setConfigStore(configStore)
            return toastSuccess(<>Configuracion actualizada: <strong>'{configStore.storeConfigName}'</strong> - id: <strong>'{configStore.id}'</strong></>, toastId)
        } catch (error) {
            console.log("error desde componente ", error);

            toastError(
                <div className='text-center'>
                    <span>{error.msg}</span>
                </div>,
                toastId
            )
        }
    }

    watch()

    return (
        <>
            <section className='containerViewMain'>
                <div className='d-flex justify-content-between align-items-center w-100'>
                    <div>
                        <h3 className='fs-4 mainTitle'>Configuracion de tu tienda</h3>
                    </div>
                </div>

                {/* ESPACIADOR */}
                <div className='btnActionMainsContainer mb-2'></div>

                {!loading ? (
                    <div className="container-fluid p-0">
                        <div className="row justify-content-between p-2 p-md-0 m-0">
                            <div className="col-12 col-md-7 p-0 pe-md-3 mb-3 mb-md-0">
                                <form onSubmit={handleSubmit(onSubmit)} className='bg-white border px-4 py-4 rounded'>
                                    {/* storeConfigName */}
                                    <div className="row mb-3">
                                        <p className='col-12 mb-2 text-center fw-semibold textGray-Custom fontSM-Custom'>NOMBRE</p>
                                        <div className='row rounded border col-12 p-0 py-2 mx-auto'>
                                            <div className='d-flex flex-column mb-2'>
                                                <label htmlFor="nombre" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                    Nombre de la configuracion
                                                </label>
                                                <input type="text" className='form-control fontSM-Custom custom-placeholder' placeholder='Estilos 1' {
                                                    ...register('storeConfigName', {
                                                        required: {
                                                            value: true,
                                                            message: "El 'storeConfigName' es requerido"
                                                        },
                                                        validate: validateStoreConfigurationName
                                                    })
                                                } />
                                                {errors.storeConfigName && <span className='mt-1 fontXS-Custom text-danger'>{errors.storeConfigName.message} <span className='fw-semibold'>*</span></span>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* primaryColorStore */}
                                    <div className="row mb-3">
                                        <p className='col-12 mb-2 text-center fw-semibold textGray-Custom fontSM-Custom'>COLORES</p>
                                        <div className='row rounded border col-12 p-0 py-2 mx-auto'>
                                            <div className='d-flex flex-column mb-2'>
                                                <label htmlFor="nombre" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                    Color primario de mi tienda
                                                </label>

                                                <div className="d-flex gap-3 align-items-center">
                                                    <input type="color" className="form-control h-100 form-control-sm form-control-color" id="exampleColorInput" title="Elige un color" {
                                                        ...register(`primaryColorStore`, {
                                                            required: {
                                                                value: true,
                                                                message: "El 'primaryColorStore' es requerido"
                                                            },
                                                            validate: validateStoreConfigurationPrimaryColor
                                                        })
                                                    } />
                                                    {<span>{watch('primaryColorStore')}</span>}
                                                </div>
                                                {errors.primaryColorStore && <span className='mt-1 fontXS-Custom text-danger'>{errors.primaryColorStore.message} <span className='fw-semibold'>*</span></span>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* apiKeyMp */}
                                    <div className="row mb-3">
                                        <p className='col-12 mb-2 text-center fw-semibold textGray-Custom fontSM-Custom '>MERCADO PAGO <MpSvg /></p>
                                        <div className='row rounded border col-12 p-0 py-2 mx-auto'>
                                            <div className='d-flex flex-column mb-2'>
                                                <label htmlFor="nombre" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                    Api key Mercado Pago
                                                </label>
                                                <input type="text" className='form-control fontSM-Custom custom-placeholder' placeholder="APP_USR-31431324123-532432-bh11ncjasd12-3987563" {
                                                    ...register('apiKeyMp', {
                                                        required: {
                                                            value: true,
                                                            message: "El 'storeConfigName' es requerido"
                                                        },
                                                        validate: validateStoreConfigurationName
                                                    })
                                                } />
                                                {errors.storeConfigName && <span className='mt-1 fontXS-Custom text-danger'>{errors.storeConfigName.message} <span className='fw-semibold'>*</span></span>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* apiKeyMp */}
                                    <div className="row mb-3">
                                        <p className='col-12 mb-2 text-center fw-semibold textGray-Custom fontSM-Custom '>
                                            MENSAJES ROTATITIVOS (BANNER 1)
                                        </p>
                                        <div className='row rounded border col-12 p-0 py-2 mx-auto'>
                                            <div className='d-flex flex-column mb-2'>
                                                <label htmlFor="nombre" className='d-flex mb-1 fw-semibold textGray-Custom fontSM-Custom'>
                                                    Texto 1
                                                </label>
                                                <input type="text" className='form-control fontSM-Custom custom-placeholder' placeholder="APP_USR-31431324123-532432-bh11ncjasd12-3987563" {
                                                    ...register('dinamicMessages', {
                                                        required: {
                                                            value: true,
                                                            message: "El 'storeConfigName' es requerido"
                                                        },
                                                        validate: validateStoreConfigurationName
                                                    })
                                                } />
                                                {errors.storeConfigName && <span className='mt-1 fontXS-Custom text-danger'>{errors.storeConfigName.message} <span className='fw-semibold'>*</span></span>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* BTN CREAR CATEGORIA */}
                                    <div className='row'>
                                        <div className='row col-12 p-0 py-2 mx-auto'>
                                            <button type="submit" className="btn btn-primary w-100 btn-sm fontSM-Custom">GUARDAR</button>
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