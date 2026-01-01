import { useAuth } from "@/shared/hooks";
import type { RootState } from "@/shared/redux/stores/stores";
import { Button, Text } from "@/shared/ui";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import useLoggedOut from "../model/useLoggedOut";

const AppDrawer = () => {
  const { handleLoggedOut } = useLoggedOut();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
    width: number;
  }>({
    top: -300,
    left: -300,
    width: 0,
  });
  const userFromReduxStore = useSelector((state: RootState) => state.auth.user);
  const { user } = useAuth();
  const userName = userFromReduxStore?.name ?? user?.name ?? "";
  const email = user?.email ?? userFromReduxStore?.email ?? "";
  const role = user?.role ?? userFromReduxStore?.role ?? "";
  const calculateMenuPosition = () => {
    if (!buttonRef.current || !dropdownRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const vh = window.innerHeight;

    const spaceBelow = vh - buttonRect.bottom;
    const placeBelow = spaceBelow >= dropdownRect.height;

    const top = placeBelow
      ? buttonRect.bottom + window.scrollY
      : buttonRect.top - dropdownRect.height + window.scrollY;
    const left = Math.max(
      buttonRect.right - dropdownRect.width + window.scrollX,
      10
    );

    setMenuPosition({
      top,
      left,
      width: dropdownRect.width,
    });
  };

  useEffect(() => {
    if (!visible) return;

    requestAnimationFrame(() => calculateMenuPosition());
    window.addEventListener("resize", calculateMenuPosition);
    window.addEventListener("scroll", calculateMenuPosition);
    return () => {
      window.removeEventListener("resize", calculateMenuPosition);
      window.removeEventListener("scroll", calculateMenuPosition);
    };
  }, [visible]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (buttonRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;

      setVisible(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div className="w-[30px] h-[30px] relative">
      <div
        ref={buttonRef}
        onClick={() => {
          setVisible((prev) => !prev);
          requestAnimationFrame(() => calculateMenuPosition());
        }}
        className="w-[30px] h-[30px] border border-white rounded-full lg:cursor-pointer"
      ></div>

      {visible &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute w-[260px]  bg-white shadow-[0_0_2px_1px_#30303026,_0_1px_#30303026] rounded-md mt-2"
            style={{
              position: "absolute",
              top: menuPosition.top,
              left: menuPosition.left,
              zIndex: 9999,
              width: "270px",
              pointerEvents: "auto",
            }}
          >
            <div>
              <div className="p-3">
                <div className="flex gap-2 items-center bg-[#f7f7f7] rounded-[5px]">
                  <div className="w-[30px] h-[30px] border border-gray-300 rounded-sm overflow-hidden">
                    <img
                      src=""
                      alt="User Avatar"
                      className="w-16 h-16 rounded-full mx-auto "
                    />
                  </div>
                  <div>
                    <Text size="md" fontWeight="bold" className="capitalize">
                      {userName.toLowerCase()}
                    </Text>
                  </div>
                </div>
              </div>
              <div className="py-2 px-1 border-t border-t-[#ebebeb]">
                <ul>
                  <li className="h-[33px] px-[8px] rounded-[5px] hover:bg-[#f7f7f7] transition-colors duration-200 flex items-center">
                    <Text size="md" className="text-gray-400 break-all">
                      Username: {email}
                    </Text>
                  </li>
                  <li className="h-[33px] px-[8px] rounded-[5px] hover:bg-[#f7f7f7] transition-colors duration-200 flex items-center">
                    <Text
                      size="md"
                      className="text-gray-400 break-all capitalize"
                    >
                      Role: {role}
                    </Text>
                  </li>
                </ul>
              </div>
              <div className="py-2 px-1 border-t border-t-[#ebebeb]">
                <Button
                  variant="fill"
                  size="size-1"
                  width="full"
                  onClick={handleLoggedOut}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default AppDrawer;
