import { useAuth } from "@/shared/hooks";
import { NavItem } from "@/shared/ui";
import type { RoleEnum } from "@/shared/utils/types/types";
import { TopHeader } from "../top-header";
import { MENU_DATA } from "./menu";

const Header = () => {
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

  return (
    <header className="mb-4 print:hidden">
      {/* Top Header Bar */}

      <TopHeader />
      {/* Navigation Menu */}
      <nav
        className={`bg-green-500 text-white flex-col md:flex-row md:flex md:flex-wrap md:justify-center`}
      >
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
    </header>
  );
};

export default Header;
