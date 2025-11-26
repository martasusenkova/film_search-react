import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { BookMarkIcon, FireIcon, HomeIcon, LogoutIcon, SettingsIcon, SignInIcon } from "assets";
import { Icon } from "components";
import { MenuLink } from "components";
import { ROUTE } from "router";
import { LogoutWrapper, StyledMenuNav } from "./styles";
import { getUser, useAppDispatch, useAppSelector, userSignOut } from "store";
export const MenuNav = ({ burger }) => {
    const { isAuth } = useAppSelector(getUser);
    const dispatch = useAppDispatch();
    const handleLogout = () => dispatch(userSignOut());
    return (_jsxs(StyledMenuNav, { children: [_jsx(MenuLink, { title: "Home", to: ROUTE.HOME, children: _jsx(Icon, { icon: HomeIcon }) }), _jsx(MenuLink, { title: "Trends", to: ROUTE.HOME + ROUTE.TRENDS, children: _jsx(Icon, { icon: FireIcon }) }), isAuth && (_jsxs(_Fragment, { children: [_jsx(MenuLink, { title: "Favorites", to: ROUTE.HOME + ROUTE.FAVORITES, children: _jsx(Icon, { icon: BookMarkIcon }) }), _jsx(MenuLink, { title: "Settings", to: ROUTE.HOME + ROUTE.SETTINGS, children: _jsx(Icon, { icon: SettingsIcon }) }), burger && (_jsxs(LogoutWrapper, { onClick: handleLogout, children: [_jsx(Icon, { icon: LogoutIcon }), "Logout"] }))] })), burger && !isAuth && (_jsx(MenuLink, { title: "Sign in", to: ROUTE.HOME + ROUTE.LOGIN, children: _jsx(Icon, { icon: SignInIcon }) }))] }));
};
