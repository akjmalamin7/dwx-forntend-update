import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import {
  ADMIN_ALL_XRAY_NAME_LIST_TRANSFORM_RESPONSE,
  type ADMIN_ALL_XRAY_NAME_LIST_API_RESPONSE,
  type ADMIN_ALL_XRAY_NAME_LIST_TRANSFORM_MODEL,
} from "../model/schema";

const XraytypeList = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllXrayName: builder.query<
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
          url: `/admin/xraytype?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ADMIN_ALL_XRAY_NAME_LIST_API_RESPONSE) => {
        return ADMIN_ALL_XRAY_NAME_LIST_TRANSFORM_RESPONSE(response);
      },
      providesTags: (result) =>
        result
          ? [{ type: "XraytypeList", id: "LIST" }]
          : [{ type: "XraytypeList", id: "LIST" }],
    }),
  }),
});
export const { useGetAllXrayNameQuery } = XraytypeList;
