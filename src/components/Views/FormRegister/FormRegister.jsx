import './formRegister.css'
import logo from '../../../assets/react.svg'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useStoreContext from '../../../provider/storeProvider';
import registerClient from '../../../services/auth/registerClient.js';
import { validatePassword, validateEmail, validateProyectName, validateName, validateLastname, validateSubdomain } from '../../../validators/validators.js';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import redirectSubdomain from '../../../utils/redirectSubdomain.js';

export default function FormRegister() {
    const navigate = useNavigate();
    const { toastLoading, toastSuccess, toastError, dismissToast, isAuthenticated } = useStoreContext()
    const { register, handleSubmit, formState: { errors }, watch, reset, getValues, control, setValue } = useForm({
        emai: "",
        password: "",
        proyectName: ""
    })

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/admin/productos");
        }
    }, [isAuthenticated])

    const onSubmit = async (data) => {
        console.log("data desde register", data);
        const toastId = toastLoading("Verificando...")
        try {
            const response = await registerClient(data)
            console.log("desde componente register", response);
            console.log("desde componente", response);
            toastSuccess(<>!Proyecto creado <strong>{response.proyectName}</strong>!</>, toastId)
            setTimeout(() => {
                // redirectSubdomain(response.subdomain)
                navigate("/admin/productos")
            }, 3000);
        } catch (error) {
            toastError(
                <div className='text-center'><p className='mb-0'><strong>{error.msg}</strong></p></div>,
                toastId
            )
        }
    }

    return (
        <>
            <section id="login">
                <div className="div1"></div>
                <div className="div2"></div>
                {/* <div className="div3"></div> */}
                <div className="main rounded d-flex">
                    <div className="main_left flex-column justify-content-center align-items-center text-white">
                        <h3>LEGACY STORE</h3>
                        <img src={logo} className="bg-white img-fluid rounded" alt="legacy company logo" />
                    </div>

                    <div className="main_right col-12 col-md-7">

                        <form onSubmit={handleSubmit(onSubmit)} className='formLogin px-5 py-3 d-flex flex-column justify-content-center align-items-center'>
                            <h3 className="glitchLogin text-center" data-text="Crear cuenta">Crear cuenta</h3>

                            {/* EMAIL */}
                            <div className="form-group w-100 d-flex flex-column mb-3">
                                <label className='mb-1' htmlFor="nombreUsuario"><b>E-mail</b></label>
                                <input id="nombreUsuario" type="email" name="nombreUsuario"
                                    placeholder="john_doe@email.com"
                                    className='form-control fontSM-Custom custom-placeholder inputStyles'
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: "El 'email' es requerido"
                                        },
                                        validate: validateEmail
                                    })}
                                />
                                {errors.email && <span className='mt-1 fontXS-Custom text-danger'>{errors.email.message} <span className='fw-semibold'>*</span></span>}
                            </div>

                            {/* PASSWORD */}
                            <div className="form-group w-100 d-flex flex-column mb-3">
                                <label className='mb-1' htmlFor="password"><b>Contraseña</b></label>
                                <input id="password" type="password" name="password"
                                    placeholder="Tu contraseña..."
                                    className='form-control fontSM-Custom custom-placeholder inputStyles'
                                    {...register('password', {
                                        required: {
                                            value: true,
                                            message: "El 'password' es requerido"
                                        },
                                        validate: validatePassword
                                    })}
                                />
                                {errors.password && <span className='mt-1 fontXS-Custom text-danger'>{errors.password.message} <span className='fw-semibold'>*</span></span>}
                            </div>

                            {/* NAME */}
                            <div className="form-group w-100 d-flex flex-column mb-3">
                                <label className='mb-1' htmlFor="name"><b>Nombre</b></label>
                                <input id="name" type="text" name="name"
                                    placeholder="Jhon"
                                    className='form-control fontSM-Custom custom-placeholder inputStyles'
                                    {...register('name', {
                                        required: {
                                            value: true,
                                            message: "El 'name' es requerido"
                                        },
                                        validate: validateName
                                    })}
                                />
                                {errors.name && <span className='mt-1 fontXS-Custom text-danger'>{errors.name.message} <span className='fw-semibold'>*</span></span>}
                            </div>

                            {/* APELLIDO */}
                            <div className="form-group w-100 d-flex flex-column mb-3">
                                <label className='mb-1' htmlFor="lastname"><b>Apellido</b></label>
                                <input id="lastname" type="text" name="lastname"
                                    placeholder="Doe"
                                    className='form-control fontSM-Custom custom-placeholder inputStyles'
                                    {...register('lastname', {
                                        required: {
                                            value: true,
                                            message: "El 'lastname' es requerido"
                                        },
                                        validate: validateLastname
                                    })}
                                />
                                {errors.lastname && <span className='mt-1 fontXS-Custom text-danger'>{errors.lastname.message} <span className='fw-semibold'>*</span></span>}
                            </div>

                            {/* PROYECTNAME */}
                            <div className="form-group w-100 d-flex flex-column mb-3">
                                <label className='mb-1' htmlFor="proyectName"><b>Nombre del proyecto</b></label>
                                <input id="proyectName" type="text" name="proyectName"
                                    placeholder="mitienda"
                                    className='form-control fontSM-Custom custom-placeholder inputStyles'
                                    {...register('proyectName', {
                                        required: {
                                            value: true,
                                            message: "El 'proyectName' es requerido"
                                        },
                                        validate: validateProyectName
                                    })}
                                />
                                {errors.proyectName && <span className='mt-1 fontXS-Custom text-danger'>{errors.proyectName.message} <span className='fw-semibold'>*</span></span>}
                            </div>

                            {/* SUBDOMAIN */}
                            <div className="form-group w-100 d-flex flex-column mb-3">
                                <label className='mb-1' htmlFor="subdomain"><b>Subdominio</b></label>
                                <div className='d-flex justify-content-center align-items-center gap-2'>
                                    <input id="subdomain" type="text" name="subdomain"
                                        placeholder="mitienda"
                                        className='form-control fontSM-Custom custom-placeholder inputStyles'
                                        {...register('subdomain', {
                                            required: {
                                                value: true,
                                                message: "El 'subdomain' es requerido"
                                            },
                                            validate: validateSubdomain
                                        })}
                                    />
                                    <span className='fw-bold'>.legacystore.vercel.app</span>
                                </div>
                                {errors.subdomain && <span className='mt-1 fontXS-Custom text-danger'>{errors.subdomain.message} <span className='fw-semibold'>*</span></span>}
                            </div>

                            <button className="btnLogin rounded mb-3" type="submit" value="Submit">
                                <b>REGISTRARME</b>
                            </button>

                            <Link to={'/auth/login'} className='linkNotAccount fw-bold'>
                                ¿Ya tienes una cuenta? - INICIAR SESION
                            </Link>
                            {/* <button type="submit" className="btn btn-primary w-100 btn-sm fontSM-Custom">INICIAR</button> */}
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}