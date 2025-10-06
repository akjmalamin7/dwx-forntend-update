export interface UserSchema {
  _id: string;
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
  token: string | null;
  user: UserSchema | null;
}
export const AUTH_INITIAL_STATE: AuthState = {
  token: null,
  user: {} as UserSchema,
};
