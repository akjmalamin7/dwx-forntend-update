import { apiSlice } from "../../api/apiSlice";
import {
  ADMIN_COMPLETED_PATIENT_TRANSFORM_RESPONSE,
  type ADMIN_COMPLETED_PATIENT_API_RRSPONSE,
  type ADMIN_COMPLETED_PATIENT_TRANSFORM_MODEL,
} from "./completedPatients.types";

export const CompletedPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompletedPatientList: builder.query<
      ADMIN_COMPLETED_PATIENT_TRANSFORM_MODEL,
      { page?: number; limit: number; search?: string }
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
          url: `/admin/patient/completed?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ADMIN_COMPLETED_PATIENT_API_RRSPONSE) => {
        return ADMIN_COMPLETED_PATIENT_TRANSFORM_RESPONSE(response);
      },
      providesTags: ["CompletedPatient"],
    }),
  }),
});
export const { useGetCompletedPatientListQuery } = CompletedPatientListApi;
