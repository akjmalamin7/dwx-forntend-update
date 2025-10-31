import { apiSlice } from "../../api/apiSlice";

export const DoctorUpdateBillActionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    doctorUpdateBillAction: builder.mutation({
      query: (data) => ({
        url: `/admin/doctorbill/updatebill`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useDoctorUpdateBillActionMutation } = DoctorUpdateBillActionApi;
