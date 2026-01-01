// shared/redux/features/auth/authApi.ts (Alternative version)

import { apiSlice } from "@/shared/redux/features/api/apiSlice";

export const LoguotApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLogoutMutation } = LoguotApi;
