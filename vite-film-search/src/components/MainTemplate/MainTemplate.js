import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Header } from "components/Header/Header";
import { Spinner } from "components/Spinner/Spinner";
import { SideBar } from "components/SideBar/SideBar";
import { AnimatePresence } from "framer-motion";
import { useWindowSize } from "hooks";
import { Outlet } from "react-router-dom";
import { getUser, useAppSelector } from "store";
import { Content, StyledMainTemplate } from "./styles";
export const MainTemplate = () => {
    const { isLoading } = useAppSelector(getUser);
    const { width } = useWindowSize();
    if (isLoading)
        return _jsx(Spinner, {});
    return (_jsx(AnimatePresence, { children: _jsxs(StyledMainTemplate, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { ease: "easeInOut", duration: 0.5 }, exit: { opacity: 0 }, children: [width && width >= 1281 && _jsx(SideBar, {}), _jsxs(Content, { children: [_jsx(Header, {}), _jsx(Outlet, {})] })] }) }));
};
