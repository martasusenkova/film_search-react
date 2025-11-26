import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BurgerMenu } from "components/BurgerMenu/BurgerMenu";
import { FilterMenu } from "components/MenuFilter/MenuFilter";
import { Logo } from "components/Logo/Logo";
import { Profile } from "components/Profile/Profile";
import { Search } from "components/Search/Search";
import { useDebounce, useInput, useToggle, useWindowSize } from "hooks";
import { StyledHeader } from "./styles";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTE } from "router";
import { getUser, useAppSelector } from "store";
export const Header = () => {
    const { width } = useWindowSize();
    const search = useInput();
    const navigate = useNavigate();
    const debounceValue = useDebounce(search.value, 1000);
    const [isActive, toogleFilter] = useToggle();
    useEffect(() => {
        if (debounceValue)
            navigate(generatePath(ROUTE.SEARCH, { name: debounceValue }));
        //eslint-disable-next-line
    }, [debounceValue]);
    const { isAuth, name, email } = useAppSelector(getUser);
    return (_jsxs(StyledHeader, { children: [width && width <= 1280 && _jsx(Logo, {}), _jsx(Search, { ...search, onClick: toogleFilter }), width && width >= 1281 ? (_jsx(Profile, { name: name || "", email: email || "", isAuth: isAuth })) : (_jsx(BurgerMenu, {})), _jsx(AnimatePresence, { children: isActive && _jsx(FilterMenu, { toogleFilter: toogleFilter }) })] }));
};
