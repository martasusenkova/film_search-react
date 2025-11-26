import { jsx as _jsx } from "react/jsx-runtime";
import { Portal, portalTarget } from "components";
import { ToastContainer } from "react-toastify";
import { getTheme, useAppSelector } from "store";
export const Toast = () => {
    const { theme } = useAppSelector(getTheme);
    return (_jsx(Portal, { target: portalTarget.TOAST, children: _jsx(ToastContainer, { position: "bottom-right", autoClose: 3000, hideProgressBar: false, newestOnTop: false, closeOnClick: true, rtl: false, pauseOnFocusLoss: false, draggable: false, pauseOnHover: true, theme: theme }) }));
};
