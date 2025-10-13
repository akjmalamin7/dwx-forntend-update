import { apiSlice } from "@/shared/redux/features/api/apiSlice";

export const patientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPatient: builder.mutation({
      query: (patientData) => ({
        url: "/agent/patient",
        method: "POST",
        body: patientData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreatePatientMutation } = patientApi;