import { useAuth } from "@/shared/hooks";
import type { RootState } from "@/shared/redux/stores/stores";
import { NavItem } from "@/shared/ui";
import type { RoleEnum } from "@/shared/utils/types/types";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { TopHeader } from "../top-header";
import { MENU_DATA } from "./menu";

const Header = () => {
  const { isToggle } = useSelector((state: RootState) => state.mobileMenu);
  const { user } = useAuth();

  if (!user) return null;

  const filteredMenu = MENU_DATA.filter((menu) =>
    menu.role.includes(user.role as RoleEnum)
  ).map((menu) => ({
    ...menu,
    children: menu.children?.filter((child) =>
      child.role.includes(user.role as RoleEnum)
    ),
  }));

  const headerClasses = `
  bg-green-500 headerMain text-white flex-col lg:flex-row lg:flex lg:flex-wrap lg:justify-center
  fixed lg:relative w-[400px] lg:w-full h-full lg:h-auto top-0 z-[9999]  
  transition-all duration-300 ease-in-out
  ${isToggle ? "left-0" : "-left-[100%]"}
  lg:left-0  
`;


  return (
    <header className="mb-4 print:hidden">
      {/* Top Header Bar */}

      <TopHeader />
      {/* Navigation Menu */}
      <nav className={headerClasses}>
        {filteredMenu.map((menu) => (
          <NavItem
            key={menu.id}
            icon={menu.icon}
            title={menu.title || ""}
            path={menu.path ? menu.path : ""}
            size="sm"
            children={menu.children || []}
          />
        ))}
      </nav>
      {isToggle &&
        createPortal(
          <div
            className={`fixed w-full h-full top-0 left-0 z-20 bg-black/60
        transition-opacity duration-300
        ${isToggle ? "opacity-100 lg:opacity-0 lg:hidden" : "opacity-0"}
      `}
          />,
          document.body
        )}
    </header>
  );
};

export default Header;
