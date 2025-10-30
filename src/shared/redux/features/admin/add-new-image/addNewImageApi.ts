import { apiSlice } from "@/shared/redux/features/api/apiSlice";

export const AddNewImageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewImage: builder.mutation({
      query: (data) => ({
        url: "/admin/patient/attachmentsave",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useAddNewImageMutation } = AddNewImageApi;
