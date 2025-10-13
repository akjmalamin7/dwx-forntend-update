import { apiSlice } from "../../api/apiSlice";

export const AddPatientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPatient: builder.mutation({
      query: (data) => ({
        url: "/agent/patient",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useAddPatientMutation } = AddPatientApi;
