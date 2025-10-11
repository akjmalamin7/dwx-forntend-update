import { apiSlice } from "../../api/apiSlice";
import type { DoctorApiResponse, DoctorOption } from "./ignore-dr.types";

export const DoctorOptionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorOptions: builder.query<DoctorOption[], void>({
      query: () => ({
        url: "/agent/alldoctorlist", // Vite proxy will forward /api prefix
        method: "GET",
      }),
      transformResponse: (response: DoctorApiResponse): DoctorOption[] =>
        response?.data?.map((doc) => ({
          id: doc.id,
          name: doc.name,
        })) || [],
    }),
  }),
});

export const { useGetDoctorOptionsQuery } = DoctorOptionsApi;
