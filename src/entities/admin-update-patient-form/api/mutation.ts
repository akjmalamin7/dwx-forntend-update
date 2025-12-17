import { apiSlice } from "@/shared/redux/features/api/apiSlice";

export const AdminUpdatePatientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminUpdatePatient: builder.mutation({
      query: ({ patient_id, data }) => ({
        url: `/admin/patient/${patient_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PendingPatient", "Patient"],
    }),
  }),
});
export const { useAdminUpdatePatientMutation } = AdminUpdatePatientApi;
