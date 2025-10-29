import type { RootState } from "@/shared/redux/stores/stores";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const access_token = state.auth.access_token;
      if (access_token) {
        headers.set("authorization", `Bearer ${access_token}`);
      }
    },
  }),
  tagTypes: [
    "FormatList",
    "Format",
    "Reference",
    "ReferenceList",
    "Format",
    "Patient",
    "Doctor",
    "CheckedUser",
    "User",
    "PaymentGetway",
    "SD",
    "Bill",
    "PendingPatient",
  ],
  endpoints: () => ({}),
});
