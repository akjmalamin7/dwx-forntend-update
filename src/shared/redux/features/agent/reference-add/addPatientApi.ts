import { apiSlice } from "../../api/apiSlice";

export const AddReferenceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addReference: builder.mutation({
      query: (data) => ({
        url: "/agent/reference",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useAddReferenceMutation } = AddReferenceApi;
