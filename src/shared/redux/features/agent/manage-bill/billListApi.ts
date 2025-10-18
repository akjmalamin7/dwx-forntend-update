import { apiSlice } from "../../api/apiSlice";
import { transformBillListResponse, type BILL_TRANSFORM_MODEL, type BillListApiResponse } from "./billList.types";
 
export const BillListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBillList: builder.query<
      BILL_TRANSFORM_MODEL[],
      void
    >({
      query: () => ({
        url: "/agent/bill",
        method: "GET",
      }),
      transformResponse: (response: BillListApiResponse) => {
        return transformBillListResponse(response.bills);
      },
    }),
  }),
});
export const { useGetBillListQuery } = BillListApi;
