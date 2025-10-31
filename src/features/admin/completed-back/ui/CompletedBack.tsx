import { useCompletedgBackMutation } from "@/shared/redux/features/admin/completed-back/completedBack";
import { Button } from "@/shared/ui";
interface TProps {
  path?: string;
  onDeleteSuccess?: () => void;
}
const CompletedBack = ({ path, onDeleteSuccess }: TProps) => {
  const [completedgBack, { isLoading }] = useCompletedgBackMutation();
  const handleTypingBack = async () => {
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
