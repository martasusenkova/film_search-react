import styled from "styled-components";
import { Typography } from "ui";
export const StyledTitle = styled.div `
  ${(props) => Typography[props.$option]};
`;
