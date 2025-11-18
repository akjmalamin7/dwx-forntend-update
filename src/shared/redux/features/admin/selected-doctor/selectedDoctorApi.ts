import { apiSlice } from "../../api/apiSlice";

export const SelectedDoctorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    selectdDoctor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/patient/selectdoctor/${id}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: (_result, _error, { id }) => [
        { type: "PendingPatient", id: "LIST" },
        { type: "PendingPatient", id },
      ],
    }),
  }),
});
export const { useSelectdDoctorMutation } = SelectedDoctorApi;
