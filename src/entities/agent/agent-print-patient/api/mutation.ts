import { apiSlice } from "@/shared/redux/features/api/apiSlice";

export const AgentPatientPrintMutaionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAgentPatientPrintStatus: builder.mutation({
      query: (id) => ({
        url: `/agent/patient/printstatus/${id}/`,
        method: "PUT",
        body: {},
      }),
    }),
  }),
});
export const { useUpdateAgentPatientPrintStatusMutation } =
  AgentPatientPrintMutaionApi;
