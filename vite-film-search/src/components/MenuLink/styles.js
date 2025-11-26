import styled from "styled-components";
import { Color, Typography } from "ui";
import { NavLink } from "react-router-dom";
export const StyledNavLink = styled(NavLink) `
  display: flex;
  gap: 20px;
  color: ${({ $isActive }) => ($isActive ? Color.PRIMARY : Color.SECONDARY)};
  transition: 0.3s all ease-in-out;
  ${Typography.S1};
  /* Ensure icons inside .icon-wrapper inherit and cannot be overridden by inline fills */
  .icon-wrapper {
    display: inline-flex;
    align-items: center;
    svg {
      color: ${({ $isActive }) => ($isActive ? Color.PRIMARY : Color.SECONDARY)} !important;
      transition: color 0.3s ease-in-out;
    }
  }
  &:hover {
    color: ${Color.PRIMARY_LIGHT};
    path {
      fill: ${Color.PRIMARY_LIGHT};
    }
  }
  &:disabled {
    color: ${Color.GRAPHITE};
    path {
      fill: ${Color.GRAPHITE};
    }
  }
`;
