import { Input } from "ui";
import styled from "styled-components";
export const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  grid-area: search;
`;

export const SearchInput = styled(Input)`
  width: 100%;
`;

export const FilterMenuIcon = styled.div`
  position: absolute;
  right: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

export const IconImg = styled.img`
  display: block;
  width: 24px;
  height: 24px;
`;
