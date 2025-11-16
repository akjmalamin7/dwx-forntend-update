import LOGO from "@/assets/images/logo.png";
import { useAuth } from "@/shared/hooks";
import useLoggedOut from "@/shared/hooks/use-logged-out/useLoggedOut";
import { Button, Text } from "@/shared/ui";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
const TopHeader = () => {
  const { handleLoggedOut } = useLoggedOut();
  const { user } = useAuth();
  return (
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
        <div className="flex  gap-3">
          <Text element="span" className="text-white">
            {user?.name}
          </Text>
          <Button
            variant="text"
            className="text-white! text-semibold"
            onClick={handleLoggedOut}
          >
            Logout
          </Button>
        </div>

        {/* Hamburger Button */}
        <button className="md:hidden">
          <FaTimes size={22} /> : <FaBars size={22} />
        </button>
      </div>
    </div>
  );
};

export default TopHeader;
