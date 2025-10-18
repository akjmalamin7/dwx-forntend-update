import { apiSlice } from "../../api/apiSlice";
import { transformTransectionListResponse, type TRANSECTION_TRANSFORM_MODEL, type TransectionListApiResponse } from "./transectionList.types";
 
export const TransectionListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransectionList: builder.query<
      TRANSECTION_TRANSFORM_MODEL[],
      void
    >({
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
