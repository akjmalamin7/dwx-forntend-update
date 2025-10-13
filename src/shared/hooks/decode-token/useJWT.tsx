import type { UserSchema } from "@/shared/redux/features/auth/auth.types";
import { useEffect, useState } from "react";

export function useJWT() {
  const [decoded, setDecoded] = useState<UserSchema | null>(null);

  const storedAuth = localStorage.getItem("auth");
  const token: string | null = storedAuth
    ? (JSON.parse(storedAuth).access_token as string | null)
    : null;

  useEffect(() => {
    if (!token) {
      setDecoded(null);
      return;
    }

    try {
      const payload = token.split(".")[1];
      const decodedPayload: UserSchema = JSON.parse(atob(payload));
      setDecoded(decodedPayload);
    } catch (error) {
      console.error("Invalid JWT token:", error);
      setDecoded(null);
    }
  }, [token]);

  return decoded;
}
