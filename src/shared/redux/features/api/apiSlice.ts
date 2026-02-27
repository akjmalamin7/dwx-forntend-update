import type { RootState } from "@/shared/redux/stores/stores";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.dwxapp.store/api",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      let access_token = state.auth.access_token;
      if (!access_token) {
        const localAuth = localStorage.getItem("auth");
        if (localAuth) {
          try {
            const parsed = JSON.parse(localAuth);
            access_token = parsed?.access_token;
          } catch (e) {
            console.error("Auth parsing error", e);
          }
        }
      }
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
    "CompletedPatient",
    "TypingBack",
    "CompletedBack",
    "AdminPatient",
    "DeleteAdminPatient",
    "DeletedPatientList",
    "XraytypeList",
    "HistoryList",
    "PaymentList",
    "SoftwareList",
    "Payment",
    "DoctorPatientList",
    "PrintBillByMonth",
    "Settings",
  ],
  endpoints: () => ({}),
});
