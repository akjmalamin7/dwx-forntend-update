import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { MOBILE_MENU_INITIAL_STATE } from "./mobileMenu.models";

const mobileMenuSlice = createSlice({
  name: "mobileMenu",
  initialState: MOBILE_MENU_INITIAL_STATE,
  reducers: {
    toggleMobileMenu: (state, action: PayloadAction<{ isToggle: boolean }>) => {
      state.isToggle = action.payload.isToggle;
    },
  },
});
export const { toggleMobileMenu } = mobileMenuSlice.actions;
export default mobileMenuSlice.reducer;
