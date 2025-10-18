import { apiSlice } from "../../api/apiSlice";
import { transformPrevCompletedPatientResponse, type PREV_COMPLETED_PATIENT_TRANSFORM_MODEL, type PrevCompletedPatientApiResponse } from "./previousPatientList.types";
 
export const PreviousMonthPatientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPreviousMonthPatient: builder.query<
      PREV_COMPLETED_PATIENT_TRANSFORM_MODEL[],
      void
    >({
      query: () => ({
        url: "/agent/patient/completed/previous?page=1&limit=100",
        method: "GET",
      }),
      transformResponse: (response: PrevCompletedPatientApiResponse) => {
        return transformPrevCompletedPatientResponse(response.data);
      },
    }),
  }),
});
export const { useGetPreviousMonthPatientQuery } = PreviousMonthPatientApi;
