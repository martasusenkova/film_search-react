import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Logo, Title } from "components";
import { ROUTE } from "router";
import { Body, ImageError, StyledErrorPage, StyledNavLink, Text } from "./styles";
export const ErrorPage = () => {
    return (_jsxs(StyledErrorPage, { children: [_jsx(Logo, {}), _jsx(Body, { children: _jsxs("div", { children: [_jsx(ImageError, {}), _jsx(Title, { option: "H1", text: "Lost your way?" }), _jsx(Text, { children: "Sorry, we can't find that page. You'll find loads to explore on the home page." }), _jsx(StyledNavLink, { to: ROUTE.HOME, children: "Pixema Home" })] }) })] }));
};
