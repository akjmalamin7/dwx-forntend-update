import { apiSlice } from "../../api/apiSlice";
import {
  transformDoctorBillResponse,
  type DOCTOR_BILL_TRANSFORM_MODEL,
  type DOCTOR_BILL_RESPONSE,
} from "./customerBill.types";

export const AdminCustomerBillApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminCustomerBill: builder.query<
      DOCTOR_BILL_TRANSFORM_MODEL[],
      string
    >({
      query: (user_id: string) => ({
        url: `/admin/bill/${user_id}`,
        method: "GET",
      }),
      transformResponse: (response: DOCTOR_BILL_RESPONSE) => {
        return transformDoctorBillResponse(response.data);
      },
    }),
  }),
});

export const { useGetAdminCustomerBillQuery } = AdminCustomerBillApi;
