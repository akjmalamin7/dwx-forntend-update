import { apiSlice } from "../../api/apiSlice";

export const AddBillPayApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBillPay: builder.mutation({
      query: (data) => ({
        url: "/agent/bill",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useAddBillPayMutation } = AddBillPayApi;
