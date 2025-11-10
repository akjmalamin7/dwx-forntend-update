import { apiSlice } from "../../api/apiSlice";
import {
  transformCompletedPatientResponse,
  type COMPLETED_PATIENT_TRANSFORM_MODEL,
  type CompletedPatientApiResponse,
} from "./completedPatientList.types";

export const ArchivePatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArchivePatientList: builder.query<
      COMPLETED_PATIENT_TRANSFORM_MODEL[],
      string | undefined
    >({
      query: (month) => ({
        url: `/admin/patient/filter?month=${month}&page=1&limit=100`,
        method: "GET",
      }),
      transformResponse: (response: CompletedPatientApiResponse) => {
        return transformCompletedPatientResponse(response.data);
      },
      providesTags: ["CompletedPatient"],
    }),
  }),
});
export const { useGetArchivePatientListQuery } = ArchivePatientListApi;
