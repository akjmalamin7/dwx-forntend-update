import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import authliceReducer from "@/shared/redux/features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import mobileMenuReducer from "../features/mobile-menu/mobileMenuSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authliceReducer,
    mobileMenu: mobileMenuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: {
    name: "DWX",
    trace: true,
    traceLimit: 25,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
