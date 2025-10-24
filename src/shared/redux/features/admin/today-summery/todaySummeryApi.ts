import { apiSlice } from "../../api/apiSlice";
import { 
  transformTodaySummaryResponse,
  type TODAY_SUMMARY_MODEL,
  type TodaySummaryApiResponse,
} from "./todaySummery.types";

export const TodaySummeryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodaySummary: builder.query<
      TODAY_SUMMARY_MODEL[],
      void
    >({
      query: () => ({
        url: "/admin/patient/today-summary",
        method: "GET",
      }),
      transformResponse: (response: TodaySummaryApiResponse) => {
        return transformTodaySummaryResponse(response.data);
      },
    }),
  }),
});
export const { useGetTodaySummaryQuery } = TodaySummeryApi;
