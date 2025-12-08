import { apiSlice } from "../../api/apiSlice";

export const AddSoftwareApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addSoftware: builder.mutation({
      query: (data) => ({
        url: "/admin/software",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "SoftwareList", id: "LIST" }],
    }), 
    DeleteSoftware: builder.mutation({
      query: (id) => ({
        url: `/admin/software/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "SoftwareList", id: "LIST" },
        { type: "SoftwareList", id },
      ],
    }),
  }),
});
export const {
  useAddSoftwareMutation, 
  useDeleteSoftwareMutation,
} = AddSoftwareApi;
