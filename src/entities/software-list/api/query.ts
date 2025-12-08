import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import {
  ADMIN_SOFTWATE_LIST_TRANSFORM_RESPONSE,
  type ADMIN_SOFTWATE_LIST_API_RESPONSE,
  type ADMIN_SOFTWATE_LIST_TRANSFORM_MODEL,
} from "../model/schema";

const SoftwareList = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSoftware: builder.query<
      ADMIN_SOFTWATE_LIST_TRANSFORM_MODEL,
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
          url: `/admin/software?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ADMIN_SOFTWATE_LIST_API_RESPONSE) => {
        return ADMIN_SOFTWATE_LIST_TRANSFORM_RESPONSE(response);
      },
      providesTags: (result) =>
        result
          ? [{ type: "SoftwareList", id: "LIST" }]
          : [{ type: "SoftwareList", id: "LIST" }],
    }),
  }),
});
export const { useGetSoftwareQuery } = SoftwareList;
