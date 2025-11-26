import { jsx as _jsx } from "react/jsx-runtime";
export const Icon = ({ icon, className, onClick, alt }) => {
    if (!icon)
        return null;
    if (typeof icon === "string") {
        return _jsx("img", { src: icon, className: className, onClick: onClick, alt: alt ?? "icon" });
    }
    const Comp = icon;
    return _jsx(Comp, { className: className, onClick: onClick });
};
export default Icon;
