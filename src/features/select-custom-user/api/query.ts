import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import type { CUSTOMER_MODEL } from "../model.ts/schema";

interface CustomersResponse {
  success: boolean;
  message: string;
  data: CUSTOMER_MODEL[];
}

export const GetCustomersList = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomersList: builder.query<CUSTOMER_MODEL[], void>({
      query: () => ({
        url: "admin/users/all?role=user&page=1&limit=1000",
        method: "GET",
      }),
      transformResponse: (response: CustomersResponse) => response.data,
    }),
  }),
});

export const { useGetCustomersListQuery } = GetCustomersList;
