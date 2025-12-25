import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import type { PRINT_PATIENT_RESPONSE } from "../model/schema";

export const AgentPatientPrintApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAgentPatientPrint: builder.query<PRINT_PATIENT_RESPONSE, string>({
      query: (id) => ({
        url: `/agent/patient/print/${id}`,
        method: "GET",
      }),
    }),
    updateAgentPatientPrintStatus: builder.mutation({
      query: (id) => ({
        url: `/agent/patient/printstatus/${id}/`,
        method: "PUT",
        body: {},
      }),
    }),
  }),
});
export const {
  useGetAgentPatientPrintQuery,
  useUpdateAgentPatientPrintStatusMutation,
} = AgentPatientPrintApi;
