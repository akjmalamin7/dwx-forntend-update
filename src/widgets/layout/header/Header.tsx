import LOGO from "@/assets/images/logo.png";
import { useAuth } from "@/shared/hooks";
import { NavItem, Text } from "@/shared/ui";
import type { RoleEnum } from "@/shared/utils/types/types";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MENU_DATA } from "./menu";

const Header = () => {
  const { user } = useAuth();
  console.log(user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [billDropdownOpen, setBillDropdownOpen] = useState(false);
  const [patientDropdownOpen, setPatientDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleBillDropdown = () => {
    setBillDropdownOpen((prev) => !prev);
    setPatientDropdownOpen(false); // close patient dropdown
  };

  const togglePatientDropdown = () => {
    setPatientDropdownOpen((prev) => !prev);
    setBillDropdownOpen(false); // close bill dropdown
  };

  const closeAllDropdowns = () => {
    setBillDropdownOpen(false);
    setPatientDropdownOpen(false);
  };
  if (!user) return null;

  // Filter menus based on user.role
  const filteredMenu = MENU_DATA.filter((menu) =>
    menu.role.includes(user.role as RoleEnum)
  ).map((menu) => ({
    ...menu,
    // Filter nested children too
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
          <button className="md:hidden" onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav
        className={`bg-green-500 text-white flex-col md:flex-row md:flex md:flex-wrap md:justify-center ${
          menuOpen ? "flex" : "hidden"
        } md:flex`}
        onClick={closeAllDropdowns}
      >
        {filteredMenu.map((menu) => (
          <NavItem
            key={menu.id}
            icon={menu.icon}
            label={menu.title || ""}
            to={menu.path || ""}
            size="sm"
            children={menu?.children}
          />
        ))}
        {/* <NavItem
          icon={<IoIosSend />}
          label="Send Report"
          to="/agent/patient/add"
          size="sm"
        />
        <NavItem
          icon={<IoIosSend />}
          label="Quick Send Report"
          to="/agent/patient/quick-add"
          size="sm"
        />
        <NavItem icon={<IoIosSend />} label="Waiting Report" to="/" size="sm" />
        <NavItem
          icon={<MdFileUpload />}
          label="DCM File Uploader"
          to="/upload"
          size="sm"
          color="danger"
        />
        <NavItem
          icon={<IoIosSend />}
          label="Completed Report"
          to="/agent/patient/completed"
          size="sm"
        />

        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={togglePatientDropdown}
            className="flex flex-col items-center gap-1 px-4 py-3 hover:bg-green-600 text-sm font-medium"
          >
            <IoIosSend className="text-lg" />
            <span>All Report</span>
          </button>

          {patientDropdownOpen && (
            <div className="absolute left-0 bg-white text-black shadow-md mt-1 rounded z-50 w-40">
              <Link
                to="/agent/patient/all-completed"
                className="block px-4 py-2 hover:bg-green-100 text-sm"
                onClick={() => setMenuOpen(false)}
              >
                This Month Report
              </Link>
              <Link
                to="/agent/patient/previous-month"
                className="block px-4 py-2 hover:bg-green-100 text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Previous Month
              </Link>
            </div>
          )}
        </div>

        <NavItem
          icon={<IoIosSend />}
          label="Doctor List"
          to="/agent/doctor"
          size="sm"
        />
        <NavItem
          icon={<IoIosSend />}
          label="Reference List"
          to="/agent/reference-list"
          size="sm"
        />
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={toggleBillDropdown}
            className="flex flex-col items-center gap-1 px-4 py-3 hover:bg-green-600 text-sm font-medium"
          >
            <IoIosSend className="text-lg" />
            <span>Bill</span>
          </button>

          {billDropdownOpen && (
            <div className="absolute left-0 bg-white text-black shadow-md mt-1 rounded z-50 w-40">
              <Link
                to="/agent/manage-bill"
                className="block px-4 py-2 hover:bg-green-100 text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Manage Bill
              </Link>
              <Link
                to="/agent/transection-history"
                className="block px-4 py-2 hover:bg-green-100 text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Transection History
              </Link>
            </div>
          )}
        </div>

        <NavItem
          icon={<IoIosSend />}
          label="Checked User"
          to="/agent/checked-user-list"
          size="sm"
        />
        <NavItem
          icon={<IoIosSend />}
          label="Software"
          to="/software"
          size="sm"
        /> */}
      </nav>
    </header>
  );
};

export default Header;
