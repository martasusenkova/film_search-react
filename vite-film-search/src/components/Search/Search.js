import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FilterMenuIcon, SearchInput, StyledSearch, IconImg } from "./styles";
import { SearchFilterIcon } from "assets";
export const Search = ({ onChange, value, onClick }) => {
    return (_jsxs(StyledSearch, { children: [_jsx(SearchInput, { onChange: onChange, value: value, name: "search", type: "search", placeholder: "Search" }), _jsx(FilterMenuIcon, { onClick: onClick, children: typeof SearchFilterIcon === "string" ? (_jsx(IconImg, { src: SearchFilterIcon, alt: "filter" })) : (_jsx(SearchFilterIcon, {})) })] }));
};
