import type { UserSchema } from "@/shared/redux/features/auth/auth.types";
import { setUser } from "@/shared/redux/features/auth/authSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export function useJWT() {
  const [decoded, setDecoded] = useState<UserSchema | null>(null);
  const decodedRef = useRef<UserSchema | null>(null);
  const dispatch = useDispatch();

  const decodeToken = useCallback(() => {
    const storedAuth = localStorage.getItem("auth");

    if (!storedAuth) {
      if (decodedRef.current !== null) {
        setDecoded(null);
        decodedRef.current = null;
        dispatch(setUser(null));
      }
      return;
    }

    try {
      const { access_token } = JSON.parse(storedAuth);

      if (!access_token) {
        if (decodedRef.current !== null) {
          setDecoded(null);
          decodedRef.current = null;
          dispatch(setUser(null));
        }
        return;
      }

      const payload = access_token.split(".")[1];
      const decodedPayload: UserSchema & { exp?: number } = JSON.parse(
        atob(payload)
      );

      if (decodedPayload.exp && decodedPayload.exp * 1000 < Date.now()) {
        console.warn("JWT token expired");
        if (decodedRef.current !== null) {
          setDecoded(null);
          decodedRef.current = null;
          dispatch(setUser(null));
        }
        return;
      }

      if (
        JSON.stringify(decodedRef.current) !== JSON.stringify(decodedPayload)
      ) {
        setDecoded(decodedPayload);
        decodedRef.current = decodedPayload;
        dispatch(setUser(decodedPayload));
      }
    } catch (error) {
      console.error("Invalid JWT token:", error);
      if (decodedRef.current !== null) {
        setDecoded(null);
        decodedRef.current = null;
        dispatch(setUser(null));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    decodeToken();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth") {
        decodeToken();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(decodeToken, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [decodeToken]);

  return decoded;
}

export default useJWT;