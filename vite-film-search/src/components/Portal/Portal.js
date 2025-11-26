import { createPortal } from "react-dom";
export const Portal = ({ children, target }) => {
    const container = document.getElementById(target);
    return createPortal(children, container);
};
