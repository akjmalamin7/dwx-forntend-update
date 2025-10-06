import { apiSlice } from "../api/apiSlice";
import type { AuthState, LoginData } from "./auth.types";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthState, LoginData>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    // async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //   try {
    //     const result = await queryFulfilled;
    //     localStorage.setItem(
    //       "auth",
    //       JSON.stringify({
    //         token: result?.data?.token,
    //         user: result?.data?.data,
    //       })
    //     );
    //     dispatch(
    //       userLoggedIn({
    //         token: result?.data?.token,
    //         user: result?.data?.data,
    //       })
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  }),
});

export const { useLoginMutation } = authApi;
