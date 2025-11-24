import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import {
  DOCTOR_PENDING_PATIENT_TRANSFORM_RESPONSE,
  type DOCTOR_PENDING_PATIENT_API_RESPONSE,
  type DOCTOR_PENDING_PATIENT_TRANSFORM_MODEL,
} from "../model/schema";

const PendingPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorPendingPatientList: builder.query<
      DOCTOR_PENDING_PATIENT_TRANSFORM_MODEL,
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
          url: `/doctor/patient?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: DOCTOR_PENDING_PATIENT_API_RESPONSE) => {
        return DOCTOR_PENDING_PATIENT_TRANSFORM_RESPONSE(response);
      },
    }),
  }),
});
export const { useGetDoctorPendingPatientListQuery } = PendingPatientListApi;
