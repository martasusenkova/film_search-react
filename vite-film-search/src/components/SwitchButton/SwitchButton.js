import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label, StyledSwitch, Switcher } from "./styles";
export const SwitchButton = ({ onChange, checked }) => {
    return (_jsx(StyledSwitch, { children: _jsxs(Switcher, { children: [_jsx("input", { id: "switch", type: "checkbox", onChange: onChange, checked: checked }), _jsx(Label, { htmlFor: "switch" })] }) }));
};
