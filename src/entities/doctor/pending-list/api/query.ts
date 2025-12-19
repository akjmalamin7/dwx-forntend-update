import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import {
  DOCTOR_PENDING_PATIENT_TRANSFORM_RESPONSE,
  type DOCTOR_PENDING_PATIENT_API_RESPONSE,
  type DOCTOR_PENDING_PATIENT_TRANSFORM_MODEL,
} from "../model/schema";

export const PendingDoctorPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorPendingPatientList: builder.query<
      DOCTOR_PENDING_PATIENT_TRANSFORM_MODEL,
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
          url: `/doctor/patient?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: "DoctorPatientList" as const,
                id: _id,
              })),
              "DoctorPatientList",
            ]
          : ["DoctorPatientList"],
      transformResponse: (response: DOCTOR_PENDING_PATIENT_API_RESPONSE) => {
        return DOCTOR_PENDING_PATIENT_TRANSFORM_RESPONSE(response);
      },
    }),
  }),
});
export const { useGetDoctorPendingPatientListQuery } =
  PendingDoctorPatientListApi;
