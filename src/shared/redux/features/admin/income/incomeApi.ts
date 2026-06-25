import { apiSlice } from "../../api/apiSlice";
import {
  ADMIN_TRANSFORM_INCOME_LIST_RESPONSE,
  type ADMIN_INCOME_LIST_API_RESPONSE_MODEL,
  type ADMIN_TRANSFORM_INCOME_LIST_MODEL,
  type ADMIN_INCOME_CATEGORY_LIST_API_RESPONSE_MODEL,
  type IncomeCategoryOption,
  type ADMIN_INCOME_CATEGORY_CREATE_PAYLOAD,
  type ADMIN_INCOME_CATEGORY_MUTATION_RESPONSE_MODEL,
  type ADMIN_INCOME_CREATE_PAYLOAD,
  type ADMIN_INCOME_UPDATE_PAYLOAD,
  type ADMIN_INCOME_MUTATION_RESPONSE_MODEL,
  type ADMIN_INCOME_DELETE_RESPONSE_MODEL,
  type ADMIN_INCOME_SUMMARY_API_RESPONSE_MODEL,
  type ADMIN_FINANCIAL_SUMMARY_API_RESPONSE_MODEL,
} from "./income.types";

export const IncomeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------- Category: GET list ---------- */
    getIncomeCategoryList: builder.query<IncomeCategoryOption[], void>({
      query: () => ({
        url: "/admin/income/category",
        method: "GET",
      }),
      transformResponse: (
        response: ADMIN_INCOME_CATEGORY_LIST_API_RESPONSE_MODEL
      ): IncomeCategoryOption[] =>
        response?.data?.map((cat) => ({
          id: cat._id,
          name: cat.name,
        })) || [],
      providesTags: [{ type: "IncomeCategory", id: "LIST" }],
    }),

    /* ---------- Category: POST create ---------- */
    createIncomeCategory: builder.mutation<
      ADMIN_INCOME_CATEGORY_MUTATION_RESPONSE_MODEL,
      ADMIN_INCOME_CATEGORY_CREATE_PAYLOAD
    >({
      query: (data) => ({
        url: "/admin/income/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "IncomeCategory", id: "LIST" }],
    }),

    /* ---------- Category: DELETE ---------- */
    deleteIncomeCategory: builder.mutation<
      ADMIN_INCOME_DELETE_RESPONSE_MODEL,
      string
    >({
      query: (id) => ({
        url: `/admin/income/category/${id}`,
        method: "DELETE",
        body: { _id: id },
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "IncomeCategory", id: "LIST" },
        { type: "IncomeCategory", id },
      ],
    }),

    /* ---------- Income: GET list (pagination) ---------- */
    getIncomeList: builder.query<
      ADMIN_TRANSFORM_INCOME_LIST_MODEL,
      {
        page?: number;
        limit?: number;
        search?: string;
        month?: string;
        category_id?: string;
      }
    >({
      query: ({ page = 1, limit = 10, search = "", month = "", category_id = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) params.append("search", search);
        if (month) params.append("month", month);
        if (category_id) params.append("category_id", category_id);

        return {
          url: `/admin/income/?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ADMIN_INCOME_LIST_API_RESPONSE_MODEL) =>
        ADMIN_TRANSFORM_INCOME_LIST_RESPONSE(response),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: "Income" as const,
                id: _id,
              })),
              { type: "Income", id: "LIST" },
            ]
          : [{ type: "Income", id: "LIST" }],
    }),

    /* ---------- Income: GET single by id ---------- */
    getIncomeById: builder.query<ADMIN_INCOME_MUTATION_RESPONSE_MODEL, string>({
      query: (id) => ({
        url: `/admin/income/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Income", id }],
    }),

    /* ---------- Income: POST create ---------- */
    createIncome: builder.mutation<
      ADMIN_INCOME_MUTATION_RESPONSE_MODEL,
      ADMIN_INCOME_CREATE_PAYLOAD
    >({
      query: (data) => ({
        url: "/admin/income",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Income", id: "LIST" }],
    }),

    /* ---------- Income: PUT update (id in URL) ---------- */
    updateIncome: builder.mutation<
      ADMIN_INCOME_MUTATION_RESPONSE_MODEL,
      ADMIN_INCOME_UPDATE_PAYLOAD
    >({
      query: ({ id, ...data }) => ({
        url: `/admin/income/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Income", id: "LIST" },
        { type: "Income", id: arg.id },
      ],
    }),

    /* ---------- Income: DELETE ---------- */
    deleteIncome: builder.mutation<ADMIN_INCOME_DELETE_RESPONSE_MODEL, string>({
      query: (id) => ({
        url: `/admin/income/${id}`,
        method: "DELETE",
        body: { _id: id },
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Income", id: "LIST" },
        { type: "Income", id },
      ],
    }),

    /* ---------- Income: GET summary ---------- */
    getIncomeSummary: builder.query<
      ADMIN_INCOME_SUMMARY_API_RESPONSE_MODEL,
      { month: string }
    >({
      query: ({ month }) => ({
        url: `/admin/income/summary?month=${month}`,
        method: "GET",
      }),
      providesTags: [{ type: "IncomeSummary", id: "LIST" }],
    }),

    /* ---------- Dashboard: GET financial summary ---------- */
    getFinancialSummary: builder.query<
      ADMIN_FINANCIAL_SUMMARY_API_RESPONSE_MODEL,
      { month?: string }
    >({
      query: ({ month }) => {
        const params = new URLSearchParams();
        if (month) params.append("month", month);

        return {
          url: `/admin/dashboard/summary?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: [{ type: "FinancialSummary", id: "LIST" }],
    }),
  }),
});

export const {
  useGetIncomeCategoryListQuery,
  useCreateIncomeCategoryMutation,
  useDeleteIncomeCategoryMutation,
  useGetIncomeListQuery,
  useGetIncomeByIdQuery,
  useCreateIncomeMutation,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
  useGetIncomeSummaryQuery,
  useGetFinancialSummaryQuery,
} = IncomeApi;