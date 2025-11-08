import { apiSlice } from "../../api/apiSlice";

export const AddHistoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addHistory: builder.mutation({
      query: (data) => ({
        url: "/admin/history",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "HistoryList", id: "LIST" }],
    }), 
    DeleteHistory: builder.mutation({
      query: (id) => ({
        url: `/admin/history/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "HistoryList", id: "LIST" },
        { type: "HistoryList", id },
      ],
    }),
  }),
});
export const {
  useAddHistoryMutation, 
  useDeleteHistoryMutation,
} = AddHistoryApi;
