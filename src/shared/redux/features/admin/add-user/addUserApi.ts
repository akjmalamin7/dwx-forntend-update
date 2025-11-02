import { apiSlice } from "../../api/apiSlice";
import { transformUserListResponse, type USER_MODEL, type UserListApiResponse } from "./user.types";

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
  }),
});
export const { useAddUserMutation, useUpdateUserMutation,useGetUserListQuery, useGetDeletedDoctorListQuery,useGetDeletedUserListQuery} =
  AddUserApi;
