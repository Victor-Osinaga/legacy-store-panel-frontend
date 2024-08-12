import './formLogin.css'
import logo from '../../../assets/react.svg'
import { Link } from 'react-router-dom'
import useStoreContext from '../../../provider/storeProvider.jsx';
import { useForm } from 'react-hook-form';
import login from '../../../services/auth/login.js';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import config from '../../../../config.js';

export default function FormLogin() {
    const navigate = useNavigate();
    const { toastLoading, toastSuccess, toastError, dismissToast, setUser, user, setIsAuthenticated, isAuthenticated } = useStoreContext()
    const { register, handleSubmit, formState: { errors }, watch, reset, getValues, control, setValue } = useForm({
        emai: "",
        password: ""
    })

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/admin/productos");
        }
    }, [isAuthenticated])


    const onSubmit = async (data) => {
        console.log("data desde login", data);
        const toastId = toastLoading("Verificando...")
        try {
            const response = await login(data)
            toastSuccess(<>¡Bienvenid@ <strong>{response.name} {response.lastname}</strong>! ¿Cómo has estado?</>, toastId)
            setTimeout(() => {
                console.log("sesion iniciada", response);
                setUser(response)
                setIsAuthenticated(true)
                if (config.env == 'dev') {
                    const urlClient = `http://${response.subdomain}.${config.front_panel_url_dev}/admin/productos`
                    window.location.href = urlClient;
                }else{
                    const urlClient = `https://${response.subdomain}.${config.front_panel_url_prod}/admin/productos`
                    window.location.href = urlClient;
                }
                // window.history.pushState({}, '', urlClient);
                // navigate(urlClient);
            }, 3000);
        } catch (error) {
            toastError(
                <div className='text-center'><p className='mb-0'><strong>{error.msg}</strong></p></div>,
                toastId
            )
        }
    }
    return (
        <section id="login">
            <div className="div1"></div>
            <div className="div2"></div>
            {/* <div className="div3"></div> */}
            <div className="main rounded d-flex">
                <div className="main_left flex-column justify-content-center align-items-center text-white">
                    {user.proyectName ? (
                        <h3>{user.proyectName}</h3>
                    ) : (
                        <h3>LEGACY STORE</h3>
                    )}
                    <img src={logo} className="bg-white img-fluid rounded" alt="legacy company logo" />
                </div>

                <div className="main_right col-12 col-md-7">

                    <form onSubmit={handleSubmit(onSubmit)} className='formLogin px-5 d-flex flex-column justify-content-center align-items-center'>
                        <h3 className="glitchLogin text-center" data-text="Iniciar sesion">Iniciar sesion</h3>
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
                                })}
                            />
                            {errors.email && <span className='mt-1 fontXS-Custom text-danger'>{errors.email.message} <span className='fw-semibold'>*</span></span>}
                        </div>
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
                                })}
                            />
                            {errors.password && <span className='mt-1 fontXS-Custom text-danger'>{errors.password.message} <span className='fw-semibold'>*</span></span>}
                        </div>
                        <button className="btnLogin rounded mb-3" type="submit" value="Submit">
                            <b>INICIAR SESION</b>
                        </button>

                        <Link to={'/auth/register'} className='linkNotAccount fw-bold'>
                            ¿No tienes una cuenta? - REGISTRARME
                        </Link>
                        {/* <button type="submit" className="btn btn-primary w-100 btn-sm fontSM-Custom">INICIAR</button> */}
                    </form>
                </div>
            </div>
        </section>
    )
}