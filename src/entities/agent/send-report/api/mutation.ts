import { apiSlice } from "@/shared/redux/features/api/apiSlice";

const SendReportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendReport: builder.mutation({
      query: (data) => ({
        url: "/agent/patient",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Patient", id: "LIST" }],
    }),
    updateReport: builder.mutation({
      query: ({ id, data }) => ({
        url: `/agent/patient/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Patient", id: "LIST" },
        { type: "Patient", id },
      ],
    }),
  }),
});
export const { useSendReportMutation, useUpdateReportMutation } = SendReportApi;
