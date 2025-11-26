import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledSideBar, Copyright } from "./styles";
import { Logo, MenuNav } from "components";
export const SideBar = () => {
    return (_jsxs(StyledSideBar, { children: [_jsx(Logo, {}), _jsx(MenuNav, {}), _jsx(Copyright, { children: "\u00A9 All Rights Reserved" })] }));
};
