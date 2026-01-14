import { apiSlice } from "../api/apiSlice"; // আপনার মেইন এপিআই স্লাইস পাথ
import type { DoctorProfileResponse } from "./doctor.profile.data";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // গেট প্রোফাইল কুয়েরি
    getDoctorProfile: builder.query<DoctorProfileResponse, string>({
      query: (id) => ({
        url: `/agent/profile/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetDoctorProfileQuery } = profileApi;
