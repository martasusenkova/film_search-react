import type { ReactNode, CSSProperties } from "react";
import { StyledLabel } from "./styles";

interface LabelProps {
  text: string;
  children?: ReactNode;
  style?: CSSProperties;
}

export const Label = ({ text, style, children }: LabelProps) => {
  return (
    <StyledLabel style={style}>
      {text}
      {children}
    </StyledLabel>
  );
};
