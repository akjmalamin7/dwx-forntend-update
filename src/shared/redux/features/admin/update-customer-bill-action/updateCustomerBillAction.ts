import { apiSlice } from "../../api/apiSlice";

export const CustomerUpdateBillActionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    customerUpdateBillAction: builder.mutation({
      query: (data) => ({
        url: `/admin/bill/reportlist`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useCustomerUpdateBillActionMutation } =
  CustomerUpdateBillActionApi;
