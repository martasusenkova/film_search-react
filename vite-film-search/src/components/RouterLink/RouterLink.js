import { jsx as _jsx } from "react/jsx-runtime";
import { StyledLink } from "./styles";
export const RouterLink = ({ to, children }) => {
    return (_jsx(StyledLink, { to: to, relative: "route", children: children }));
};
