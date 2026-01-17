import { apiSlice } from "../api/apiSlice";
import type { DoctorProfileResponse } from "./doctor.profile.data";

export const DoctorProfileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorProfile: builder.query<DoctorProfileResponse, void>({
      query: () => ({
        url: `/doctor/profile`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetDoctorProfileQuery } = DoctorProfileApi;
