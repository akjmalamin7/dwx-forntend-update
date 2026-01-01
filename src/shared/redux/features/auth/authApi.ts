// shared/redux/features/auth/authApi.ts (Alternative version)
import { safeDecodeToken } from "@/shared/utils/sageDecodeToken";
import { apiSlice } from "../api/apiSlice";
import type { AuthState, LoginData } from "./auth.types";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthState, LoginData>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;

          if (!data?.access_token) {
            console.error("No access token received");
            return;
          }

          const user = safeDecodeToken(data.access_token);

          localStorage.setItem(
            "auth",
            JSON.stringify({
              access_token: data.access_token,
              user: user,
            })
          );

          dispatch(
            userLoggedIn({
              access_token: data.access_token,
              user: user,
            })
          );
        } catch (error) {
          console.log("Login error:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
