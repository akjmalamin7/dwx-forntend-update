import { apiSlice } from "../../api/apiSlice";

export const AddCheckedUserApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCheckedUser: builder.mutation({
      query: (data) => ({
        url: "/agent/checkuser",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useAddCheckedUserMutation } = AddCheckedUserApi;
