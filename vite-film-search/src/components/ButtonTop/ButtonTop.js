import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { BtnIcon, BtnToTop } from "./styles";
import { ArrowUpIcon } from "assets";
import { Icon } from "components";
export const ButtonTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            }
            else {
                setShowTopBtn(false);
            }
        });
    }, []);
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (_jsxs(BtnToTop, { children: [" ", showTopBtn && (_jsx(BtnIcon, { onClick: goToTop, children: _jsx(Icon, { icon: ArrowUpIcon }) }))] }));
};
