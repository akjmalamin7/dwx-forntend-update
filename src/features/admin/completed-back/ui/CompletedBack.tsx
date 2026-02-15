import { useCompletedgBackMutation } from "@/shared/redux/features/admin/completed-back/completedBack";
import { Button } from "@/shared/ui";
import toast, { Toaster } from "react-hot-toast";
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
       // Success toast 
        toast.success("Completed Back completed successfully!", {
          duration: 2000,
          position: "top-right",
        });
    } catch (err) {
      console.error("C.B failed:", err);
      // Error toast
      toast.error("Failed to complete C.B. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  return (
    <>
      <Toaster />
      <Button
        onClick={handleTypingBack}
        className="bg-blue-500 text-white !px-2 !py-2 text-sm !h-auto !rounded-[0px]"
        loading={isLoading}
        disabled={isLoading}
      >
        C.B
      </Button>
    </>
  );
};

export default CompletedBack;
