import { apiSlice } from "../../api/apiSlice";

export const AddFormatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addFormat: builder.mutation({
      query: (data) => ({
        url: "/doctor/format",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useAddFormatMutation } = AddFormatApi;
