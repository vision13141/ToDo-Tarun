import { Navigate } from "react-router-dom"
import useAuth from "./useAuth"

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {
    const isTrue = useAuth()

    return isTrue ? children : <Navigate to='/'/>
}

export default PrivateRoute
