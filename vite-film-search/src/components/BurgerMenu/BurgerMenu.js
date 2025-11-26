import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useToggle } from "hooks";
import { Background, Burger, Menu, MenuHeader, StyledBurgerMenu } from "./styles";
import { BurgerIcon, CrossIcon } from "assets";
import { Icon } from "components";
import { MenuNav, Portal, Title } from "components";
import { portalTarget } from "components";
import { AnimatePresence } from "framer-motion";
export const BurgerMenu = () => {
    const [isActive, toogleBurger] = useToggle();
    const handleCross = () => toogleBurger();
    const handleBackground = () => toogleBurger();
    return (_jsxs(_Fragment, { children: [_jsx(Burger, { onClick: toogleBurger, children: isActive ? _jsx(Icon, { icon: CrossIcon }) : _jsx(Icon, { icon: BurgerIcon }) }), _jsx(AnimatePresence, { children: isActive && (_jsx(Portal, { target: portalTarget.BURGER_MENU, children: _jsxs(StyledBurgerMenu, { children: [_jsx(Background, { onClick: handleBackground, initial: { opacity: 0 }, animate: { opacity: 0.5 }, exit: { opacity: 0 }, transition: { ease: "easeInOut" } }), _jsxs(Menu, { initial: { x: 1000, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { ease: "easeInOut" }, exit: { x: 1000, opacity: 0 }, children: [_jsxs(MenuHeader, { children: [_jsx(Title, { option: "H3", text: "Menu" }), _jsx(Icon, { icon: CrossIcon, onClick: handleCross })] }), _jsx(MenuNav, { burger: true })] })] }) })) })] }));
};
