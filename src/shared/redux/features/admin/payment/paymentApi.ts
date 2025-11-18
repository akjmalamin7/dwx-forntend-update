import { apiSlice } from "../../api/apiSlice";
import type {
  PaymentListOptions,
  PaymentListResponse,
} from "./paymentList.types";

export const PaymentList = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* Get Payment Method List */
    getPaymentList: builder.query<PaymentListOptions[], void>({
      query: () => ({
        url: "/admin/payment",
        method: "GET",
      }),
      transformResponse: (
        response: PaymentListResponse
      ): PaymentListOptions[] =>
        response?.data?.map((payment) => ({
          id: payment._id,
          name: payment.name,
          details: payment.details,
        })) || [],
      providesTags: [{ type: "PaymentList", id: "LIST" }],
    }),

    /* Add Payment  */
    addPayment: builder.mutation({
      query: (data) => ({
        url: "/admin/payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "PaymentList", id: "LIST" }],
    }),

    deletePayment: builder.mutation({
      query: (id) => ({
        url: `/admin/payment/${id}`,
        method: "DELETE",
        body: { _id: id },
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "PaymentList", id: "LIST" },
        { type: "Payment", id },
      ],
    }),
  }),
});
export const {
  useGetPaymentListQuery,
  useAddPaymentMutation,
  useDeletePaymentMutation,
} = PaymentList;
