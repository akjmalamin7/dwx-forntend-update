import { apiSlice } from "./../../api/apiSlice";
export const DeleteAdminPateint = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    deleteAdminPatient: builder.mutation({
      query: (id) => ({
        url: `/admin/patient/${id}`,
        method: "DELETE",
      }),
    }),
    deleteAdminPatientAttachment: builder.mutation({
      query: (id) => ({
        url: `/admin/patient/attachment/${id}`,
        method: "DELETE",
      }),
    }),

  }),
});
export const { useDeleteAdminPatientMutation, useDeleteAdminPatientAttachmentMutation } = DeleteAdminPateint;
