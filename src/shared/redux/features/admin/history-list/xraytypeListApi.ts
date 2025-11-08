import { apiSlice } from "../../api/apiSlice";
import type { HistoryListOPtions, HistoryListResponse } from "./historyList.types";
 

export const HistoryList = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHistoryList: builder.query<HistoryListOPtions[], void>({
      query: () => ({
        url: "/admin/history",
      }),
      transformResponse: (
        response: HistoryListResponse
      ): HistoryListOPtions[] =>
        response?.data?.map((history) => ({
          id: history.id,
          name: history.name,
        })) || [],
      providesTags: (result) =>
        result
          ? [{ type: "HistoryList", id: "LIST" }]
          : [{ type: "HistoryList", id: "LIST" }],
    }),
  }),
});
export const { useGetHistoryListQuery } = HistoryList;
