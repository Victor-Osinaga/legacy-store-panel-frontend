import useStoreContext from "../provider/storeProvider"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute () {
    const { user, isAuthenticated } = useStoreContext()

    if(!isAuthenticated) {
        return <Navigate to='/auth/login' replace />
    }
    return (
        <Outlet />
    )
}