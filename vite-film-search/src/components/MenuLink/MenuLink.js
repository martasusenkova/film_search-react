import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMatch } from "react-router-dom";
import { StyledNavLink } from "./styles";
export const MenuLink = ({ children, title, to }) => {
    const isActive = useMatch(to);
    return (_jsxs(StyledNavLink, { to: to, "$isActive": isActive, children: [_jsx("span", { className: "icon-wrapper", children: children }), title] }));
};
