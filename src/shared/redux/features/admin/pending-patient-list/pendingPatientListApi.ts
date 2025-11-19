import { apiSlice } from "../../api/apiSlice";
import {
  TRANSFORM_PENDING_PATIENT_RESPONSE,
  type PENDING_PATIENT_API_RESPONSE,
  type TRANSFORM_PENDING_PATIENT_MODEL,
} from "./pendingPatientList.types";

export const PendingPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPendingPatientList: builder.query<
      TRANSFORM_PENDING_PATIENT_MODEL,
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
          url: `/admin/patient?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: PENDING_PATIENT_API_RESPONSE) => {
        return TRANSFORM_PENDING_PATIENT_RESPONSE(response);
      },

      providesTags: () => [{ type: "PendingPatient", id: "LIST" }],
    }),
  }),
});
export const { useGetPendingPatientListQuery } = PendingPatientListApi;
