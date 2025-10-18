import { apiSlice } from "../../api/apiSlice";
import { transformTransectionListResponse, type TRANSECTION_SUMMARY_MODEL, type TransectionListApiResponse } from "./transectionList.types";
 
export const TransectionListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransectionList: builder.query<TRANSECTION_SUMMARY_MODEL[], void>({
      query: () => ({
        url: "/agent/bill/transaction",
        method: "GET",
      }),
        transformResponse: (response: TransectionListApiResponse) => {
              return transformTransectionListResponse(response.bills);
       }, 
    }),
  }),
});
export const { useGetTransectionListQuery } = TransectionListApi;
