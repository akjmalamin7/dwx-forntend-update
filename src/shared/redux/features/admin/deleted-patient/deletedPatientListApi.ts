import { apiSlice } from "../../api/apiSlice";
import {
  transformDeletedPatientResponse,
  type DeletedPatientApiResponse,
  type TransformedDeletedPatientResponse,
} from "./deletedPatientList.types";

export const DeletedPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDeletedPatientList: builder.query<
      TransformedDeletedPatientResponse,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        if (search) {
          params.append("search", search);
        }

        return {
          url: `/admin/patient/deleted/list?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: DeletedPatientApiResponse) => {
        return transformDeletedPatientResponse(response);
      },
      providesTags: ["DeletedPatientList"],
    }),
  }),
});

export const { useGetDeletedPatientListQuery } = DeletedPatientListApi;
