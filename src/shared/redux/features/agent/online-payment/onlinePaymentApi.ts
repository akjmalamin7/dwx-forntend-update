 
import { apiSlice } from "../../api/apiSlice";
import type {
  ONLINE_PAYMENT_REQUEST,
  ONLINE_PAYMENT_RESPONSE,
} from "./onlinePayment.types";

export const onlinePaymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    initOnlinePayment: builder.mutation<ONLINE_PAYMENT_RESPONSE, ONLINE_PAYMENT_REQUEST>({
      query: (data) => ({
        url: "/agent/payment/init",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useInitOnlinePaymentMutation } = onlinePaymentApi;