import { apiSlice } from "../../api/apiSlice";
import {
  transformMonthBillResponse,
  type MONTH_BILL_TRANSFORM_MODEL,
} from "./billMonthList.types";

export const BillMonthListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBillMonthList: builder.query<MONTH_BILL_TRANSFORM_MODEL[], void>({
      query: () => ({
        url: "/admin/bill/billrequest",
        method: "GET",
      }),
      transformResponse: (response: { data: { _id: string; count: number }[] }) => {
        return transformMonthBillResponse(response.data);
      },
      providesTags: ["Bill"],
    }),
  }),
});

export const { useGetBillMonthListQuery } = BillMonthListApi;
