import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AUTH_INITIAL_STATE, type UserSchema } from "./auth.types";

const authSlice = createSlice({
  name: "auth",
  initialState: AUTH_INITIAL_STATE,
  reducers: {
    userLoggedIn: (
      state,
      action: PayloadAction<{ token: string; user: UserSchema }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
}); // Placeholder to avoid unused variable error
export const { userLoggedIn } = authSlice.actions;
export default authSlice.reducer;
