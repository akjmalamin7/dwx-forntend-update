import { apiSlice } from "../../api/apiSlice";
import {
  ADMIN_TRANSFORM_DOCTOR_LIST_RESPONSE,
  type ADMIN_DOCTOR_LIST_API_RESPONSE_MODEL,
  type ADMIN_TRANSFORM_DOCTOR_LIST_MODEL,
} from "./doctorList.types";

export const UpdateDoctorListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUpdateDoctorList: builder.query<
      ADMIN_TRANSFORM_DOCTOR_LIST_MODEL,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) {
          params.append("search", search);
        }
        return {
          url: `/admin/users/all?role=xray_dr&role=ecg_dr&${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ADMIN_DOCTOR_LIST_API_RESPONSE_MODEL) =>
        ADMIN_TRANSFORM_DOCTOR_LIST_RESPONSE(response),
    }),
  }),
});

export const { useGetUpdateDoctorListQuery } = UpdateDoctorListApi;
