import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import {
  DOCTOR_ALL_COMPLETED_PATIENT_TRANSFORM_RESPONSE,
  type DOCTOR_ALL_COMPLETED_PATIENT_API_RESPONSE,
  type DOCTOR_ALL_COMPLETED_PATIENT_TRANSFORM_MODEL,
} from "../model/schema";

const AllCompletedPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorAllCompletedPatientList: builder.query<
      DOCTOR_ALL_COMPLETED_PATIENT_TRANSFORM_MODEL,
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
          url: `/doctor/patient/completed/all?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: DOCTOR_ALL_COMPLETED_PATIENT_API_RESPONSE
      ) => {
        return DOCTOR_ALL_COMPLETED_PATIENT_TRANSFORM_RESPONSE(response);
      },
    }),
  }),
});
export const { useGetDoctorAllCompletedPatientListQuery } =
  AllCompletedPatientListApi;
