import { jsx as _jsx } from "react/jsx-runtime";
import { StyledButton } from "./styles";
export const Button = ({ text, option, onClick, type }) => {
    return (_jsx(StyledButton, { "$option": option, onClick: onClick, type: type, children: text }));
};
