import { apiSlice } from "../../api/apiSlice";
import {
  ADMIN_TRANSFORM_CASH_LEDGER_HISTORY_RESPONSE,
  type ADMIN_CASH_LEDGER_HISTORY_API_RESPONSE_MODEL,
  type ADMIN_TRANSFORM_CASH_LEDGER_HISTORY_MODEL,
  type ADMIN_OPENING_BALANCE_PAYLOAD,
  type ADMIN_OPENING_BALANCE_RESPONSE_MODEL,
  type ADMIN_GET_OPENING_BALANCE_RESPONSE_MODEL,
  type ADMIN_MANUAL_ENTRY_CREATE_PAYLOAD,
  type ADMIN_MANUAL_ENTRY_UPDATE_PAYLOAD,
  type ADMIN_MANUAL_ENTRY_RESPONSE_MODEL,
  type ADMIN_MANUAL_ENTRY_DELETE_RESPONSE_MODEL,
  type ADMIN_CASH_BALANCE_RESPONSE_MODEL,
} from "./cashLedger.types";

export const CashLedgerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* ---------- Opening Balance ---------- */
    getOpeningBalance: builder.query<ADMIN_GET_OPENING_BALANCE_RESPONSE_MODEL, void>({
      query: () => ({
        url: "/admin/cash-ledger",
        method: "GET",
      }),
      providesTags: [{ type: "CashLedger", id: "OPENING" }],
    }),

    setOpeningBalance: builder.mutation<
      ADMIN_OPENING_BALANCE_RESPONSE_MODEL,
      ADMIN_OPENING_BALANCE_PAYLOAD
    >({
      query: (data) => ({
        url: "/admin/cash-ledger",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        { type: "CashLedger", id: "OPENING" },
        { type: "CashLedger", id: "BALANCE" },
        { type: "CashLedger", id: "LIST" },
      ],
    }),

    updateOpeningBalance: builder.mutation<
      ADMIN_OPENING_BALANCE_RESPONSE_MODEL,
      ADMIN_OPENING_BALANCE_PAYLOAD
    >({
      query: (data) => ({
        url: "/admin/cash-ledger",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [
        { type: "CashLedger", id: "OPENING" },
        { type: "CashLedger", id: "BALANCE" },
        { type: "CashLedger", id: "LIST" },
      ],
    }),

    /* ---------- Manual Entry ---------- */
    createManualEntry: builder.mutation<
      ADMIN_MANUAL_ENTRY_RESPONSE_MODEL,
      ADMIN_MANUAL_ENTRY_CREATE_PAYLOAD
    >({
      query: (data) => ({
        url: "/admin/cash-ledger/manual",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        { type: "CashLedger", id: "BALANCE" },
        { type: "CashLedger", id: "LIST" },
      ],
    }),

    updateManualEntry: builder.mutation<
      ADMIN_MANUAL_ENTRY_RESPONSE_MODEL,
      ADMIN_MANUAL_ENTRY_UPDATE_PAYLOAD
    >({
      query: ({ id, ...data }) => ({
        url: `/admin/cash-ledger/manual/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [
        { type: "CashLedger", id: "BALANCE" },
        { type: "CashLedger", id: "LIST" },
      ],
    }),

    deleteManualEntry: builder.mutation<
      ADMIN_MANUAL_ENTRY_DELETE_RESPONSE_MODEL,
      string
    >({
      query: (id) => ({
        url: `/admin/cash-ledger/manual/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "CashLedger", id: "BALANCE" },
        { type: "CashLedger", id: "LIST" },
      ],
    }),

    /* ---------- Balance ---------- */
    getCurrentBalance: builder.query<ADMIN_CASH_BALANCE_RESPONSE_MODEL, void>({
      query: () => ({
        url: "/admin/cash-ledger/balance",
        method: "GET",
      }),
      providesTags: [{ type: "CashLedger", id: "BALANCE" }],
    }),

    /* ---------- History ---------- */
    getLedgerHistory: builder.query<
      ADMIN_TRANSFORM_CASH_LEDGER_HISTORY_MODEL,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });

        return {
          url: `/admin/cash-ledger/history?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (
        response: ADMIN_CASH_LEDGER_HISTORY_API_RESPONSE_MODEL
      ) => ADMIN_TRANSFORM_CASH_LEDGER_HISTORY_RESPONSE(response),
      providesTags: [{ type: "CashLedger", id: "LIST" }],
    }),
  }),
});

export const {
  useGetOpeningBalanceQuery,
  useSetOpeningBalanceMutation,
  useUpdateOpeningBalanceMutation,
  useCreateManualEntryMutation,
  useUpdateManualEntryMutation,
  useDeleteManualEntryMutation,
  useGetCurrentBalanceQuery,
  useGetLedgerHistoryQuery,
} = CashLedgerApi;