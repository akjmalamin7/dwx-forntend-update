import { apiSlice } from "@/shared/redux/features/api/apiSlice";

export const FormatList = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* Add Format  */
    addFormat: builder.mutation({
      query: (data) => ({
        url: "/admin/format",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "FormatList", id: "LIST" }],
    }),
    /* Update Format */
    updateFormat: builder.mutation({
      query: (data) => ({
        url: `/admin/format/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "FormatList", id: "LIST" },
        { type: "Format", id },
      ],
    }),
    deleteAdminFormat: builder.mutation({
      query: (id) => ({
        url: `/admin/format/${id}`,
        method: "DELETE",
        body: { _id: id },
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "FormatList", id: "LIST" },
        { type: "Format", id },
      ],
    }),
  }),
});
export const {
  useAddFormatMutation,
  useUpdateFormatMutation,
  useDeleteAdminFormatMutation,
} = FormatList;
