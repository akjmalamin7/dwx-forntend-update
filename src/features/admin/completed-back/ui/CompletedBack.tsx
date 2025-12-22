import type { ADMIN_ARCHIVE_DOCTOR_MODEL } from "@/entities/admin/patient-archive/model/schema";
import type { WSMessage } from "@/shared/hooks/use-web-socket/model/schema";
import { useCompletedgBackMutation } from "@/shared/redux/features/admin/completed-back/completedBack";
import { Button } from "@/shared/ui";
interface TProps {
  path?: string;
  patient?: ADMIN_ARCHIVE_DOCTOR_MODEL;
  onDeleteSuccess?: () => void;
  sendMessage?: (msg: WSMessage) => void;
}
const CompletedBack = ({
  path,
  patient,
  onDeleteSuccess,
  sendMessage,
}: TProps) => {
  const [completedgBack, { isLoading }] = useCompletedgBackMutation();
  const handleTypingBack = async () => {
    if (patient) {
      sendMessage?.({ type: "completed_back", payload: { patient: patient } });
    }
    try {
      await completedgBack({ _id: path }).unwrap();
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
      className="bg-blue-500 text-white !px-2 !py-2 text-sm !h-auto !rounded-[0px]"
      loading={isLoading}
      disabled={isLoading}
    >
      C.B
    </Button>
  );
};

export default CompletedBack;
