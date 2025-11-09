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
        url: "/agent/patient?page=1&limit=100",
        method: "GET",
      }),
      transformResponse: (response: PendingPatientApiResponse) => {
        return transformPendingPatientResponse(response.data);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Patient" as const, id })),
              { type: "Patient", id: "LIST" },
            ]
          : [{ type: "Patient", id: "LIST" }],
    }),
  }),
});
export const { useGetPendingPatientListQuery } = PendingPatientListApi;
