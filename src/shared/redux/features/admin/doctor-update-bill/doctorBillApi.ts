import { apiSlice } from "../../api/apiSlice";
import {
  transformDoctorBillResponse,
  type DOCTOR_BILL_TRANSFORM_MODEL,
  type DOCTOR_BILL_RESPONSE,
} from "./doctorBill.types";

export const AdminDoctorBillApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDoctorBill: builder.query<
      DOCTOR_BILL_TRANSFORM_MODEL[],
      string
    >({
      query: (doctor_id: string) => ({
        url: `/admin/doctorbill/reportlist/${doctor_id}`,
        method: "GET",
      }),
      transformResponse: (response: DOCTOR_BILL_RESPONSE) => {
        return transformDoctorBillResponse(response.data);
      },
    }),
  }),
});

export const { useGetAdminDoctorBillQuery } = AdminDoctorBillApi;
