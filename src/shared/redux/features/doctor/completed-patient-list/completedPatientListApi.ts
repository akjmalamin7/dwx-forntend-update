import { apiSlice } from "../../api/apiSlice";
import {
  transformCompletedPatientResponse,
  type COMPLETED_PATIENT_TRANSFORM_MODEL,
  type CompletedPatientApiResponse,
} from "./completedPatientList.types";

export const CompletedPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompletedPatientList: builder.query<
      COMPLETED_PATIENT_TRANSFORM_MODEL[],
      void
    >({
      query: () => ({
        url: "/doctor/patient/completed",
        method: "GET",
      }),
      transformResponse: (response: CompletedPatientApiResponse) => {
        return transformCompletedPatientResponse(response.data);
      },
    }),
  }),
});
export const { useGetCompletedPatientListQuery } = CompletedPatientListApi;
