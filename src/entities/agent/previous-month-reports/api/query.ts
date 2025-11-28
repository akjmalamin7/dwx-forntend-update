import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import {
  AGENT_PREV_MONTH_COMPLETED_PATIENT_TRANSFORM_RESPONSE,
  type AGENT_PREV_MONTH_COMPLETED_PATIENT_API_RESPONSE,
  type AGENT_PREV_MONTH_COMPLETED_PATIENT_TRANSFORM_MODEL,
} from "../model/schema";

export const PreviousMonthPatientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAgentPreviousMonthPatient: builder.query<
      AGENT_PREV_MONTH_COMPLETED_PATIENT_TRANSFORM_MODEL,
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
          url: `/agent/patient/completed/previous?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: AGENT_PREV_MONTH_COMPLETED_PATIENT_API_RESPONSE
      ) => {
        return AGENT_PREV_MONTH_COMPLETED_PATIENT_TRANSFORM_RESPONSE(response);
      },
    }),
  }),
});
export const { useGetAgentPreviousMonthPatientQuery } = PreviousMonthPatientApi;
