import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import {
  AGEND_ALL_COMPLETED_PATIENT_TRANSFORM_RESPONSE,
  type AGEND_ALL_COMPLETED_PATIENT_API_RESPONSE,
  type AGEND_ALL_COMPLETED_PATIENT_TRANSFORM_MODEL,
} from "../model/schema";

const AllCompletedPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAgendAllCompletedPatientList: builder.query<
      AGEND_ALL_COMPLETED_PATIENT_TRANSFORM_MODEL,
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
          url: `/agent/patient/completed/all?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: AGEND_ALL_COMPLETED_PATIENT_API_RESPONSE
      ) => {
        return AGEND_ALL_COMPLETED_PATIENT_TRANSFORM_RESPONSE(response);
      },
    }),
  }),
});
export const { useGetAgendAllCompletedPatientListQuery } =
  AllCompletedPatientListApi;
