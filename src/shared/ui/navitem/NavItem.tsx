// import { toggleMobileMenu } from "@/shared/redux/features/mobile-menu/mobileMenuSlice";
// import type { RoleEnum } from "@/shared/utils/types/types";
// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
// import { NavLink, useLocation } from "react-router-dom";

// // ============================================================================
// // TYPES & INTERFACES
// // ============================================================================

// interface ChildMenu {
//   id: string;
//   title?: string;
//   path?: string;
//   icon?: React.ReactNode;
//   role: RoleEnum[];
// }

// interface NavItemProps {
//   icon?: React.ReactNode;
//   title: string;
//   path: string;
//   size?: "sm" | "md" | "lg";
//   color?: "default" | "danger" | "white";
//   align?: "left" | "center";
//   fontWeight?: "regular" | "medium" | "semiBold" | "bold";
//   className?: string;
//   children?: ChildMenu[];
// }

// // ============================================================================
// // CONSTANTS & CONFIGURATIONS
// // ============================================================================

// const SIZE_CLASSES = {
//   sm: "text-sm",
//   md: "text-base",
//   lg: "text-lg",
// } as const;

// const COLOR_CLASSES = {
//   default: "text-white",
//   danger: "text-red-600",
//   white: "text-white",
// } as const;

// const ALIGN_CLASSES = {
//   left: "justify-start",
//   center: "justify-center",
// } as const;

// const FONT_WEIGHT_CLASSES = {
//   regular: "font-normal",
//   medium: "font-medium",
//   semiBold: "font-semibold",
//   bold: "font-bold",
// } as const;

// const BASE_NAV_CLASSES = {
//   container:
//     "flex flex-row lg:flex-col items-center gap-1 px-4 py-4 lg:py-3 hover:bg-green-600 transition-colors border-b border-b-[#f7f7f770] lg:border-b-transparent!",
//   dropdown:
//     "lg:absolute top-full left-0 bg-green-600 min-w-48 rounded-b shadow-lg z-50",
//   dropdownItem:
//     "flex items-center gap-2 px-4 py-4 lg:py-3 hover:bg-green-700 transition-colors border-b border-green-500 last:border-b-0",
// } as const;

// // ============================================================================
// // MAIN COMPONENT
// // ============================================================================

// const NavItem: React.FC<NavItemProps> = ({
//   icon,
//   title,
//   path,
//   size = "md",
//   color = "default",
//   align = "left",
//   fontWeight = "medium",
//   className = "",
//   children = [],
// }) => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   // ==========================================================================
//   // DERIVED VALUES
//   // ==========================================================================

//   const hasChildren = children.length > 0;
//   const isParentActive = children.some(
//     (child) => child.path && location.pathname.startsWith(child.path),
//   );

//   const sizeClass = SIZE_CLASSES[size];
//   const colorClass = COLOR_CLASSES[color];
//   const alignClass = ALIGN_CLASSES[align];
//   const fontWeightClass = FONT_WEIGHT_CLASSES[fontWeight];

//   // ==========================================================================
//   // EVENT HANDLERS
//   // ==========================================================================

//   const handleDropdownToggle = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   const closeDropdown = () => {
//     setIsDropdownOpen(false);
//   };

//   const handleMobileMenuToggle = () => {
//     dispatch(toggleMobileMenu({ isToggle: false }));
//     handleDropdownToggle();
//   };

//   // ==========================================================================
//   // EFFECTS
//   // ==========================================================================

//   useEffect(() => {
//     const handleOutsideClick = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         closeDropdown();
//       }
//     };

//     if (isDropdownOpen) {
//       document.addEventListener("mousedown", handleOutsideClick);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, [isDropdownOpen]);

//   // ==========================================================================
//   // RENDER FUNCTIONS
//   // ==========================================================================

//   const renderSimpleNavLink = () => (
//     <NavLink
//       to={path}
//       onClick={handleMobileMenuToggle}
//       target={path === "https://www.dwxviewer.site/upload" ? "_blank" : "_self"}
//       className={({ isActive }) => {
//         const baseClasses = [
//           BASE_NAV_CLASSES.container,
//           alignClass,
//           sizeClass,
//           colorClass,
//           fontWeightClass,
//           className,
//         ].join(" ");

//         const activeClasses = isActive
//           ? "bg-green-700 text-white font-semibold"
//           : "";

//         return `${baseClasses} ${activeClasses}`.trim();
//       }}
//     >
//       {icon && <span className="text-lg">{icon}</span>}
//       <span className="text-2xl lg:text-sm">{title}</span>
//     </NavLink>
//   );

//   const renderDropdownItem = (child: ChildMenu) => {
//     const key = child.id || child.path || crypto.randomUUID();

//     return (
//       <NavLink
//         key={key}
//         to={child.path || ""}
//         onClick={handleMobileMenuToggle}
//         className={({ isActive }) => {
//           const baseClasses = BASE_NAV_CLASSES.dropdownItem;
//           const activeClasses = isActive ? "bg-green-800 font-semibold" : "";
//           return `${baseClasses} ${activeClasses}`.trim();
//         }}
//       >
//         {child.icon && <span className="text-sm">{child.icon}</span>}
//         <span className="text-2xl lg:text-sm">{child.title}</span>
//       </NavLink>
//     );
//   };

//   const renderDropdownNav = () => {
//     const buttonClasses = [
//       "w-full flex flex-row lg:flex-col items-center gap-1 px-4 py-3 hover:bg-green-600 text-sm font-medium",
//       isParentActive ? "bg-green-700 text-white font-semibold" : "",
//     ].join(" ");

//     return (
//       <div
//         className="relative border-b border-b-[#f7f7f770] lg:border-b-transparent"
//         onClick={(e) => e.stopPropagation()}
//         ref={dropdownRef}
//       >
//         <button
//           className={buttonClasses}
//           onClick={handleDropdownToggle}
//           aria-expanded={isDropdownOpen}
//           aria-haspopup="true"
//         >
//           {icon && <span className="text-lg">{icon}</span>}
//           {title && <span className="text-2xl lg:text-sm">{title}</span>}
//         </button>

//         {isDropdownOpen && (
//           <div
//             className={BASE_NAV_CLASSES.dropdown}
//             role="menu"
//             aria-label={`${title} submenu`}
//           >
//             {children.map(renderDropdownItem)}
//           </div>
//         )}
//       </div>
//     );
//   };

//   // ==========================================================================
//   // MAIN RENDER
//   // ==========================================================================

//   if (path && !hasChildren) {
//     return renderSimpleNavLink();
//   }

//   return renderDropdownNav();
// };

// export default NavItem;
import { toggleMobileMenu } from "@/shared/redux/features/mobile-menu/mobileMenuSlice";
import type { RoleEnum } from "@/shared/utils/types/types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import "./navItem.css";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

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

// ============================================================================
// CONSTANTS (Mapped to CSS Classes)
// ============================================================================

const SIZE_CLASSES = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
} as const;

const COLOR_CLASSES = {
  default: "text-default",
  danger: "text-danger",
  white: "text-white",
} as const;

const ALIGN_CLASSES = {
  left: "justify-start",
  center: "justify-center",
} as const;

const FONT_WEIGHT_CLASSES = {
  regular: "font-normal",
  medium: "font-medium",
  semiBold: "font-semibold",
  bold: "font-bold",
} as const;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

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
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ==========================================================================
  // DERIVED VALUES
  // ==========================================================================

  const hasChildren = children.length > 0;
  const isParentActive = children.some(
    (child) => child.path && location.pathname.startsWith(child.path),
  );

  const sizeClass = SIZE_CLASSES[size];
  const colorClass = COLOR_CLASSES[color];
  const alignClass = ALIGN_CLASSES[align];
  const fontWeightClass = FONT_WEIGHT_CLASSES[fontWeight];

  // ==========================================================================
  // EVENT HANDLERS
  // ==========================================================================

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleMobileMenuToggle = () => {
    dispatch(toggleMobileMenu({ isToggle: false }));
    handleDropdownToggle();
  };

  // ==========================================================================
  // EFFECTS
  // ==========================================================================

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

  // ==========================================================================
  // RENDER FUNCTIONS
  // ==========================================================================

  const renderSimpleNavLink = () => (
    <NavLink
      to={path}
      onClick={handleMobileMenuToggle}
      target={path === "https://www.dwxviewer.site/upload" ? "_blank" : "_self"}
      className={({ isActive }) => {
        // Base classes from CSS file
        const baseClasses = [
          "nav-item-container",
          alignClass,
          sizeClass,
          colorClass,
          fontWeightClass,
          className,
        ].join(" ");

        const activeClasses = isActive ? "active" : "";

        return `${baseClasses} ${activeClasses}`.trim();
      }}
    >
      {icon && <span className="nav-icon">{icon}</span>}
      <span className="nav-text">{title}</span>
    </NavLink>
  );

  const renderDropdownItem = (child: ChildMenu) => {
    const key = child.id || child.path || crypto.randomUUID();

    return (
      <NavLink
        key={key}
        to={child.path || ""}
        onClick={handleMobileMenuToggle}
        className={({ isActive }) =>
          `dropdown-item ${isActive ? "active" : ""}`
        }
      >
        {child.icon && <span className="dropdown-icon">{child.icon}</span>}
        <span className="nav-text">{child.title}</span>
      </NavLink>
    );
  };

  const renderDropdownNav = () => {
    // Reusing the nav-item-container style for the dropdown button
    const buttonClasses = [
      "nav-item-container",
      "w-full", // ensure width full
      isParentActive ? "active" : "",
    ].join(" ");

    return (
      <div
        className="dropdown-wrapper"
        onClick={(e) => e.stopPropagation()}
        ref={dropdownRef}
      >
        <button
          className={buttonClasses}
          onClick={handleDropdownToggle}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          type="button"
        >
          {icon && <span className="nav-icon">{icon}</span>}
          {title && <span className="nav-text">{title}</span>}
        </button>

        {isDropdownOpen && (
          <div
            className="dropdown-menu"
            role="menu"
            aria-label={`${title} submenu`}
          >
            {children.map(renderDropdownItem)}
          </div>
        )}
      </div>
    );
  };

  // ==========================================================================
  // MAIN RENDER
  // ==========================================================================

  if (path && !hasChildren) {
    return renderSimpleNavLink();
  }

  return renderDropdownNav();
};

export default NavItem;
