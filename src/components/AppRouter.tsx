import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { privateRoutes, publicRoutes, RouteNames } from "../router";

const AppRouter: React.FC = () => {
    const isAuth = useTypedSelector(state => state.auth.isAuth)

    return (
        isAuth 
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route key={route.path} path={route.path} element={<route.element />} />
                )}
                <Route path="*" element={<Navigate to={RouteNames.EVENT} replace />} />
            </Routes>
            
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route key={route.path} path={route.path} element={<route.element />} />
                )}
                <Route path="*" element={<Navigate to={RouteNames.LOGIN} replace />} />
            </Routes>
    )
}

export default AppRouter;