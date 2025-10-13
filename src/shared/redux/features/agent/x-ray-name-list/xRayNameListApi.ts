import { apiSlice } from "../../api/apiSlice";
import type {
  XrayNameListOPtions,
  XrayNameListResponse,
} from "./xRayNameList.type";

export const XrayNameList = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getXrayNameList: builder.query<XrayNameListOPtions[], void>({
      query: () => ({
        url: "/agent/reference/xraylist",
      }),
      transformResponse: (
        response: XrayNameListResponse
      ): XrayNameListOPtions[] =>
        response?.data?.map((xr) => ({ id: xr._id, name: xr.name })),
    }),
  }),
});
export const { useGetXrayNameListQuery } = XrayNameList;
