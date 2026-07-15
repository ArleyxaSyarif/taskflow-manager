import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";


export default function PrivateRoute(
    {children}: {children: React.ReactNode}
){

    const token = useAuthStore(
        (state)=>state.token
    );


    if(!token){

        return <Navigate to="/login"/>

    }


    return children;

}