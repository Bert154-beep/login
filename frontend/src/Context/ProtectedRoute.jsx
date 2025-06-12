import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children, allowedRoles}){
    const { User, Loading } = useContext(AuthContext)

    if(Loading || User == null) return <div>Loading...</div>

    if(!User?.role) return <Navigate to='/403'/>

    const userRoles = User.role.trim().toLowerCase()
    const NormalizedRoles = allowedRoles.map(role => role.toLowerCase())

    if(!NormalizedRoles.includes(userRoles)){
        return <Navigate to='/403'/>
    }

    return children
    
}