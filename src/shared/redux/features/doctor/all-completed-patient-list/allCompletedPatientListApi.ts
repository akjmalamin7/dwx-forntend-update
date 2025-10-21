import { apiSlice } from "../../api/apiSlice";
import {
  transformAllCompletedPatientResponse,
  type ALLCOMPLETED_PATIENT_TRANSFORM_MODEL,
  type AllCompletedPatientApiResponse,
} from "./allCompletedPatientList.types";

export const AllCompletedPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompletedPatientList: builder.query<
      ALLCOMPLETED_PATIENT_TRANSFORM_MODEL[],
      void
    >({
      query: () => ({
        url: "/doctor/patient/completed/all?page=1&limit=100",
        method: "GET",
      }),
      transformResponse: (response: AllCompletedPatientApiResponse) => {
        return transformAllCompletedPatientResponse(response.data);
      },
    }),
  }),
});
export const { useGetAllCompletedPatientListQuery } = AllCompletedPatientListApi;
