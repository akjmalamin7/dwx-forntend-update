import { apiSlice } from "../../api/apiSlice";
import {
  TRANSFORM_PATIENT_VIEW_RESPONSE,
  type PATIENT_IMAGE_MODEL,
  type PATIENT_VIEW_RESPONSE,
  type PATIENT_VIEW_TRANSFORM_MODEL,
} from "./patientView.types";

export const AdminPatientViewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminPatientView: builder.query<
      {
        patient: PATIENT_VIEW_TRANSFORM_MODEL | null;
        attachments: PATIENT_IMAGE_MODEL[];
      },
      string
    >({
      query: (patient_id: string) => ({
        url: `/admin/patient/${patient_id}`,
        method: "GET",
      }),
      transformResponse: (response: PATIENT_VIEW_RESPONSE) => {
        return TRANSFORM_PATIENT_VIEW_RESPONSE(response);
      },
    }),
  }),
});

export const { useGetAdminPatientViewQuery } = AdminPatientViewApi;
