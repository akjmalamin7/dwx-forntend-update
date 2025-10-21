import { apiSlice } from "../../api/apiSlice";
import type {
  FormatListOptions,
  FormatListResponse,
} from "./formatList.types";

export const FormatList = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFormatList: builder.query<FormatListOptions[], void>({
      query: () => ({
        url: "/doctor/format",
      }),
      transformResponse: (
        response: FormatListResponse
      ): FormatListOptions[] =>
        response?.data?.map((format) => ({
          id: format._id,
          title: format.title,
        })) || [],
    }),
  }),
});
export const { useGetFormatListQuery } = FormatList;
