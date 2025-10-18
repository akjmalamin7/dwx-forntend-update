import { apiSlice } from "../../api/apiSlice";
import { transformBillListResponse, type BILL_MODEL,  type BillListApiResponse } from "./billList.types";
 
export const BillListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBillList: builder.query<
      BILL_MODEL[],
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
