import { apiSlice } from "../../api/apiSlice";
import type {
  XraytypeListOPtions,
  XraytypeListResponse,
} from "./xraytypeList.types";

export const XraytypeList = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getXraytypeList: builder.query<XraytypeListOPtions[], void>({
      query: () => ({
        url: "/admin/xraytype",
      }),
      transformResponse: (
        response: XraytypeListResponse
      ): XraytypeListOPtions[] =>
        response?.data?.map((xray) => ({
          id: xray.id,
          name: xray.name,
        })) || [],
      providesTags: (result) =>
        result
          ? [{ type: "XraytypeList", id: "LIST" }]
          : [{ type: "XraytypeList", id: "LIST" }],
    }),
  }),
});
export const { useGetXraytypeListQuery } = XraytypeList;
