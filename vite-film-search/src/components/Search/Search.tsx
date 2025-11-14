import type { ChangeEvent } from "react";
import { FilterMenuIcon, SearchInput, StyledSearch, IconImg } from "./styles";
import { SearchFilterIcon } from "assets";

interface SearchProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onClick: () => void;
}

export const Search = ({ onChange, value, onClick }: SearchProps) => {
  return (
    <StyledSearch>
      <SearchInput
        onChange={onChange}
        value={value}
        name="search"
        type="search"
        placeholder="Search"
      />
      <FilterMenuIcon onClick={onClick}>
        {typeof SearchFilterIcon === "string" ? (
          <IconImg src={SearchFilterIcon} alt="filter" />
        ) : (
          <SearchFilterIcon />
        )}
      </FilterMenuIcon>
    </StyledSearch>
  );
};
