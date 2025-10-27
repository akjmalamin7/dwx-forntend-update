import { apiSlice } from "../../api/apiSlice";

export const AddReferenceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addReference: builder.mutation({
      query: (data) => ({
        url: "/agent/reference",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "ReferenceList", id: "LIST" }],
    }),
    EditReference: builder.mutation({
      query: ({ id, data }) => ({
        url: `/agent/reference/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "ReferenceList", id: "LIST" },
        { type: "Reference", id },
      ],
    }),
    DeleteReference: builder.mutation({
      query: (id) => ({
        url: `/agent/reference/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "ReferenceList", id: "LIST" },
        { type: "Reference", id },
      ],
    }),
  }),
});
export const {
  useAddReferenceMutation,
  useEditReferenceMutation,
  useDeleteReferenceMutation,
} = AddReferenceApi;
