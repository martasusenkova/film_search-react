import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDownIcon, ArrowRightIcon, UserIcon } from "assets";
import { Icon } from "components";
import { RouterLink } from "components";
import { AnimatePresence } from "framer-motion";
import { useToggle } from "hooks";
import { ROUTE } from "router";
import { useAppDispatch, userSignOut } from "store";
import { DropDown, DropDownItem, InnerSignIn, Name, ProfileIcon, StyledProfile } from "./styles";
export const Profile = ({ name, email, isAuth }) => {
    const dispatch = useAppDispatch();
    const [dropDownIsActive, toogleDropDown] = useToggle();
    const profileNameWords = name.split(" ");
    const handleName = () => toogleDropDown();
    const handleLogout = () => {
        dispatch(userSignOut());
        toogleDropDown();
    };
    return (_jsxs(StyledProfile, { children: [_jsx(ProfileIcon, { children: name ? `${name[0]}${profileNameWords[1][0]}` : _jsx(Icon, { icon: UserIcon }) }), isAuth ? (_jsxs(Name, { onClick: handleName, children: [name || email, " ", _jsx(Icon, { icon: ArrowDownIcon })] })) : (_jsx(RouterLink, { to: ROUTE.HOME + ROUTE.LOGIN, children: _jsxs(InnerSignIn, { children: ["Sign in ", _jsx(Icon, { icon: ArrowRightIcon })] }) })), _jsx(AnimatePresence, { children: dropDownIsActive && (_jsxs(DropDown, { initial: "collapsed", animate: "open", exit: "collapsed", variants: {
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                    }, transition: { ease: [0.04, 0.62, 0.23, 0.98] }, children: [_jsx(DropDownItem, { children: _jsx(RouterLink, { to: ROUTE.SETTINGS, children: "Edit Profile" }) }), _jsx(DropDownItem, { onClick: handleLogout, children: "Log Out" })] })) })] }));
};
