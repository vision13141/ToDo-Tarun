import { Navigate } from "react-router-dom"
import useAuth from "./useAuth"

// eslint-disable-next-line react/prop-types
const PublicRoute = ({children}) => {
    const isTrue = useAuth()

    return isTrue ? <Navigate to='/todo'/> : children
}

export default PublicRoute
