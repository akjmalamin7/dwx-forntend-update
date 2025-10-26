import { apiSlice } from "../../api/apiSlice";
import {
  transformUpdateDoctorResponse,
  type DOCTOR_TRANSFORM_MODEL,
  type UpdateDoctorApiResponse,
} from "./updateDoctorList.types";

export const UpdateDoctorListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUpdateDoctorList: builder.query<
      DOCTOR_TRANSFORM_MODEL[],
      void
    >({
      query: () => ({
        url: "/admin/users/all?role=xray_dr&role=ecg_dr",
        method: "GET",
      }),
      transformResponse: (response: UpdateDoctorApiResponse) => {
        return transformUpdateDoctorResponse(response.data);
      },
    }),
  }),
});
export const { useGetUpdateDoctorListQuery } = UpdateDoctorListApi;
