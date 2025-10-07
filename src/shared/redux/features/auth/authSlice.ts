import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AUTH_INITIAL_STATE } from "./auth.types";

const authSlice = createSlice({
  name: "auth",
  initialState: AUTH_INITIAL_STATE,
  reducers: {
    userLoggedIn: (
      state,
      action: PayloadAction<{ access_token: string | null }>
    ) => {
      state.access_token = action.payload.access_token;
    },
  },
});
export const { userLoggedIn } = authSlice.actions;
export default authSlice.reducer;
