// settingsApi.ts
import type { SettingsFormValues } from "@/pages/admin/setting/ui/setting";
import { apiSlice } from "../../api/apiSlice"; 

interface SettingsApiResponse {
  success: boolean;
  data: SettingsFormValues;
}

export const customerSettingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getCustomerSettings: builder.query<SettingsApiResponse, void>({
      query: () => ({
        url: "/agent/settings",
        method: "GET",
      }),
      providesTags: [{ type: "Settings", id: "SINGLE" }],
    }), 

  }),
});

export const { useGetCustomerSettingsQuery } = customerSettingsApi;