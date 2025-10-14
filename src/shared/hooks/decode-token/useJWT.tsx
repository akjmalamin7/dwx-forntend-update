import type { UserSchema } from "@/shared/redux/features/auth/auth.types";
import { useEffect, useState } from "react";

export function useJWT() {
  const [decoded, setDecoded] = useState<UserSchema | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (!storedAuth) {
      setDecoded(null);
      return;
    }

    try {
      const { access_token } = JSON.parse(storedAuth);
      if (!access_token) {
        setDecoded(null);
        return;
      }

      const payload = access_token.split(".")[1];
      const decodedPayload: UserSchema = JSON.parse(atob(payload));
      setDecoded(decodedPayload);
    } catch (error) {
      console.error("Invalid JWT token:", error);
      setDecoded(null);
    }
  }, []);

  return decoded;
}
