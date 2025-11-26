import styled from "styled-components";
import { Color, Media, Typography } from "ui";
export const StyledButton = styled.button `
  align-self: center;
  border-radius: 10px;
  border: none;
  padding: 15px 50px 15px;
  background-color: ${(props) => props.$option === "primary" ? Color.PRIMARY : Color.GRAPHITE};
  color: ${Color.WHITE};
  transition: 0.3s all ease-in-out;
  ${Typography.S3};
  ${Media.SM} {
    width: 100%;
  }

  &:hover {
    background-color: ${(props) => props.$option === "primary" && Color.PRIMARY_LIGHT};
    color: ${(props) => props.$option === "secondary" && Color.LIGHT};
    cursor: pointer;
  }
  &:disabled {
    background-color: ${Color.SECONDARY};
    color: ${Color.LIGHT};
  }
`;
