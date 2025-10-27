import { apiSlice } from "../../api/apiSlice";
import type { PAYMENT_GETWAY_RESPONSE } from "./paymentGetway.type";

export const PaymentGetwayApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentGetwayList: builder.query<PAYMENT_GETWAY_RESPONSE, void>({
      query: () => ({
        url: "/agent/reference/payment",
        method: "GET",
      }),

      providesTags: ["PaymentGetway"],
    }),
  }),
});
export const { useGetPaymentGetwayListQuery } = PaymentGetwayApi;
