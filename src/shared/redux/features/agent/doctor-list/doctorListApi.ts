import { apiSlice } from "../../api/apiSlice";
import { transformDoctorListResponse, type DOCTOR_TRANSFORM_MODEL, type DoctorListApiResponse } from "./doctorList.types";
 
export const DocgtorListApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorList: builder.query<
      DOCTOR_TRANSFORM_MODEL[],
      void
    >({
      query: () => ({
        url: "/agent/alldoctorlist",
        method: "GET",
      }),
      transformResponse: (response: DoctorListApiResponse) => {
        return transformDoctorListResponse(response.data);
      },
    }),
  }),
});
export const { useGetDoctorListQuery } = DocgtorListApi;
