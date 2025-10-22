import { apiSlice } from "../../api/apiSlice";
import type {
  FORMATE_VIEW_RESPOONSE,
  FORMATE_VIEW_TYPE,
  FormatListOptions,
  FormatListResponse,
} from "./formatList.types";

export const FormatList = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* Get Format List */
    getFormatList: builder.query<FormatListOptions[], void>({
      query: () => ({
        url: "/doctor/format",
        method: "GET",
      }),
      transformResponse: (response: FormatListResponse): FormatListOptions[] =>
        response?.data?.map((format) => ({
          id: format._id,
          title: format.title,
        })) || [],
      providesTags: [{ type: "FormatList", id: "LIST" }],
    }),
    /* Get Format  */
    getFormat: builder.query<FORMATE_VIEW_TYPE, string>({
      query: (id: string) => ({
        url: `/doctor/format/${id}`,
        method: "GET",
      }),
      transformResponse: (
        response: FORMATE_VIEW_RESPOONSE
      ): FORMATE_VIEW_TYPE => {
        if (
          response?.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          return response.data[0];
        }
        throw new Error("Format not found");
      },
      providesTags: (result, _, id) =>
        result ? [{ type: "Format", id }] : [{ type: "Format", id }],
    }),
    /* Add Format  */
    addFormat: builder.mutation({
      query: (data) => ({
        url: "/doctor/format",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "FormatList", id: "LIST" }],
    }),
    /* Update Format */
    updateFormat: builder.mutation({
      query: (data) => ({
        url: `/doctor/format/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "FormatList", id: "LIST" },
        { type: "Format", id },
      ],
    }),
    deleteFormat: builder.mutation({
      query: (id) => ({
        url: `/doctor/format/${id}`,
        method: "DELETE",
        body: { _id: id },
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "FormatList", id: "LIST" },
        { type: "Format", id },
      ],
    }),
  }),
});
export const {
  useGetFormatListQuery,
  useGetFormatQuery,
  useAddFormatMutation,
  useUpdateFormatMutation,
  useDeleteFormatMutation,
} = FormatList;
