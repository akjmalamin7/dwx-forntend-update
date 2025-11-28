import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import {
  ADMIN_ARCHIVE_DOCTOR_TRANSFORM_RESPONSE,
  type ADMIN_ARCHIVE_DOCTOR_API_RESPONSE,
  type ADMIN_ARCHIVE_DOCTOR_TRANSFORM_MODEL,
} from "../model/schema";

export const ArchivePatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminArchivePatientList: builder.query<
      ADMIN_ARCHIVE_DOCTOR_TRANSFORM_MODEL,
      {
        page?: number;
        limit?: number;
        search?: string;
        month?: string | number;
      }
    >({
      query: ({ page = 1, limit = 10, search = "", month }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) {
          params.append("search", search);
        }
        return {
          url: `/admin/patient/filter?month=${month}&${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ADMIN_ARCHIVE_DOCTOR_API_RESPONSE) => {
        return ADMIN_ARCHIVE_DOCTOR_TRANSFORM_RESPONSE(response);
      },
      providesTags: ["CompletedPatient"],
    }),
  }),
});
export const { useGetAdminArchivePatientListQuery } = ArchivePatientListApi;
