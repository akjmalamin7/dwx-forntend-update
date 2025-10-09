import React from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  to: string;
  size?: "sm" | "md" | "lg";
  color?: "default" | "danger" | "white";
  align?: "left" | "center";
  fontWeight?: "regular" | "medium" | "semiBold" | "bold";
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  to,
  size = "md",
  color = "default",
  align = "left",
  fontWeight = "medium",
  className = "",
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }[size];

  const colorClasses = {
    default: "text-white",
    danger: "text-red-600",
    white: "text-white",
  }[color];

  const alignClasses = {
    left: "justify-start",
    center: "justify-center",
  }[align];

  const fontWeightClasses = {
    regular: "font-normal",
    medium: "font-medium",
    semiBold: "font-semibold",
    bold: "font-bold",
  }[fontWeight];

  return (
     <NavLink
        to={to}
        className={({ isActive }) =>
            `flex flex-col items-center gap-1 px-4 py-3 hover:bg-green-600 transition-colors
            ${alignClasses} ${sizeClasses} ${colorClasses} ${fontWeightClasses} ${className}
            ${isActive ? "bg-green-700 text-white font-semibold" : ""}`
        }
        >
        {icon && <span className="text-lg">{icon}</span>}
        <span>{label}</span>
        </NavLink>
  );
};

export default NavItem;
