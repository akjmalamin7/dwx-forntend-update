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
          localStorage.setItem(
            "auth",
            JSON.stringify({
              access_token: data?.access_token,
            })
          );

          dispatch(
            userLoggedIn({
              access_token: data?.access_token,
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
