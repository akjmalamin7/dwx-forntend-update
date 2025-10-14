export interface UserSchema {
  // _id: string;
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
}
export const AUTH_INITIAL_STATE: AuthState = {
  access_token: null,
};
