import { toggleMobileMenu } from "@/shared/redux/features/mobile-menu/mobileMenuSlice";
import type { RoleEnum } from "@/shared/utils/types/types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
interface ChildMenu {
  id: string;
  title?: string;
  path?: string;
  icon?: React.ReactNode;
  role: RoleEnum[];
}
interface NavItemProps {
  icon?: React.ReactNode;
  title: string;
  path: string;
  size?: "sm" | "md" | "lg";
  color?: "default" | "danger" | "white";
  align?: "left" | "center";
  fontWeight?: "regular" | "medium" | "semiBold" | "bold";
  className?: string;
  children?: ChildMenu[];
}
const NavItem: React.FC<NavItemProps> = ({
  icon,
  title,
  path,
  size = "md",
  color = "default",
  align = "left",
  fontWeight = "medium",
  className = "",
  children = [],
}) => {
  const dispatch = useDispatch();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  const handleToggleMenu = () => {
    dispatch(toggleMobileMenu({ isToggle: false }));
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  const hasChildren = children.length > 0;

  return (
    <>
      {path && !hasChildren ? (
        <NavLink
          to={path}
          onClick={handleToggleMenu}
          className={({ isActive }) =>
            `flex flex-row lg:flex-col items-center gap-1 px-4 py-3 hover:bg-green-600 transition-colors border-b border-b-[#f7f7f770] lg:border-b-transparent!
            ${alignClasses} ${sizeClasses} ${colorClasses} ${fontWeightClasses} ${className}
            ${isActive ? "bg-green-700 text-white font-semibold" : ""}`
          }
        >
          {icon && <span className="text-lg">{icon}</span>}
          <span>{title}</span>
        </NavLink>
      ) : (
        <div
          className="relative border-b border-b-[#f7f7f770] lg:border-b-transparent!"
          onClick={(e) => e.stopPropagation()}
          ref={dropdownRef}
        >
          <button
            className="flex flex-row lg:flex-col items-center gap-1 px-4 py-3 hover:bg-green-600 text-sm font-medium "
            onClick={handleDropdown}
          >
            {icon && <span className="text-lg">{icon}</span>}
            {title}
          </button>
          {hasChildren && isDropdownOpen && (
            <div className="lg:absolute top-full right-0 bg-green-600 min-w-48 rounded-b shadow-lg z-50">
              {children.map((child) => (
                <NavLink
                  key={child.id}
                  to={child.path || ""}
                  onClick={handleToggleMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-3 hover:bg-green-700 transition-colors border-b border-green-500 last:border-b-0
                    ${isActive ? "bg-green-800 font-semibold" : ""}`
                  }
                >
                  {child.icon && <span className="text-sm">{child.icon}</span>}
                  <span className="text-sm">{child.title}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NavItem;
