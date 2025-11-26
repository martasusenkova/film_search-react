import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledAuthTemplate, Content, Copyright } from "./styles";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner, Logo } from "components";
import { getUser, useAppSelector } from "store";
import { ROUTE } from "router";
import { AnimatePresence } from "framer-motion";
export const AuthTemplate = () => {
    const { name, isLoading } = useAppSelector(getUser);
    if (isLoading)
        return _jsx(Spinner, {});
    if (name) {
        return _jsx(Navigate, { to: ROUTE.HOME });
    }
    return (_jsx(AnimatePresence, { children: _jsxs(StyledAuthTemplate, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { ease: "easeInOut", duration: 0.5 }, exit: { opacity: 0 }, children: [_jsx(Logo, {}), _jsx(Content, { children: _jsx(AnimatePresence, { children: _jsx(Outlet, {}) }) }), _jsx(Copyright, { children: "\u00A9 All Rights Reserved" })] }) }));
};
