import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import {
  ADMIN_CUSTOMER_BILL_DOCTOR_TRANSFORM_RESPONSE,
  ADMIN_CUSTOMER_BILL_REQUEST_TRANSFORM_RESPONSE,
  type ADMIN_BILL_API_RESPONSE,
  type ADMIN_CUSTOMER_BILL_DOCTOR_API_RESPONSE,
  type ADMIN_CUSTOMER_BILL_DOCTOR_TRANSFORM_MODEL,
  type ADMIN_CUSTOMER_BILL_REQUEST_API_RESPONSE,
  type ADMIN_CUSTOMER_BILL_REQUEST_TRANSFORM_MODEL,
} from "../model/schema";

export const AdminDoctorBillingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDoctorBillingList: builder.query<
      ADMIN_CUSTOMER_BILL_DOCTOR_TRANSFORM_MODEL,
      {
        page?: number;
        limit?: number;
        userId?: string;
        search?: string;
        month?: string;
      }
    >({
      query: ({ page = 1, limit = 10, userId, search = "", month }) => {
        const params = new URLSearchParams();
        if (search) {
          params.append("search", search.toString());
        }
        if (userId) {
          params.append("userId", userId.toString());
        }
        if (month) {
          params.append("month", month.toString());
        }
        params.append("page", page.toString());
        params.append("limit", limit.toString());
        return {
          url: `/admin/bill/reportlist/?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: ADMIN_CUSTOMER_BILL_DOCTOR_API_RESPONSE
      ) => {
        return ADMIN_CUSTOMER_BILL_DOCTOR_TRANSFORM_RESPONSE(response);
      },
    }),
   getCustomerBillListByMonth: builder.query<
      ADMIN_CUSTOMER_BILL_REQUEST_TRANSFORM_MODEL,
      { page?: number; limit?: number; search?: string; month?: string }
    >({
      query: ({ page = 1, limit = 10, search = "", month }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) params.append("search", search);
        return {
          url: `/admin/bill/list/${month}?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: ADMIN_CUSTOMER_BILL_REQUEST_API_RESPONSE
      ) => {
        return ADMIN_CUSTOMER_BILL_REQUEST_TRANSFORM_RESPONSE(response);
      },
      providesTags: ["Bill"],
    }),
    getCustomerBillRequestByMonth: builder.query<
      ADMIN_CUSTOMER_BILL_REQUEST_TRANSFORM_MODEL,
      { page?: number; limit?: number; search?: string; month?: string }
    >({
      query: ({ page = 1, limit = 10, search = "", month }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) params.append("search", search);
        return {
          url: `/admin/bill/billrequest/${month}?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: ADMIN_CUSTOMER_BILL_REQUEST_API_RESPONSE
      ) => {
        return ADMIN_CUSTOMER_BILL_REQUEST_TRANSFORM_RESPONSE(response);
      },
      providesTags: ["Bill"],
    }),
    getCustomerTransactionHistory: builder.query<
      ADMIN_CUSTOMER_BILL_REQUEST_TRANSFORM_MODEL,
      { page?: number; limit?: number; search?: string; month?: string }
    >({
      query: ({ page = 1, limit = 10, search = "", month }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) params.append("search", search);
        return {
          url: `/admin/bill/trangection/${month}?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: ADMIN_CUSTOMER_BILL_REQUEST_API_RESPONSE
      ) => {
        return ADMIN_CUSTOMER_BILL_REQUEST_TRANSFORM_RESPONSE(response);
      },
      providesTags: ["Bill"],
    }),
    getAdminBillHistory: builder.query<ADMIN_BILL_API_RESPONSE, string>({
      query: (userId) => ({
        url: `/admin/bill/billhistory/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAdminDoctorBillingListQuery,
  useGetCustomerBillListByMonthQuery,
  useGetCustomerBillRequestByMonthQuery,
  useGetCustomerTransactionHistoryQuery,
  useLazyGetAdminBillHistoryQuery,
} = AdminDoctorBillingApi;
