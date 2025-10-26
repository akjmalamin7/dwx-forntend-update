import { apiSlice } from "../../api/apiSlice";
import type {
  ReferenceListOPtions,
  ReferenceListResponse,
} from "./referenceList.types";

export const ReferenceList = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReferenceList: builder.query<ReferenceListOPtions[], void>({
      query: () => ({
        url: "/agent/reference",
      }),
      transformResponse: (
        response: ReferenceListResponse
      ): ReferenceListOPtions[] =>
        response?.data?.map((doc) => ({
          id: doc.id,
          name: doc.name,
        })) || [],
      providesTags: (result) =>
        result
          ? [{ type: "ReferenceList", id: "LIST" }]
          : [{ type: "ReferenceList", id: "LIST" }],
    }),
  }),
});
export const { useGetReferenceListQuery } = ReferenceList;
