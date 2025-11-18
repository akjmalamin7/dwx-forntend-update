import { apiSlice } from "../../api/apiSlice";
import { type PATIENT_VIEW_RESPONSE } from "./patientView.types";

export const AdminPatientViewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminPatientView: builder.query<PATIENT_VIEW_RESPONSE, string>({
      query: (patient_id: string) => ({
        url: `/admin/patient/${patient_id}`,
        method: "GET",
      }),

      providesTags: (_result, _error, patient_id) => [
        { type: "PendingPatient", id: patient_id },
      ],
      // transformResponse: (response: PATIENT_VIEW_RESPONSE) => {
      //   return TRANSFORM_PATIENT_VIEW_RESPONSE(response);
      // },
    }),
  }),
});

export const { useGetAdminPatientViewQuery } = AdminPatientViewApi;
