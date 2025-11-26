import { jsx as _jsx } from "react/jsx-runtime";
import Select from "react-select";
import { selectStyles } from "./styles";
export const CustomSelect = ({ options, value, defaultValue, onChange }) => {
    return (_jsx(Select, { defaultValue: defaultValue, styles: selectStyles, options: options, value: value, isMulti: false, isSearchable: false, onChange: onChange }));
};
