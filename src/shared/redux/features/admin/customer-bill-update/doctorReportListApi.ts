import { apiSlice } from "../../api/apiSlice";
import {  
  transformDoctorXrayResponse,
  type DOCTOR_XRAY_TRANSFORM_MODEL,
  type DOCTOR_XRAY_RESPONSE,
} from "./doctorBill.types";

export const AdminCustomerReportListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminCustomerReportList: builder.query<
      DOCTOR_XRAY_TRANSFORM_MODEL[],
       { userId: string; month: string }
    >({
      query: ({ userId, month }) => ({
        url: `/admin/bill/reportlist/?userId=${userId}&month=${month}`,
        method: "GET",
      }),
      transformResponse: (response: DOCTOR_XRAY_RESPONSE) => {
        return transformDoctorXrayResponse(response.data);
      },
    }),
  }),
});

export const { useGetAdminCustomerReportListQuery } = AdminCustomerReportListApi;
