import { apiSlice } from "../../api/apiSlice";

export const DeleteBackPatientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteBackPatient: builder.mutation({
      query: (data) => ({
        url: "/admin/patient/deleteback",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DeletedPatientList"],
    }),
  }),
});
export const { useDeleteBackPatientMutation } = DeleteBackPatientApi;
