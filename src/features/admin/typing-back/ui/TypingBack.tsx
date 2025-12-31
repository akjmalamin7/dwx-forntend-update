import { useTypingBackMutation } from "@/shared/redux/features/admin/typing-back/typingBackApi";
import { Button } from "@/shared/ui";
interface TProps {
  path?: string;
  onDeleteSuccess?: () => void;
}
const TypingBack = ({ path, onDeleteSuccess }: TProps) => {
  const [typingBack, { isLoading }] = useTypingBackMutation();
  const handleTypingBack = async () => {
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
