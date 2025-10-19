import { apiSlice } from "../../api/apiSlice";
import type { PERSONAL_FORMAT_LIST_RESPONSE } from "./personalFormatList.type";

export const PersonalFormatListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPersonalFormLst: builder.query<PERSONAL_FORMAT_LIST_RESPONSE, void>({
      query: () => ({
        url: "/doctor/format",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPersonalFormLstQuery } = PersonalFormatListApi;
