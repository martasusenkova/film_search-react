import type { ReactNode } from "react";
import { StyledLabel } from "./styles";
import type { CSSObject } from "styled-components";

interface LabelProps {
  text: string;
  children: ReactNode;
  style?: CSSObject;
}

export const Label = ({ text, style, children }: LabelProps) => {
  return (
    <StyledLabel style={style}>
      {text}
      {children}
    </StyledLabel>
  );
};
