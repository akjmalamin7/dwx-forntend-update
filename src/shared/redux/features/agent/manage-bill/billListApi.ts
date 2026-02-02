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
        url: "/agent/bill?page=1&limit=100",
        method: "GET",
      }),
      transformResponse: (response: BillListApiResponse) => {
        return transformBillListResponse(response.data);
      },
      providesTags: ["Bill"],
    }),
    getBill: builder.query<BILL_RESPONSE, string>({
      query: (month) => ({
        url: `/agent/bill/${month}`,
        method: "GET",
      }),
      providesTags: (_result, _error, month) => [
        "PrintBillByMonth",
        { type: "PrintBillByMonth", id: month },
      ],
      keepUnusedDataFor: 0,
    }),
  }),
});
export const { useGetBillListQuery, useGetBillQuery } = BillListApi;
