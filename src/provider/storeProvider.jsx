import { createContext, useContext, useState, useEffect } from "react";
import toast from 'react-hot-toast';
import Cookies from "js-cookie";
import getClient from "../services/auth/getClient.js";
import verifySubdomain from "../services/auth/verifySubdomain.js";
import verifyToken from "../services/auth/verifyToken.js";
import getStoreConfig from "../services/storeConfiguration/getStoreConfig.js";
import config from "../../config.js";
import redirectSubdomain from "../utils/redirectSubdomain.js";
// import { useNavigate } from "react-router-dom";

const StoreContext = createContext()
const useStoreContext = () => useContext(StoreContext)

const { Provider } = StoreContext

export function StoreContextProvider({ children }) {
    // const navigate = useNavigate()

    const hostnameArray = window.location.hostname.split('.');
    const subdomain = hostnameArray[0];

    const [loadingConfigStore, setLoadingConfigStore] = useState(true)
    const [configStore, setConfigStore] = useState(null)


    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [toastId, setToastId] = useState(null);
    const [user, setUser] = useState({
        id: "",
        email: "",
        proyectName: ""
    })

    const verifyTokenAuth = async () => {
        console.log("validando token");
        const idToast = toastLoading("Validando token")
        try {
            const verifyData = await verifyToken()
            toastSuccess(<>Token validado, bienvenido <strong>{verifyData.proyectName}</strong>!</>, idToast)
            setUser(verifyData)
            setIsAuthenticated(true)

        } catch (error) {
            console.log("error desde storeProvider : verifyTokenAuth", error);
            toastError(`Error en validacion de token: ${error.msg}`, idToast)
        }
    }

    const getConfigStoreAuth = async () => {
        console.log("isAuthenticated: ", isAuthenticated);

        if (isAuthenticated) {
            const config = await getStoreConfig()
            console.log("config desde getConfigStoreAuth", config);

            setConfigStore(config)
            setLoadingConfigStore(false)
        }
    }

    const verifySubdomainAuth = async (sub) => {
        const idToast = toastLoading("Validando proyecto")
        try {
            const verifyData = await verifySubdomain(sub)
            console.log("subdominio verificado", verifyData);
            toastSuccess(<>Proyecto validado, bienvenido <strong>{verifyData.name} {verifyData.lastname}</strong>!</>, idToast)
            setUser(verifyData)
        } catch (error) {
            console.log("error desde verifySubdomainAuth", error);
            toastError("Proyecto inexistente", idToast)
        }
    }

    useEffect(() => {
        verifyTokenAuth()
    }, [])

    useEffect(() => {
        getConfigStoreAuth()
        // EL CODIGO DE ABAJO SE PODRIA LLEVAR CUANDO HACE EL verifyTokenAuth
        if (isAuthenticated) {
            if (subdomain !== "localhost" && subdomain !== "legacy-panel") {
                verifySubdomainAuth(subdomain);
            } else {
                // redirectSubdomain(user.subdomain)
                // navigate("/admin/productos")
            }
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (subdomain !== "localhost" && subdomain !== "legacy-panel") {
            verifySubdomainAuth(subdomain);
        }
    }, [subdomain])



    // const getClientFetch = async () => {
    //     const cookies = Cookies.get()
    //     console.log("cokieeee", cookies.access_token);
    //     if(cookies.access_token){
    //         console.log("cokieeee", cookies.access_token);
    //         try {
    //             const userr = await getClient();
    //             setUser(userr)
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    // }

    const toastStyles = {
        minWidth: window.innerWidth < 1000 ? '80%' : '480px',
        maxWidth: window.innerWidth < 1000 ? '80%' : '480px',
        fontSize: '.8rem',
    }

    const toastLoading = (msg) => {
        const id = toast.loading(
            <div>
                <p className="mb-0">{msg}</p>
            </div>,
            {
                id: toastId,
                style: toastStyles
            }
        );
        setToastId(id);
        return id;
    };

    const toastSuccess = (msg, toastId) => {
        toast.success(
            <div>
                <p className="mb-0">{msg}</p>
            </div>,
            {
                id: toastId,
            }
        );
        setToastId(null); // Clear the toastId after success
    };

    const toastError = (msg, toastId) => {
        toast.error(
            msg,
            {
                id: toastId,
            }
        );
        setToastId(null); // Clear the toastId after error
    };

    const dismissToast = () => {
        // if (toastId) {
        // toast.dismiss(toastId);
        toast.dismiss();
        setToastId(null);
        // }
    };

    const selectAll = (selected, data) => {
        if (selected) {
            console.log("data", data);
            const allSelected = data.map(item => ({
                ...item,
                selected: true
            }))

            console.log("allSelected", allSelected);
            return allSelected
        } else {
            console.log("data", data);
            const notAllSelected = data.map(item => ({
                ...item,
                selected: false
            }))

            console.log("notAllSelected", notAllSelected);
            return notAllSelected
        }
    }

    function showItemActions(idDiv) {
        const listAcciones = document.getElementById(idDiv)
        listAcciones.classList.toggle('mostrar')
    }

    function truncarTexto(texto, maxLen = 15) {
        if (texto.length > maxLen) {
            return texto.slice(0, maxLen) + '...';
        }
        return texto;
    }

    return (
        <Provider value={{ setConfigStore, loadingConfigStore, configStore, selectAll, showItemActions, truncarTexto, toastLoading, toastSuccess, toastError, dismissToast, setUser, user, setIsAuthenticated, isAuthenticated }}>
            {children}
        </Provider>
    )
}

export default useStoreContext;