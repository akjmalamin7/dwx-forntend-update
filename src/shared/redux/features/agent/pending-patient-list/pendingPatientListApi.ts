import { apiSlice } from "../../api/apiSlice";
import {
  transformPendingPatientResponse,
  type AGENT_PENDING_PATIENT_MODEL,
  type PendingPatientApiResponse,
} from "./pendingPatientList.types";

export const AgentPendingPatientListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPendingPatientList: builder.query<AGENT_PENDING_PATIENT_MODEL[], void>({
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
export const { useGetPendingPatientListQuery } = AgentPendingPatientListApi;
