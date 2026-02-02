import { apiSlice } from "../../api/apiSlice";

export const PatientSaveApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    savePatient: builder.mutation({
      query: (data) => ({
        url: "/doctor/patient",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DoctorPatientList", "Bill", "PrintBillByMonth"],
    }),
    updatePatient: builder.mutation({
      query: (data) => ({
        url: `/doctor/patient/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["DoctorPatientList", "Bill", "PrintBillByMonth"],
    }),
  }),
});
export const { useSavePatientMutation, useUpdatePatientMutation } =
  PatientSaveApi;
