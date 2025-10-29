import { apiSlice } from "../../api/apiSlice";
import {
  transformUpdateDoctorResponse,
  type DOCTOR_TRANSFORM_MODEL,
  type UpdateDoctorApiResponse,
} from "./updateDoctorList.types";

export const CustomerListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerList: builder.query<
      DOCTOR_TRANSFORM_MODEL[],
      void
    >({
      query: () => ({
        url: "/admin/users/all?role=user",
        method: "GET",
      }),
      transformResponse: (response: UpdateDoctorApiResponse) => {
        return transformUpdateDoctorResponse(response.data);
      },
    }),
  }),
});
export const { useGetCustomerListQuery } = CustomerListApi;
