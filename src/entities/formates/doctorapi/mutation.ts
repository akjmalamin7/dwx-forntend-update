import { apiSlice } from "@/shared/redux/features/api/apiSlice";

export const FormatList = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* Add Format  */
    addDoctorFormat: builder.mutation({
      query: (data) => ({
        url: "/doctor/format",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "FormatList", id: "LIST" }],
    }),
    /* Update Format */
    updateDoctorFormat: builder.mutation({
      query: (data) => ({
        url: `/doctor/format/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "FormatList", id: "LIST" },
        { type: "Format", id },
      ],
    }),
    deleteDoctorFormat: builder.mutation({
      query: (id) => ({
        url: `/doctor/format/${id}`,
        method: "DELETE",
        body: { _id: id },
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "FormatList", id: "LIST" },
        { type: "Format", id },
      ],
    }),
  }),
});
export const {
  useAddDoctorFormatMutation,
  useUpdateDoctorFormatMutation,
  useDeleteDoctorFormatMutation,
} = FormatList;
