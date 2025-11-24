import { apiSlice } from "../../api/apiSlice";
import {
  AGENT_COMPLETED_PATIENT_TRANSFORM_RESPONSE,
  type AGENT_COMPLETED_DOCTOR_API_RESPONSE,
  type AGENT_COMPLETED_PATIENT_TRANSFORM_MODEL,
} from "./completedPatientList.types";

const CompletedPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAgentCompletedPatientList: builder.query<
      AGENT_COMPLETED_PATIENT_TRANSFORM_MODEL,
      { page?: number; limit?: number; search?: "" }
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
          url: `/agent/patient/completed?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: AGENT_COMPLETED_DOCTOR_API_RESPONSE) => {
        return AGENT_COMPLETED_PATIENT_TRANSFORM_RESPONSE(response);
      },
    }),
  }),
});
export const { useGetAgentCompletedPatientListQuery } = CompletedPatientListApi;
