// settingsApi.ts
import type { SettingsFormValues } from "@/pages/admin/setting/ui/setting";
import { apiSlice } from "../../api/apiSlice"; 

interface SettingsApiResponse {
  success: boolean;
  data: SettingsFormValues;
}

export const settingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getSettings: builder.query<SettingsApiResponse, void>({
      query: () => ({
        url: "/admin/settings",
        method: "GET",
      }),
      providesTags: [{ type: "Settings", id: "SINGLE" }],
    }),

    upsertSettings: builder.mutation<SettingsApiResponse, Partial<SettingsFormValues>>({
      query: (body) => ({
        url: "/admin/settings",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Settings", id: "SINGLE" }],
    }),

  }),
});

export const { useGetSettingsQuery, useUpsertSettingsMutation } = settingsApi;