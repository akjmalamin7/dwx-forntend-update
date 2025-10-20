import LOGO from "@/assets/images/logo.png";
import { useAuth } from "@/shared/hooks";
import { NavItem, Text } from "@/shared/ui";
import type { RoleEnum } from "@/shared/utils/types/types";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
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
      <div className="bg-[#0077A3] text-white flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={LOGO} alt="Digital Web X-ray" className="w-24" />
        </div>

        {/* Hotline */}
        <div className="text-sm font-semibold text-center hidden md:block">
          Hotline:{" "}
          <Link to="tel:+8801759497773" className="hover:underline">
            +880 1759497773
          </Link>
          ,{" "}
          <Link to="tel:+8801867074078" className="hover:underline">
            +880 1867074078
          </Link>
        </div>

        {/* User Info + Hamburger */}
        <div className="flex items-center space-x-4 text-sm">
          <Text element="span" className="text-white">
            UserName
          </Text>

          {/* Hamburger Button */}
          <button className="md:hidden" >
            <FaTimes size={22} /> : <FaBars size={22} />
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav
        className={`bg-green-500 text-white flex-col md:flex-row md:flex md:flex-wrap md:justify-center`}
      // onClick={closeAllDropdowns}
      >
        {filteredMenu.map((menu) => (
          <NavItem
            key={menu.id}
            icon={menu.icon}
            label={menu.title || ""}
            to={menu.path ? menu.path : ""}
            size="sm"
          />
        ))}

      </nav>
    </header>
  );
};

export default Header;
