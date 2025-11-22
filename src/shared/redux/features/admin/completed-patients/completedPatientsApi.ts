import { apiSlice } from "../../api/apiSlice";
import {
  ADMIN_COMPLETED_PATIENTS_TRANSFORM_RESPONSE,
  type ADMIN_COMPLETED_PATIENT_API_RESPONSE,
  type ADMIN_COMPLETED_PATIENTS_API_RRSPONSE,
  type ADMIN_COMPLETED_PATIENTS_TRANSFORM_MODEL,
} from "./completedPatients.types";

export const CompletedPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminCompletedPatientList: builder.query<
      ADMIN_COMPLETED_PATIENTS_TRANSFORM_MODEL,
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
      transformResponse: (response: ADMIN_COMPLETED_PATIENTS_API_RRSPONSE) => {
        return ADMIN_COMPLETED_PATIENTS_TRANSFORM_RESPONSE(response);
      },
      providesTags: ["CompletedPatient"],
    }),
    getAdminCompletedPatient: builder.query<
      ADMIN_COMPLETED_PATIENT_API_RESPONSE,
      string
    >({
      query: (patient_id) => ({
        url: `/admin/patient/completed/${patient_id}`,
        method: "GET",
      }),
    }),
    updateAdminCompletedPatient: builder.mutation({
      query: ({ data, patient_id }) => ({
        url: `/admin/patient/completed/${patient_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CompletedPatient"],
    }),
  }),
});

export const {
  useGetAdminCompletedPatientListQuery,
  useGetAdminCompletedPatientQuery,
  useUpdateAdminCompletedPatientMutation,
} = CompletedPatientListApi;
