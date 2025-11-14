import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { portalTarget } from "./portalTargets";

interface PortalProps {
  children: ReactNode;
  target: portalTarget;
}

export const Portal = ({ children, target }: PortalProps) => {
  const container = document.getElementById(target) as HTMLElement;
  return createPortal(children, container);
};
