import { apiSlice } from "../../api/apiSlice";
import {
  transformBillListResponse,
  type BILL_TRANSFORM_MODEL,
  type BillListApiResponse,
} from "./billRequestList.types";

export const BillRequestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBillRequestByMonth: builder.query<BILL_TRANSFORM_MODEL[], string>({
      query: (month) => ({
        url: `/admin/bill/billrequest/${month}`,
        method: "GET",
      }),
      transformResponse: (response: BillListApiResponse) => {
        return transformBillListResponse(response.data);
      },
      providesTags: ["Bill"],
    }),
  }),
});

export const { useGetBillRequestByMonthQuery } = BillRequestApi;
