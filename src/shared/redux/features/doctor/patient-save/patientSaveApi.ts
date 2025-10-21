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
    updatePatient: builder.mutation({
      query: (data) => ({
        url: `/doctor/patient/${data._id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const { useSavePatientMutation, useUpdatePatientMutation } =
  PatientSaveApi;
