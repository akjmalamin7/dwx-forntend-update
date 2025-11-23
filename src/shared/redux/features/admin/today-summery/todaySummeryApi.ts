import { apiSlice } from "../../api/apiSlice";
import {
  ADMIN_TODAY_SUMMARY_TRANSFORM_RESPONSE,
  type ADMIN_TODAY_SUMMARY_API_RESPONSE,
  type ADMIN_TODAY_SUMMARY_TRANSFORM_MODEL,
} from "./todaySummery.types";

export const TodaySummeryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminTodaySummary: builder.query<
      ADMIN_TODAY_SUMMARY_TRANSFORM_MODEL,
      { page?: number; limit?: number; search?: string; date?: string }
    >({
      query: ({ page = 1, limit = 10, search = "", date = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) {
          params.append("search", search);
        }
        if (date) params.append("date", date);
        return {
          url: `/admin/patient/today-summary?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ADMIN_TODAY_SUMMARY_API_RESPONSE) => {
        return ADMIN_TODAY_SUMMARY_TRANSFORM_RESPONSE(response);
      },
    }),
  }),
});
export const { useGetAdminTodaySummaryQuery } = TodaySummeryApi;
