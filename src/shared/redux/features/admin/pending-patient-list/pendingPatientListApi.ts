import { apiSlice } from "../../api/apiSlice";
import {
  ADMIN_TRANSFORM_PENDING_PATIENT_RESPONSE,
  type ADMIN_PENDING_PATIENT_API_RESPONSE,
  type ADMIN_TRANSFORM_PENDING_PATIENT_MODEL,
} from "./pendingPatientList.types";

export const PendingPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPendingPatientList: builder.query<
      ADMIN_TRANSFORM_PENDING_PATIENT_MODEL,
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
      transformResponse: (response: ADMIN_PENDING_PATIENT_API_RESPONSE) => {
        return ADMIN_TRANSFORM_PENDING_PATIENT_RESPONSE(response);
      },

      providesTags: () => [{ type: "PendingPatient", id: "LIST" }],
    }),
  }),
});
export const { useGetPendingPatientListQuery } = PendingPatientListApi;
