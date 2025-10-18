import { apiSlice } from "../../api/apiSlice";
import type { CheckedUserListOptions, CheckedUserListResponse } from "./checkedUserList.types";
 

export const checkedUserListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCheckedUserList: builder.query<CheckedUserListOptions[], void>({
      query: () => ({
        url: "/agent/checkuser",
      }),
      transformResponse: (
        response: CheckedUserListResponse
      ): CheckedUserListOptions[] =>
        response?.data?.map((item) => ({
          id: item.id,
          name: item.name,
          details: item.details,
        })) || [],
    }),
  }),
});
export const { useGetCheckedUserListQuery } = checkedUserListApi;
