import { apiSlice } from "@/shared/redux/features/api/apiSlice";
import {
  TRANSFORM_PATIENT_VIEW_RESPONSE,
  type PATIENT_COMMENT_MODEL,
  type PATIENT_IMAGE_ITEM_MODEL,
  type PATIENT_VIEW_RESPONSE,
  type PATIENT_VIEW_TRANSFORM_MODEL,
} from "../model/schema";

export const CompletedPatientViewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorCompletedPatientView: builder.query<
      {
        patient: PATIENT_VIEW_TRANSFORM_MODEL | null;
        comments: PATIENT_COMMENT_MODEL[] | null;
        attachments: PATIENT_IMAGE_ITEM_MODEL[];
      },
      string
    >({
      query: (patient_id: string) => ({
        url: `/doctor/patient/completed/${patient_id}`,
        method: "GET",
      }),
      transformResponse: (response: PATIENT_VIEW_RESPONSE) => {
        return TRANSFORM_PATIENT_VIEW_RESPONSE(response);
      },
    }),
  }),
});

export const { useGetDoctorCompletedPatientViewQuery } =
  CompletedPatientViewApi;
