import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import {
  ADMIN_PATIENTS_FILTER_TRANSFORM_RESPONSE,
  type ADMIN_PATIENTS_FILTER_API_RESPONSE,
  type ADMIN_PATIENTS_FILTER_TRANSFORM_MODEL,
} from "../model/schema";

export const AdminPatientFilterListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminPatientFilterList: builder.query<
      ADMIN_PATIENTS_FILTER_TRANSFORM_MODEL,
      {
        page?: number;
        limit: number;
        search?: string;
        startDate?: string;
        endDate?: string;
        agentId?: string;
      }
    >({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        startDate = "",
        endDate = "",
        agentId = "",

      }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) {
          params.append("search", search);
        }
        if (startDate) params.append("start_date", startDate);
        if (endDate) params.append("end_date", endDate);
        if (agentId) params.append("agent_id", agentId);
        return {
          url: `/admin/patient/search-report?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ADMIN_PATIENTS_FILTER_API_RESPONSE) => {
        return ADMIN_PATIENTS_FILTER_TRANSFORM_RESPONSE(response);
      },
    }),
    getAdminPatientFilterUser: builder.query<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 100 }) => ({
        url: `/admin/users/all?role=user&page=${page}&limit=${limit}`,
      }),
    }),
  }),
});
export const {
  useGetAdminPatientFilterListQuery,
  useGetAdminPatientFilterUserQuery,
} = AdminPatientFilterListApi;
