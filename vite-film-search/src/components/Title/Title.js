import { jsx as _jsx } from "react/jsx-runtime";
import { StyledTitle } from "./styles";
export const Title = ({ option, text }) => {
    return _jsx(StyledTitle, { "$option": option, children: text });
};
