import { apiSlice } from "../../api/apiSlice";
import {
  transformBillListResponse,
  type BILL_MODEL,
  type BILL_RESPONSE,
  type BillListApiResponse,
} from "./billList.types";

export const BillListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorList: builder.query<BILL_MODEL[], void>({
      query: () => ({
        url: "/admin/doctorbill",
        method: "GET",
      }),
      transformResponse: (response: BillListApiResponse) => {
        return transformBillListResponse(response.data);
      },
      providesTags: ["Bill"],
    }),
    getBillList: builder.query<BILL_RESPONSE, string>({
      query: (doctor_id) => ({
        url: `/admin/doctorbill/${doctor_id}`,
        method: "GET",
      }),
    }),
     getBillDetails: builder.query<BILL_RESPONSE, string>({
      query: (bill_id) => ({
        url: `/admin/doctorbill/printbill/${bill_id}`,
        method: "GET",
      }),
    }),
     addDoctorBillPay: builder.mutation({
      query: (data) => ({
        url: "/admin/doctorbill",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bill"],
    }),
  }),
});
export const { useGetDoctorListQuery, useGetBillListQuery, useGetBillDetailsQuery, useAddDoctorBillPayMutation} = BillListApi;
