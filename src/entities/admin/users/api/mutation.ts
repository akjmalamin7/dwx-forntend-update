import { apiSlice } from "@/shared/redux/features/api/apiSlice";


export const AddUserApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAdminUser: builder.mutation({
      query: (data) => ({
        url: "/admin/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    adminUpdateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "User", id: "LIST" },
        { type: "User", id },
      ],
    }),
    deleteAdminUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/admin/users/password`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const {
  useAddAdminUserMutation,
  useAdminUpdateUserMutation,
  useDeleteAdminUserMutation,
  useChangePasswordMutation,
} = AddUserApi;
