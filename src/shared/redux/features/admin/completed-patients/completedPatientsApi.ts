import { apiSlice } from "../../api/apiSlice";
import {
  transformCompletedPatientResponse,
  type COMPLETED_PATIENT_TRANSFORM_MODEL,
  type CompletedPatientApiResponse,
} from "./completedPatients.types";

export const CompletedPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompletedPatientList: builder.query<
      COMPLETED_PATIENT_TRANSFORM_MODEL[],
      void
    >({
      query: () => ({
        url: "/admin/patient/completed?page=1&limit=100",
        method: "GET",
      }),
      transformResponse: (response: CompletedPatientApiResponse) => {
        return transformCompletedPatientResponse(response.data);
      },
      providesTags: ["CompletedPatient"],
    }),
  }),
});
export const { useGetCompletedPatientListQuery } = CompletedPatientListApi;
