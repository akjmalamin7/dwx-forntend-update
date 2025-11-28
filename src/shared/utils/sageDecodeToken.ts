// shared/utils/tokenUtils.ts
import type { UserSchema } from "../redux/features/auth/auth.types";

// Type guard function
export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

// Safe token decode function
export const safeDecodeToken = (token: string | null): UserSchema | null => {
  if (!token || !isString(token)) {
    console.error("Invalid or null token provided");
    return null;
  }

  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) {
      console.error("Invalid token format");
      return null;
    }

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const decoded = JSON.parse(jsonPayload);

    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      isDefault: decoded.isDefault,
      exp: decoded.exp,
      iat: decoded.iat,
    };
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
};
