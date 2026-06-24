 
import { apiSlice } from "../../api/apiSlice";
import {
  ADMIN_TRANSFORM_EXPENSE_LIST_RESPONSE,
  type ADMIN_EXPENSE_LIST_API_RESPONSE_MODEL,
  type ADMIN_TRANSFORM_EXPENSE_LIST_MODEL,
  type ADMIN_EXPENSE_CATEGORY_LIST_API_RESPONSE_MODEL,
  type ExpenseCategoryOption,
  type ADMIN_EXPENSE_CATEGORY_CREATE_PAYLOAD,
  type ADMIN_EXPENSE_CATEGORY_MUTATION_RESPONSE_MODEL,
  type ADMIN_EXPENSE_CREATE_PAYLOAD,
  type ADMIN_EXPENSE_UPDATE_PAYLOAD,
  type ADMIN_EXPENSE_MUTATION_RESPONSE_MODEL,
  type ADMIN_EXPENSE_DELETE_RESPONSE_MODEL,
  type ADMIN_EXPENSE_SUMMARY_API_RESPONSE_MODEL,
} from "./expence.types";

export const ExpenseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------- Category: GET list ---------- */
    getExpenseCategoryList: builder.query<ExpenseCategoryOption[], void>({
      query: () => ({
        url: "/admin/expense/category",
        method: "GET",
      }),
      transformResponse: (
        response: ADMIN_EXPENSE_CATEGORY_LIST_API_RESPONSE_MODEL
      ): ExpenseCategoryOption[] =>
        response?.data?.map((cat) => ({
          id: cat._id,
          name: cat.name,
        })) || [],
      providesTags: [{ type: "ExpenseCategory", id: "LIST" }],
    }),

    /* ---------- Category: POST create ---------- */
    createExpenseCategory: builder.mutation<
      ADMIN_EXPENSE_CATEGORY_MUTATION_RESPONSE_MODEL,
      ADMIN_EXPENSE_CATEGORY_CREATE_PAYLOAD
    >({
      query: (data) => ({
        url: "/admin/expense/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "ExpenseCategory", id: "LIST" }],
    }),

    /* ---------- Category: DELETE ---------- */
    deleteExpenseCategory: builder.mutation<
      ADMIN_EXPENSE_DELETE_RESPONSE_MODEL,
      string
    >({
      query: (id) => ({
        url: `/admin/expense/category/${id}`,
        method: "DELETE",
        body: { _id: id },
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "ExpenseCategory", id: "LIST" },
        { type: "ExpenseCategory", id },
      ],
    }),

    /* ---------- Expense: GET list (pagination) ---------- */
    getExpenseList: builder.query<
      ADMIN_TRANSFORM_EXPENSE_LIST_MODEL,
      { page?: number; limit?: number; search?: string; month?: string }
    >({
      query: ({ page = 1, limit = 10, search = "", month = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (search) params.append("search", search);
        if (month) params.append("month", month);

        return {
          url: `/admin/expense/?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response: ADMIN_EXPENSE_LIST_API_RESPONSE_MODEL) =>
        ADMIN_TRANSFORM_EXPENSE_LIST_RESPONSE(response),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: "Expense" as const,
                id: _id,
              })),
              { type: "Expense", id: "LIST" },
            ]
          : [{ type: "Expense", id: "LIST" }],
    }),



    /* ---------- Expense: POST create ---------- */
    createExpense: builder.mutation<
      ADMIN_EXPENSE_MUTATION_RESPONSE_MODEL,
      ADMIN_EXPENSE_CREATE_PAYLOAD
    >({
      query: (data) => ({
        url: "/admin/expense",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Expense", id: "LIST" }],
    }),


    getExpenseById: builder.query<ADMIN_EXPENSE_MUTATION_RESPONSE_MODEL, string>({
    query: (id) => ({
      url: `/admin/expense/${id}`,
      method: "GET",
    }),
    providesTags: (_result, _error, id) => [{ type: "Expense", id }],
  }),

    /* ---------- Expense: PUT update (id in URL) ---------- */
    updateExpense: builder.mutation<
      ADMIN_EXPENSE_MUTATION_RESPONSE_MODEL,
      ADMIN_EXPENSE_UPDATE_PAYLOAD
    >({
      query: ({ id, ...data }) => ({
        url: `/admin/expense/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Expense", id: "LIST" },
        { type: "Expense", id: arg.id },
      ],
    }),

    /* ---------- Expense: DELETE ---------- */
    deleteExpense: builder.mutation<ADMIN_EXPENSE_DELETE_RESPONSE_MODEL, string>({
      query: (id) => ({
        url: `/admin/expense/${id}`,
        method: "DELETE",
        body: { _id: id },
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Expense", id: "LIST" },
        { type: "Expense", id },
      ],
    }),

    /* ---------- Expense: GET summary ---------- */
    getExpenseSummary: builder.query<
      ADMIN_EXPENSE_SUMMARY_API_RESPONSE_MODEL,
      { month: string }
    >({
      query: ({ month }) => ({
        url: `/admin/expense/summary?month=${month}`,
        method: "GET",
      }),
      providesTags: [{ type: "ExpenseSummary", id: "LIST" }],
    }),
  }),
});

export const {
  useGetExpenseCategoryListQuery,
  useCreateExpenseCategoryMutation,
  useDeleteExpenseCategoryMutation,
  useGetExpenseListQuery,
  useGetExpenseByIdQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useGetExpenseSummaryQuery,
} = ExpenseApi;