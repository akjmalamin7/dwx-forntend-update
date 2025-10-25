import { apiSlice } from "../../api/apiSlice";

export const AddPatientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPatient: builder.mutation({
      query: (data) => ({
        url: "/agent/patient",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Patient", id: "LIST" }],
    }),
    updatePatient: builder.mutation({
      query: ({ id, data }) => ({
        url: `/agent/patient/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Patient", id: "LIST" },
        { type: "Patient", id },
      ],
    }),
  }),
});
export const { useAddPatientMutation, useUpdatePatientMutation } =
  AddPatientApi;
