// shared/redux/features/auth/auth.types.ts
export interface UserSchema {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "xray_dr" | "ecg_dr";
  isDefault: string;
  exp: number;
  iat: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthState {
  access_token: string | null;
  user: UserSchema | null;
}

export const AUTH_INITIAL_STATE: AuthState = {
  access_token: null,
  user: null,
};