import { apiSlice } from "../../api/apiSlice";
import {
  ADMIN_TRANSFORM_LOAN_EMPLOYEE_LIST_RESPONSE,
  ADMIN_TRANSFORM_LOAN_DETAIL_RESPONSE,
  ADMIN_TRANSFORM_LOAN_REPAYMENT_HISTORY_RESPONSE,
  type ADMIN_LOAN_EMPLOYEE_LIST_API_RESPONSE_MODEL,
  type ADMIN_TRANSFORM_LOAN_EMPLOYEE_LIST_MODEL,
  type ADMIN_LOAN_DETAIL_API_RESPONSE_MODEL,
  type ADMIN_TRANSFORM_LOAN_DETAIL_MODEL,
  type ADMIN_LOAN_REPAYMENT_HISTORY_API_RESPONSE_MODEL,
  type ADMIN_TRANSFORM_LOAN_REPAYMENT_HISTORY_MODEL,
  type ADMIN_LOAN_CREATE_PAYLOAD,
  type ADMIN_LOAN_REPAY_PAYLOAD,
  type ADMIN_LOAN_MUTATION_RESPONSE_MODEL,
  type ADMIN_LOAN_REPAY_MUTATION_RESPONSE_MODEL,
} from "./loan.types";

export const LoanApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------- Loan: GET employee-wise summary list ---------- */
    getLoanList: builder.query<
      ADMIN_TRANSFORM_LOAN_EMPLOYEE_LIST_MODEL,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) params.append("search", search);

        return {
          url: `/admin/loan/?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: ADMIN_LOAN_EMPLOYEE_LIST_API_RESPONSE_MODEL
      ) => ADMIN_TRANSFORM_LOAN_EMPLOYEE_LIST_RESPONSE(response),
      providesTags: [{ type: "Loan", id: "LIST" }],
    }),

    /* ---------- Loan: GET detail by employee id ---------- */
    getLoanDetailByEmployee: builder.query<
      ADMIN_TRANSFORM_LOAN_DETAIL_MODEL,
      { employeeId: string; page?: number; limit?: number }
    >({
      query: ({ employeeId, page = 1, limit = 10 }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        return {
          url: `/admin/loan/detail/${employeeId}?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ADMIN_LOAN_DETAIL_API_RESPONSE_MODEL) =>
        ADMIN_TRANSFORM_LOAN_DETAIL_RESPONSE(response),
      providesTags: (_result, _error, { employeeId }) => [
        { type: "Loan", id: employeeId },
      ],
    }),

    /* ---------- Loan: GET repayment history by loan id ---------- */
    getLoanRepaymentHistory: builder.query<
      ADMIN_TRANSFORM_LOAN_REPAYMENT_HISTORY_MODEL,
      { loanId: string; page?: number; limit?: number }
    >({
      query: ({ loanId, page = 1, limit = 10 }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        return {
          url: `/admin/loan/repay/history/${loanId}?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: ADMIN_LOAN_REPAYMENT_HISTORY_API_RESPONSE_MODEL
      ) => ADMIN_TRANSFORM_LOAN_REPAYMENT_HISTORY_RESPONSE(response),
      providesTags: (_result, _error, { loanId }) => [
        { type: "LoanRepayment", id: loanId },
      ],
    }),

    /* ---------- Loan: POST create new loan ---------- */
    createLoan: builder.mutation<
      ADMIN_LOAN_MUTATION_RESPONSE_MODEL,
      ADMIN_LOAN_CREATE_PAYLOAD
    >({
      query: (data) => ({
        url: "/admin/loan",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { employee_id }) => [
        { type: "Loan", id: "LIST" },
        { type: "Loan", id: employee_id },
      ],
    }),

    /* ---------- Loan: POST repay ---------- */
    repayLoan: builder.mutation<
      ADMIN_LOAN_REPAY_MUTATION_RESPONSE_MODEL,
      ADMIN_LOAN_REPAY_PAYLOAD
    >({
      query: (data) => ({
        url: "/admin/loan/repay",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { loan_id }) => [
        { type: "Loan", id: "LIST" },
        { type: "LoanRepayment", id: loan_id },
      ],
    }),
  }),
});

export const {
  useGetLoanListQuery,
  useGetLoanDetailByEmployeeQuery,
  useGetLoanRepaymentHistoryQuery,
  useCreateLoanMutation,
  useRepayLoanMutation,
} = LoanApi;