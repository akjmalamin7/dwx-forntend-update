import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import {
  DOCTOR_COMPLETED_PATIENT_TRANSFORM_RESPONSE,
  type DOCTOR_COMPLETED_PATIENT_API_RESPONSE,
  type DOCTOR_COMPLETED_PATIENT_TRANSFORM_MODEL,
} from "../model/schema";

const CompletedPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorCompletedPatientList: builder.query<
      DOCTOR_COMPLETED_PATIENT_TRANSFORM_MODEL,
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
          url: `/doctor/patient/completed?$${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: DOCTOR_COMPLETED_PATIENT_API_RESPONSE) => {
        return DOCTOR_COMPLETED_PATIENT_TRANSFORM_RESPONSE(response);
      },
    }),
  }),
});
export const { useGetDoctorCompletedPatientListQuery } =
  CompletedPatientListApi;
