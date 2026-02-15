import { useTypingBackMutation } from "@/shared/redux/features/admin/typing-back/typingBackApi";
import { Button } from "@/shared/ui";
import toast, { Toaster } from "react-hot-toast";

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
      // Success toast 
      toast.success("Typing Back completed successfully!", {
        duration: 2000,
        position: "top-right",
      });
    } catch (err) {
      console.error("T.B failed:", err);
      // Error toast
      toast.error("Failed to complete T.B. Please try again.", {
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
      className="bg-green-500 text-white !px-2 !py-2 text-sm !h-auto !rounded-[0px]"
      loading={isLoading}
    >
      T.B
    </Button>
    </>
  );
};

export default TypingBack;
