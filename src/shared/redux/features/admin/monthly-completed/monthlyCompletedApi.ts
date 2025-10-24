import { apiSlice } from "../../api/apiSlice";
import { 
  transformMonthlyCompletedResponse, 
  type MONTHLY_COMPLETED_MODEL,
  type MonthlyCompletedApiResponse, 
} from "./monthlyCompleted.types";

export const MonthlyCompletedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMonthlyCompleted: builder.query<
      MONTHLY_COMPLETED_MODEL[],
      void
    >({
      query: () => ({
        url: "/admin/bill",
        method: "GET",
      }),
      transformResponse: (response: MonthlyCompletedApiResponse) => {
        return transformMonthlyCompletedResponse(response.data);
      },
    }),
  }),
});
export const { useGetMonthlyCompletedQuery } = MonthlyCompletedApi;
