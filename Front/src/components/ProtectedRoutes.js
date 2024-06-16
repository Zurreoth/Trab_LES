import { Outlet, Navigate } from "react-router-dom";
import Login from "../app/login/page";
import { useState } from "react";

const ProtectedRoutes = () => {
    const [user, setUser] = useState(null)

    function onLogin(res) {
        setUser(res)
        console.log(res)
    }

    return user ? <Outlet/> : <Login onLogin={onLogin}/>
}

export default ProtectedRoutes;