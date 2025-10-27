import { apiSlice } from "../../api/apiSlice";
import {
  transformBillListResponse,
  type BILL_MODEL,
  type BILL_RESPONSE,
  type BillListApiResponse,
} from "./billList.types";

export const BillListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBillList: builder.query<BILL_MODEL[], void>({
      query: () => ({
        url: "/agent/bill",
        method: "GET",
      }),
      transformResponse: (response: BillListApiResponse) => {
        return transformBillListResponse(response.bills);
      },
      providesTags: ["Bill"],
    }),
    getBill: builder.query<BILL_RESPONSE, string>({
      query: (month) => ({
        url: `/agent/bill/${month}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetBillListQuery, useGetBillQuery } = BillListApi;
