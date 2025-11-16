import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AUTH_INITIAL_STATE, type UserSchema } from "./auth.types";

const authSlice = createSlice({
  name: "auth",
  initialState: AUTH_INITIAL_STATE,
  reducers: {
    userLoggedIn: (
      state,
      action: PayloadAction<{
        access_token: string | null;
        user: UserSchema | null;
      }>
    ) => {
      state.access_token = action.payload.access_token;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.access_token = null;
      state.user = null;
    },
    setUser: (state, action: PayloadAction<UserSchema | null>) => {
      state.user = action.payload;
    },
  },
});

export const { userLoggedIn, userLoggedOut, setUser } = authSlice.actions;
export default authSlice.reducer;
