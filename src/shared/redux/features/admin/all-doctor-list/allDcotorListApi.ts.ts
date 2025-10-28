import { apiSlice } from "../../api/apiSlice";
import type { ALL_DOCTOR_LIST_RESPONSE } from "./allDoctorList.type";

export const AllDoctorListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allDoctorList: builder.query<ALL_DOCTOR_LIST_RESPONSE, void>({
      query: () => ({
        url: "/admin/users/all?role=xray_dr&role=ecg_dr",
        method: "GET",
      }),
    }),
  }),
});
export const { useAllDoctorListQuery } = AllDoctorListApi;
