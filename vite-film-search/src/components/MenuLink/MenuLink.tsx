import type { ReactNode } from "react";
import { useMatch } from "react-router-dom";
import { StyledNavLink } from "./styles";

interface MenuLinkProps {
  title: string;
  to: string;
  children?: ReactNode;
}

export const MenuLink = ({ children, title, to }: MenuLinkProps) => {
  const isActive = useMatch(to);
  return (
    <StyledNavLink to={to} $isActive={isActive}>
      <span className="icon-wrapper">{children}</span>
      {title}
    </StyledNavLink>
  );
};
