import { apiSlice } from "../../api/apiSlice";
import { transformAllCompletedPatientResponse, type ALLCOMPLETED_PATIENT_TRANSFORM_MODEL, type AllCompletedPatientApiResponse } from "../all-completed-patient-list/allCompletedPatientList.types";
 
export const PreviousMonthPatientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPreviousMonthPatient: builder.query<
      ALLCOMPLETED_PATIENT_TRANSFORM_MODEL[],
      void
    >({
      query: () => ({
        url: "/agent/patient/completed/previous?page=1&limit=100",
        method: "GET",
      }),
      transformResponse: (response: AllCompletedPatientApiResponse) => {
        return transformAllCompletedPatientResponse(response.data);
      },
    }),
  }),
});
export const { useGetPreviousMonthPatientQuery } = PreviousMonthPatientApi;
