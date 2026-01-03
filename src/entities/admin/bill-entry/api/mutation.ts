// Example mutation
import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import type { BILL_ENTRY_TYPE } from "../model/schema";

export const billEntryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBillEntry: builder.mutation<BILL_ENTRY_TYPE, BILL_ENTRY_TYPE>({
      query: (data) => ({
        url: "/admin/bill/billentry",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateBillEntryMutation } = billEntryApi;
