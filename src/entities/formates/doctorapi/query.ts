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
    getDoctorFormates: builder.query<
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
          url: `/doctor/format?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ADMIN_ALL_FORMATES_API_RESPONSE) => {
        return ADMIN_ALL_FORMATES_TRANSFORM_RESPONSE(response);
      },
      providesTags: [{ type: "FormatList", id: "LIST" }],
    }),
    /* Get Format  */
 getDoctorFormat: builder.query<ADMIN_FORMATE_VIEW_TYPE, string>({
  query: (id: string) => ({
    url: `/doctor/format/${id}`,
    method: "GET",
  }),
  transformResponse: (response: ADMIN_FORMATE_VIEW_TYPE[] | ADMIN_FORMATE_VIEW_RESPOONSE) => {
    // API returns array directly
    if (Array.isArray(response)) {
      return response[0];
    }
    // or wrapped in { data: [] }
    if (Array.isArray(response.data)) {
      return response.data[0];
    }
    return response.data;
  },
  providesTags: (_, __, id) => [{ type: "Format", id }],
}),

    /* Add Format  */
  }),
});
export const { useGetDoctorFormatesQuery, useGetDoctorFormatQuery } = FormatList;
