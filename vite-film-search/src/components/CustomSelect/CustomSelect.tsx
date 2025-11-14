import Select from "react-select";
import type { SingleValue } from "react-select";
import { selectStyles } from "./styles";
import type { SelectOption } from "./types";

interface SelectProps {
  options: SelectOption[];
  value: SelectOption | undefined;
  defaultValue: SelectOption;
  onChange: (option: SingleValue<SelectOption> | unknown) => void;
}

export const CustomSelect = ({ options, value, defaultValue, onChange }: SelectProps) => {
  return (
    <Select
      defaultValue={defaultValue}
      styles={selectStyles}
      options={options}
      value={value}
      isMulti={false}
      isSearchable={false}
      onChange={onChange}
    />
  );
};
