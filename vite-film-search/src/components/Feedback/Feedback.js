import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Title } from "components";
import { StyledFeedback, Image } from "./styles";
export const Feedback = ({ text }) => {
    return (_jsxs(StyledFeedback, { children: [_jsx(Image, {}), _jsx(Title, { option: "H3", text: text })] }));
};
