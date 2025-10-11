import { apiSlice } from "../../api/apiSlice";
import type {
  PatientHistoryListOptions,
  PatientHistoryResponse,
} from "./patientHistory.types";

export const PatientHistoryList = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPatientHistoryList: builder.query<PatientHistoryListOptions[], void>({
      query: () => ({
        url: "/agent/reference/history",
      }),
      transformResponse: (
        response: PatientHistoryResponse
      ): PatientHistoryListOptions[] =>
        response?.data?.map((doc) => ({
          id: doc.id,
          name: doc.name,
        })) || [],
    }),
  }),
});
export const { useGetPatientHistoryListQuery } = PatientHistoryList;
