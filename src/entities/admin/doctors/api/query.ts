import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import {
  ADMIN_DOCTOR_UPDATE_BILL_TRANSFORM_RESPONSE,
  type ADMIN_DOCTOR_UPDATE_BILL_TRANSFORM_MODEL,
  type ADMIN_UPDATE_BILL_API_RESPONSE,
} from "../model/schema";

export const AdminDoctorReportListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDoctorUdateBillList: builder.query<
      ADMIN_DOCTOR_UPDATE_BILL_TRANSFORM_MODEL,
      {
        page?: number;
        limit?: number;
        search?: string;
        doctorId?: string;
        month?: string;
      }
    >({
      query: ({ page = 1, limit = 10, search = "", doctorId, month }) => {
        const params = new URLSearchParams();
        if (doctorId) params.append("doctorId", doctorId);
        if (month) params.append("month", month);
        if (search) params.append("search", search);
        params.append("page", page.toString());
        params.append("limit", limit.toString());

        return {
          url: `/admin/doctorbill/reportlist?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ADMIN_UPDATE_BILL_API_RESPONSE) => {
        return ADMIN_DOCTOR_UPDATE_BILL_TRANSFORM_RESPONSE(response);
      },
    }),
  }),
});

export const { useGetAdminDoctorUdateBillListQuery } = AdminDoctorReportListApi;
