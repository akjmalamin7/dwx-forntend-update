import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import {
  ADMIN_USER_LIST_TRANSFORM_RESPONSE,
  type ADMIN_USER_LIST_API_RESPONSE,
  type ADMIN_USER_LIST_TRANSFORM_MODEL,
} from "../model/schema";

export const AddUserApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* user list */
    getAdminUserList: builder.query<
      ADMIN_USER_LIST_TRANSFORM_MODEL,
      { page?: number; limit?: number; search?: string; role?: string }
    >({
      query: ({ page = 1, limit = 10, search = "", role = "user" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) params.append("search", search);

        return {
          url: `/admin/users/all?role=${role}&${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ADMIN_USER_LIST_API_RESPONSE) =>
        ADMIN_USER_LIST_TRANSFORM_RESPONSE(response),
      providesTags: ["User"],
    }),

    /* deleted user list */
    getAdminDeletedUserList: builder.query<
      ADMIN_USER_LIST_TRANSFORM_MODEL,
      { page?: number; limit?: number; search?: string; role?: string }
    >({
      query: ({ page = 1, limit = 10, search = "", role = "user" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) params.append("search", search);

        return {
          url: `/admin/users/deleted?role=${role}&${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ADMIN_USER_LIST_API_RESPONSE) =>
        ADMIN_USER_LIST_TRANSFORM_RESPONSE(response),
      providesTags: ["User"],
    }),
    /* deleted doctor list */
    getAdminDoctorDeletedList: builder.query<
      ADMIN_USER_LIST_TRANSFORM_MODEL,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) params.append("search", search);

        return {
          url: `/admin/users/deleted?role=xray_dr&role=ecg_dr&${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ADMIN_USER_LIST_API_RESPONSE) =>
        ADMIN_USER_LIST_TRANSFORM_RESPONSE(response),
      providesTags: ["User"],
    }),
    //
  }),
});
export const {
  useGetAdminUserListQuery,
  useGetAdminDeletedUserListQuery,
  useGetAdminDoctorDeletedListQuery,
} = AddUserApi;
