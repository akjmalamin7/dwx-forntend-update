import { apiSlice } from "../api/apiSlice";
import type {
  ProfileReferenceResponse,
  ProfileSchemaTypes,
  ProfileSelectedDrIdsSchema,
} from "./profile.types";

export const ProfileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileReferenceResponse, string>({
      query: (id) => ({
        url: `/agent/profile/${id}`,
        method: "GET",
      }),
    }),
    getProfileSelectDoctorId: builder.query<ProfileSelectedDrIdsSchema, string>(
      {
        query: (id) => `/agent/profile/${id}`,
        transformResponse: (response: { data: ProfileSchemaTypes }) => ({
          selected_dr: response.data.selected_dr,
          ignored_dr: response.data.ignored_dr,
        }),
      }
    ),
  }),
});

export const { useGetProfileQuery, useGetProfileSelectDoctorIdQuery } =
  ProfileApi;
