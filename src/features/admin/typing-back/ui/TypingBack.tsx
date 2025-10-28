import { useTypingBackMutation } from "@/shared/redux/features/admin/typing-back/typingBackApi";
import { Button } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
interface TProps {
  path?: string;
}
const TypingBack = ({ path }: TProps) => {
  const navigate = useNavigate();
  const [typingBack, { isLoading }] = useTypingBackMutation();
  const handleTypingBack = async () => {
    try {
      await typingBack({ _id: path }).unwrap();
      navigate(`/admin/patient-view/${path}`);
    } catch (err) {
      console.error("Delete failed:", err);
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
