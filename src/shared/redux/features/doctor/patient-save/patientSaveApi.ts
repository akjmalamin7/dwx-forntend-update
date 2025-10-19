import { apiSlice } from "../../api/apiSlice";

export const PatientSaveApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    savePatient: builder.mutation({
      query: (data) => ({
        url: "/doctor/patient",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useSavePatientMutation } = PatientSaveApi;
