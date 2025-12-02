import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import {
  ADMIN_ALL_FORMATES_TRANSFORM_RESPONSE,
  type ADMIN_ALL_FORMATES_API_RESPONSE,
  type ADMIN_ALL_FORMATES_TRANSFORM_MODEL,
  type ADMIN_FORMATE_VIEW_RESPOONSE,
  type ADMIN_FORMATE_VIEW_TYPE,
} from "../model/schema";

export const FormatList = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* Get Format List */
    getAdminFormates: builder.query<
      ADMIN_ALL_FORMATES_TRANSFORM_MODEL,
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
          url: `/admin/format?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ADMIN_ALL_FORMATES_API_RESPONSE) => {
        return ADMIN_ALL_FORMATES_TRANSFORM_RESPONSE(response);
      },
      providesTags: [{ type: "FormatList", id: "LIST" }],
    }),
    /* Get Format  */
    getAdminFormat: builder.query<ADMIN_FORMATE_VIEW_TYPE, string>({
      query: (id: string) => ({
        url: `/admin/format/${id}`,
        method: "GET",
      }),
      transformResponse: (
        response: ADMIN_FORMATE_VIEW_RESPOONSE | ADMIN_FORMATE_VIEW_TYPE[]
      ) => {
        if (Array.isArray(response)) return response[0];
        return response.data ?? response;
      },
      providesTags: (result, _, id) =>
        result ? [{ type: "Format", id }] : [{ type: "Format", id }],
    }),

    /* Add Format  */
  }),
});
export const { useGetAdminFormatesQuery, useGetAdminFormatQuery } = FormatList;
