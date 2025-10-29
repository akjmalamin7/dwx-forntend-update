import { apiSlice } from "../../api/apiSlice";
import type { PAYMENT_GETWAY_RESPONSE } from "./paymentGetway.type";

export const PaymentGetwayApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminPaymentGetwayList: builder.query<PAYMENT_GETWAY_RESPONSE, void>({
      query: () => ({
        url: "/admin/payment",
        method: "GET",
      }),

      providesTags: ["PaymentGetway"],
    }),
  }),
});
export const { useGetAdminPaymentGetwayListQuery } = PaymentGetwayApi;
