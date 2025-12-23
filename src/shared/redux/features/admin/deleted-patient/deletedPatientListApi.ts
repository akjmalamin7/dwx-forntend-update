import { apiSlice } from "../../api/apiSlice";
import {
  ADMIN_TRANSFORMED_DELETE_PATIENT_RESPONSE,
  type ADMIN_DELETE_PATIENT_API_RESPONSE_MODEL,
  type ADMIN_TRANSFORMED_DELETE_PATIENT_MODEL,
} from "./deletedPatientList.types";

export const AdminDeletedPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDeletedPatientList: builder.query<
      ADMIN_TRANSFORMED_DELETE_PATIENT_MODEL,
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
          url: `/admin/patient/deleted/list?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: ADMIN_DELETE_PATIENT_API_RESPONSE_MODEL
      ) => {
        return ADMIN_TRANSFORMED_DELETE_PATIENT_RESPONSE(response);
      },
      providesTags: ["DeletedPatientList"],
    }),
  }),
});

export const { useGetDeletedPatientListQuery } = AdminDeletedPatientListApi;
