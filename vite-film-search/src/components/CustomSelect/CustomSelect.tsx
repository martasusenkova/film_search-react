import Select from "react-select";
import type { SingleValue } from "react-select";
import { selectStyles } from "./styles";
import type { SelectOption } from "./types";

interface SelectProps {
  options: SelectOption[];
  value?: SelectOption | null;
  defaultValue?: SelectOption | null;
  onChange?: (option: SingleValue<SelectOption>) => void;
  isDisabled?: boolean;
  placeholder?: string;
  menuPlacement?: "auto" | "top" | "bottom";
}

export const CustomSelect = ({
  options = [],
  value,
  defaultValue,
  onChange,
  isDisabled = false,
  menuPlacement = "auto",
}: SelectProps) => {
  const handleChange = (newValue: unknown) => {
    onChange?.(newValue as SingleValue<SelectOption>);
  };

  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      options={options}
      styles={selectStyles}
      isMulti={false}
      isSearchable={false}
      onChange={handleChange}
      isDisabled={isDisabled}
      menuPosition="absolute"
      menuPlacement={menuPlacement}
    />
  );
};
