import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTE } from "router";
import { getUser, useAppSelector } from "store";
export const AuthRequiredTemplate = () => {
    const { isAuth } = useAppSelector(getUser);
    const location = useLocation();
    return isAuth ? _jsx(Outlet, {}) : _jsx(Navigate, { to: ROUTE.LOGIN, state: { from: location }, replace: true });
};
