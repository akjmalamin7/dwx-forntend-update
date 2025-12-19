import type { WSMessage } from "@/pages/admin/patient-pending/model/schema";
import { useTypingBackMutation } from "@/shared/redux/features/admin/typing-back/typingBackApi";
import { Button } from "@/shared/ui";
interface TProps {
  path?: string;
  onDeleteSuccess?: () => void;
  sendMessage: (msg: WSMessage) => void;
}
const TypingBack = ({ path, onDeleteSuccess, sendMessage }: TProps) => {
  const [typingBack, { isLoading }] = useTypingBackMutation();
  const handleTypingBack = async () => {
    sendMessage({
      type: "back_view_patient",
      payload: { patient_id: path as string },
    });
    try {
      await typingBack({ _id: path }).unwrap();
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
    >
      T.B
    </Button>
  );
};

export default TypingBack;
