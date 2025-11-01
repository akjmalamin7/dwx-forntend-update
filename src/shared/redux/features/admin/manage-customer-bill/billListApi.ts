import { apiSlice } from "../../api/apiSlice";
import {
  transformBillListResponse,
  type BILL_MODEL,
  type BILL_RESPONSE,
  type BillListApiResponse,
} from "./billList.types";

export const BillListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerListd: builder.query<BILL_MODEL[], void>({
      query: () => ({
        url: "/admin/users/all?role=user",
        method: "GET",
      }),
      transformResponse: (response: BillListApiResponse) => {
        return transformBillListResponse(response.data);
      },
      providesTags: ["Bill"],
    }),
    getCustomerBillList: builder.query<BILL_RESPONSE, string>({
      query: (doctor_id) => ({
        url: `/admin/bill/${doctor_id}`,
        method: "GET",
      }),
    }),
     getCustomerBillDetails: builder.query<BILL_RESPONSE, string>({
      query: (bill_id) => ({
        url: `/admin/bill/printbill/${bill_id}`,
        method: "GET",
      }),
    }), 
     addCustomerBillPay: builder.mutation({
      query: (data) => ({
        url: "/admin/bill",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bill"],
    }),
   
  }),
});
export const { useGetCustomerListdQuery, useGetCustomerBillListQuery, useGetCustomerBillDetailsQuery, useAddCustomerBillPayMutation} = BillListApi;
