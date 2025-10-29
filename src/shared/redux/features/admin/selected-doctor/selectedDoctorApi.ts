import { apiSlice } from "../../api/apiSlice";

export const SelectedDoctorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    selectdDoctor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/patient/selectdoctor/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PendingPatient"],
    }),
  }),
});
export const { useSelectdDoctorMutation } = SelectedDoctorApi;
