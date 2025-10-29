import { apiSlice } from "../../api/apiSlice";
import {  
  transformAgentXrayResponse,
  type AGENT_XRAY_TRANSFORM_MODEL,
  type AGENT_XRAY_RESPONSE,
} from "./customerBill.types";

export const AdminCustomerReportListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminCustomerReportList: builder.query<
      AGENT_XRAY_TRANSFORM_MODEL[],
       { userId: string; month: string }
    >({
      query: ({ userId, month }) => ({
        url: `/admin/bill/reportlist/?userId=${userId}&month=${month}`,
        method: "GET",
      }),
      transformResponse: (response: AGENT_XRAY_RESPONSE) => {
        return transformAgentXrayResponse(response.data);
      },
    }),
  }),
});

export const { useGetAdminCustomerReportListQuery } = AdminCustomerReportListApi;
