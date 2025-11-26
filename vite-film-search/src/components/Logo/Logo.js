import { jsx as _jsx } from "react/jsx-runtime";
import { ROUTE } from "router";
import { RouterLink } from "components";
import { StyledLogo } from "./styles";
import { logoDark, logoLight } from "assets";
import { getTheme, useAppSelector } from "store";
export const Logo = () => {
    const { theme } = useAppSelector(getTheme);
    return (_jsx(RouterLink, { to: ROUTE.HOME, children: _jsx(StyledLogo, { src: theme === "dark" ? logoDark : logoLight, alt: "Pixema" }) }));
};
