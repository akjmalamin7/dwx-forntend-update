import { apiSlice } from "@/shared/redux/features/api/apiSlice";

export const referenceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPatient: builder.mutation({
      query: (referenceData) => ({
        url: "/agent/reference",
        method: "POST",
        body: referenceData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateReferenceMutation } = referenceApi;