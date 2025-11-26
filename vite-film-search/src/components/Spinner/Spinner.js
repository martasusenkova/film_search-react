import { jsx as _jsx } from "react/jsx-runtime";
import { Loader, StyledSpinner } from "./styles";
export const Spinner = () => {
    return (_jsx(StyledSpinner, { children: _jsx(Loader, {}) }));
};
