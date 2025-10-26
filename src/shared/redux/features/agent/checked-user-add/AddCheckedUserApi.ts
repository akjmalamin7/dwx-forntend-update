import { apiSlice } from "../../api/apiSlice";

export const AddCheckedUserApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCheckedUser: builder.mutation({
      query: (data) => ({
        url: "/agent/checkuser",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CheckedUser"],
    }),
    editCheckedUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/agent/checkuser/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CheckedUser"],
    }),
    deleteCheckedUser: builder.mutation({
      query: (id) => ({
        url: `/agent/checkuser/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useAddCheckedUserMutation,
  useEditCheckedUserMutation,
  useDeleteCheckedUserMutation,
} = AddCheckedUserApi;
