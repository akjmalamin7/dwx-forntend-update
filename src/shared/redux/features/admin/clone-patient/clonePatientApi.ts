import { apiSlice } from "../../api/apiSlice";

export const clonePatientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createClonePatient: builder.mutation({
      query: (data) => ({
        url: "/admin/patient",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useCreateClonePatientMutation } = clonePatientApi;
