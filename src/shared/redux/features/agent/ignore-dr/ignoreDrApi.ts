import { apiSlice } from "../../api/apiSlice";
import type { DoctorApiResponse, DoctorOption } from "./ignore-dr.types";

export const DoctorOptionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorOptions: builder.query<DoctorOption[], void>({
      query: () => ({
        url: "/agent/alldoctorlist?limit=1000",
        method: "GET",
      }),
      transformResponse: (response: DoctorApiResponse): DoctorOption[] =>
        response?.data?.map((doc) => ({
          id: doc.id,
          name: doc.email,
        })) || [],
    }),
  }),
});

export const { useGetDoctorOptionsQuery } = DoctorOptionsApi;
