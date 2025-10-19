import { apiSlice } from "../../api/apiSlice";
import {
  transformPendingPatientResponse,
  type PENDING_PATIENT_TRANSFORM_MODEL,
  type PendingPatientApiResponse,
} from "./pendingPatientList.types";

export const PendingPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPendingPatientList: builder.query<
      PENDING_PATIENT_TRANSFORM_MODEL[],
      void
    >({
      query: () => ({
        url: "/doctor/patient",
        method: "GET",
      }),
      transformResponse: (response: PendingPatientApiResponse) => {
        return transformPendingPatientResponse(response.data);
      },
    }),
  }),
});
export const { useGetPendingPatientListQuery } = PendingPatientListApi;
