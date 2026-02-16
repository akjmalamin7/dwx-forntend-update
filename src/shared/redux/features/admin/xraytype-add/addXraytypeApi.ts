import { apiSlice } from "../../api/apiSlice";

export const AddXraytypeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addXraytype: builder.mutation({
      query: (data) => ({
        url: "/admin/xraytype",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Reference", id: "LIST" }],
    }), 

  
    importReferences: builder.mutation({
      query: (formData) => ({
        url: '/admin/xraytype/import',  // ✅ Correct (no /api prefix)
        method: 'POST',
        body: formData, 
      }),
      invalidatesTags: ['Reference'],
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
  useImportReferencesMutation 
} = AddXraytypeApi;

 