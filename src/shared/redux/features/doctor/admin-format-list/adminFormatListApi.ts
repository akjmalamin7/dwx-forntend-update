import { apiSlice } from "../../api/apiSlice";
import type { ADMIN_FORMAT_LIST_RESPONSE } from "./adminFormatList.type";

export const AdminFormatListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminFormLst: builder.query<ADMIN_FORMAT_LIST_RESPONSE, void>({
      query: () => ({
        url: "/doctor/format/adminformat/?page=1&limit=500",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAdminFormLstQuery } = AdminFormatListApi;
