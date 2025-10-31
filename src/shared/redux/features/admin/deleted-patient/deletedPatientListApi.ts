import { apiSlice } from "../../api/apiSlice";
import {
  transformDeletedPatientResponse,
  type DELETED_PATIENT_TRANSFORM_MODEL,
  type DeletedPatientApiResponse,
} from "./deletedPatientList.types";

export const DeletedPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDeletedPatientList: builder.query<
      DELETED_PATIENT_TRANSFORM_MODEL[],
      void
    >({
      query: () => ({
        url: "/admin/patient/deleted/list?page=1&limit=100",
        method: "GET",
      }),
      transformResponse: (response: DeletedPatientApiResponse) => {
        return transformDeletedPatientResponse(response.data);
      },
      providesTags: ["DeletedPatientList"],
    }),
  }),
});
export const { useGetDeletedPatientListQuery } = DeletedPatientListApi;
