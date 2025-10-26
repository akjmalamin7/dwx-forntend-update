import { apiSlice } from "../../api/apiSlice";
import type { PRINT_PATIENT_RESPONSE } from "./patientPrint.type";

export const PatientPrintApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatientPrint: builder.query<PRINT_PATIENT_RESPONSE, string>({
      query: (id) => ({
        url: `/agent/patient/print/${id}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetPatientPrintQuery } = PatientPrintApi;
