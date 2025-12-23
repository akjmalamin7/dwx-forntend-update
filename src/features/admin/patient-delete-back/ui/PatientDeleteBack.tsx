import type { WSMessage } from "@/shared/hooks/use-web-socket/model/schema";
import { useDeleteBackPatientMutation } from "@/shared/redux/features/admin/delete-back-patient/deleteBackPatient";
import type { ADMIN_DELETED_PATIENT_MODEL } from "@/shared/redux/features/admin/deleted-patient/deletedPatientList.types";
import { Button } from "@/shared/ui";
interface TProps {
  path?: string;
  patient?: ADMIN_DELETED_PATIENT_MODEL;
  sendMessage?: (msg: WSMessage) => void;
  onDeleteSuccess?: () => void;
}
const PatientDeleteBack = ({
  path,
  patient,
  sendMessage,
  onDeleteSuccess,
}: TProps) => {
  const [deleteBackPatient, { isLoading }] = useDeleteBackPatientMutation();
  const handleTypingBack = async () => {
    if (patient) {
      sendMessage?.({
        type: "admin_mr_delete_back",
        payload: { patient: patient },
      });
    }
    try {
      await deleteBackPatient({ _id: path }).unwrap();
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (err) {
      console.error("T.B failed:", err);
    }
  };

  return (
    <Button
      onClick={handleTypingBack}
      className=" bg-yellow-500 text-white !px-2 !py-2 text-sm !h-auto !rounded-[0px]"
      loading={isLoading}
      disabled={isLoading}
    >
      &lt;D.Back
    </Button>
  );
};

export default PatientDeleteBack;
