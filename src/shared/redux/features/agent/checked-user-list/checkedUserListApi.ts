import { apiSlice } from "../../api/apiSlice";
import { transformCheckedUserListResponse, type CHECKEDUSER_TRANSFORM_MODEL, type CheckedUserListApiResponse } from "./checkedUserList.types";
  
export const CheckedUserListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCheckedUserList: builder.query<
      CHECKEDUSER_TRANSFORM_MODEL[],
      void
    >({
      query: () => ({
        url: "/agent/checkuser",
        method: "GET",
      }),
      transformResponse: (response: CheckedUserListApiResponse) => {
        return transformCheckedUserListResponse(response.data);
      },
    }),
  }),
});
export const { useGetCheckedUserListQuery } = CheckedUserListApi;
