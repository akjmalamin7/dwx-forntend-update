import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import type { ADMIN_ALL_XRAY_NAME_LIST_TRANSFORM_MODEL } from "../../all-xray-name/model/schema";
import {
  ADMIN_HISTORY_LIST_TRANSFORM_RESPONSE,
  type ADMIN_HISTORY_LIST_API_RESPONSE,
} from "../model/schema";

export const HistoryList = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminHistoryList: builder.query<
      ADMIN_ALL_XRAY_NAME_LIST_TRANSFORM_MODEL,
      {
        page?: number;
        limit?: number;
        search?: string;
      }
    >({
      query: ({ page = 1, limit = 10, search = "" }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        return {
          url: `/admin/history?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ADMIN_HISTORY_LIST_API_RESPONSE) => {
        return ADMIN_HISTORY_LIST_TRANSFORM_RESPONSE(response);
      },
      providesTags: (result) =>
        result
          ? [{ type: "HistoryList", id: "LIST" }]
          : [{ type: "HistoryList", id: "LIST" }],
    }),
  }),
});
export const { useGetAdminHistoryListQuery } = HistoryList;
