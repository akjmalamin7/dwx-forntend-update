import { useDeleteBackPatientMutation } from "@/shared/redux/features/admin/delete-back-patient/deleteBackPatient";
import { Button } from "@/shared/ui";
interface TProps {
  path?: string;
  onDeleteSuccess?: () => void;
}
const PatientDeleteBack = ({ path, onDeleteSuccess }: TProps) => {
  const [deleteBackPatient, { isLoading }] = useDeleteBackPatientMutation();
  const handleTypingBack = async () => {
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
      className="bg-green-500 text-white !px-2 !py-2 text-sm !h-auto !rounded-[0px]"
      loading={isLoading}
      disabled={isLoading}
    >
      Delete Back
    </Button>
  );
};

export default PatientDeleteBack;
