import { apiSlice } from "../../api/apiSlice";

export const AddXraytypeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addXraytype: builder.mutation({
      query: (data) => ({
        url: "/admin/xraytype",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "XraytypeList", id: "LIST" }],
    }), 
    DeleteXraytype: builder.mutation({
      query: (id) => ({
        url: `/admin/xraytype/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "XraytypeList", id: "LIST" },
        { type: "XraytypeList", id },
      ],
    }),
  }),
});
export const {
  useAddXraytypeMutation, 
  useDeleteXraytypeMutation,
} = AddXraytypeApi;
