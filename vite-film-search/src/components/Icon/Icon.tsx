import React from "react";

type IconSource = React.ComponentType<React.SVGProps<SVGSVGElement>> | string;

interface IconProps {
  icon: IconSource;
  className?: string;
  onClick?: () => void;
  alt?: string;
}

export const Icon = ({ icon, className, onClick, alt }: IconProps) => {
  if (!icon) return null;
  if (typeof icon === "string") {
    return <img src={icon} className={className} onClick={onClick} alt={alt ?? "icon"} />;
  }
  const Comp = icon as React.ComponentType<React.SVGProps<SVGSVGElement>>;
  return <Comp className={className} onClick={onClick} />;
};

export default Icon;
