import { useGetAdminPatientViewQuery } from "@/shared/redux/features/admin/patient-view/patientViewApi";
import { useParams } from "react-router-dom";

export const useAdminPatientView = () => {
  const { patient_id } = useParams<{ patient_id: string }>();
  const {
    data: adminPateintView,
    isLoading: isAdminViewPatientLoading,
    error: adminPatientViewError,
  } = useGetAdminPatientViewQuery(patient_id!, {
    skip: !patient_id,
    refetchOnMountOrArgChange: true,
  });
  const patient = adminPateintView?.data.patient;
  const attachments = adminPateintView?.data.attachments;
  const flattenedAttachments: string[] =
    attachments?.[0]?.attachment?.flat() || [];
  return {
    patient,
    attachments,
    flattenedAttachments,
    adminPateintView,
    isAdminViewPatientLoading,
    adminPatientViewError,
  };
};
