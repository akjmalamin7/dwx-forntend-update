import LOGO from "@/assets/images/logo.png";
import { AppDrawer } from "@/features/app-drawer";
import { useAuth } from "@/shared/hooks";
import { toggleMobileMenu } from "@/shared/redux/features/mobile-menu/mobileMenuSlice";
import type { RootState } from "@/shared/redux/stores/stores";
import { Text } from "@/shared/ui";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const TopHeader = () => {
  const dispatch = useDispatch();
  const { isToggle } = useSelector((state: RootState) => state.mobileMenu);
  const userFromReduxStore = useSelector(
    (state: RootState) => state.auth.user?.name
  );
  const handleMobileMenu = () => {
    dispatch(toggleMobileMenu({ isToggle: !isToggle }));
  };

  const { user } = useAuth();
  const userName = userFromReduxStore ?? user?.name ?? "";
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
        <div className="flex items-center gap-3">
          <Text element="span" className="text-white text-right! ">
            {userName}
          </Text>
          <AppDrawer />
        </div>

        {/* Hamburger Button */}
        <button className="lg:hidden relative z-30" onClick={handleMobileMenu}>
          {isToggle ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>
    </div>
  );
};

export default TopHeader;
