import { apiSlice } from "../../api/apiSlice";

export const TypingBackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    typingBack: builder.mutation({
      query: (data) => ({
        url: "/admin/patient/typingback",
        method: "POST",
        body: data,
      }),
    }),
    BillStatusUpdate: builder.mutation({
      query: (data) => ({
        url: `/admin/bill/update-status/${data._id}`,
        method: "PATCH",
        body: { bill_update: "Updated" },
      }),
    }),

  }),
});
export const { useTypingBackMutation, useBillStatusUpdateMutation } = TypingBackApi;
