import { apiSlice } from "../../api/apiSlice";
import {  
  transformDoctorXrayResponse,
  type DOCTOR_XRAY_TRANSFORM_MODEL,
  type DOCTOR_XRAY_RESPONSE,
} from "./doctorBill.types";

export const AdminDoctorReportListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDoctorReportList: builder.query<
      DOCTOR_XRAY_TRANSFORM_MODEL[],
       { doctorId: string; month: string }
    >({
      query: ({ doctorId, month }) => ({
        url: `/admin/doctorbill/reportlist/?doctorId=${doctorId}&month=${month}&page=1&limit=100`,
        method: "GET",
      }),
      transformResponse: (response: DOCTOR_XRAY_RESPONSE) => {
        return transformDoctorXrayResponse(response.data);
      },
    }),
  }),
});

export const { useGetAdminDoctorReportListQuery } = AdminDoctorReportListApi;
