import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
    const { isUserAuth } = useSelector((state) => state.user);

    if (!isUserAuth) {
        console.log("Failed to login ");
        return;
    }

    return isUserAuth && <Outlet />;
};