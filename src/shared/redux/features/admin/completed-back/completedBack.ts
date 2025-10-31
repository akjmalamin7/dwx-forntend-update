import { apiSlice } from "../../api/apiSlice";

export const CompletedBackApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    completedgBack: builder.mutation({
      query: (data) => ({
        url: "admin/patient/completeback",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useCompletedgBackMutation } = CompletedBackApi;
