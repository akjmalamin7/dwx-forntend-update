import { apiSlice } from "../../api/apiSlice";
import {
  transformUserListResponse,
  type AdminUserResponse,
  type USER_MODEL,
  type UserListApiResponse,
} from "./user.types";

export const AddUserApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => ({
        url: "/admin/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    getUserList: builder.query<USER_MODEL[], string>({
      query: (role) => ({
        url: `/admin/users/all?role=${role}`,
        method: "GET",
      }),
      transformResponse: (response: UserListApiResponse) => {
        return transformUserListResponse(response.data);
      },
      providesTags: ["User"],
    }),
    getDeletedDoctorList: builder.query<USER_MODEL[], void>({
      query: () => ({
        url: "/admin/users/deleted?role=xray_dr&role=ecg_dr",
        method: "GET",
      }),
      transformResponse: (response: UserListApiResponse) => {
        return transformUserListResponse(response.data);
      },
      providesTags: ["User"],
    }),
    getDeletedUserList: builder.query<USER_MODEL[], void>({
      query: () => ({
        url: "/admin/users/deleted?role=user",
        method: "GET",
      }),
      transformResponse: (response: UserListApiResponse) => {
        return transformUserListResponse(response.data);
      },
      providesTags: ["User"],
    }),
    getUser: builder.query<AdminUserResponse, string>({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    updateUser: builder.mutation({
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
  useAddUserMutation,
  useUpdateUserMutation,
  useGetUserListQuery,
  useGetDeletedDoctorListQuery,
  useGetDeletedUserListQuery,
  useGetUserQuery,
  useDeleteAdminUserMutation,
  useChangePasswordMutation,
} = AddUserApi;
