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
  }),
});
export const { useTypingBackMutation } = TypingBackApi;
