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
          const data = await queryFulfilled;
          console.log("Login successful:", data);
          localStorage.setItem(
            "auth",
            JSON.stringify({
              token: data?.token,
              user: data?.user ?? data?.data,
            })
          );

          dispatch(
            userLoggedIn({
              token: data?.token,
              user: data?.user ?? data?.data,
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
