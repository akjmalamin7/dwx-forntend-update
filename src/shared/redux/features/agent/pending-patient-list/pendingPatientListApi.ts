import { apiSlice } from "../../api/apiSlice";
import {
  AGENT_TRANSFORM_PENDING_PATIENT_RESPONSE,
  type AGENT_PATIENT_PENDING_API_RESPONSE_MODEL,
  type AGENT_TRANSFORM_PENDING_PATIENT_MODEL,
} from "./pendingPatientList.types";

export const AgentPendingPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPendingPatientList: builder.query<
      AGENT_TRANSFORM_PENDING_PATIENT_MODEL,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) {
          params.append("search", search);
        }
        return {
          url: `/agent/patient?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: AGENT_PATIENT_PENDING_API_RESPONSE_MODEL
      ) => {
        return AGENT_TRANSFORM_PENDING_PATIENT_RESPONSE(response);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Patient" as const,
                id,
              })),
              { type: "Patient", id: "LIST" },
            ]
          : [{ type: "Patient", id: "LIST" }],
    }),
  }),
});
export const { useGetPendingPatientListQuery } = AgentPendingPatientListApi;
