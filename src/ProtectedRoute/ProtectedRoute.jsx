import useStoreContext from "../provider/storeProvider"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute() {
    const { user, isAuthenticated } = useStoreContext()

    if (!isAuthenticated) {
        return (
            <>
                {console.log("Acceso a rutas protegidas DENEGADO")}
                <Navigate to='/auth/login' replace />
            </>
        )
    }
    return (
        <>
            {console.log("Acceso a rutas protegidas")}
            <Outlet />
        </>
    )
}