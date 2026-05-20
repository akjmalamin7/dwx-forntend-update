import { useBillStatusUpdateMutation } from "@/shared/redux/features/admin/typing-back/typingBackApi";
import { Button } from "@/shared/ui";
import toast, { Toaster } from "react-hot-toast";

interface TProps {
  path?: string;
  bill_update?: string;
  onDeleteSuccess?: () => void;
}
const BillStatusUpdate = ({ path, bill_update, onDeleteSuccess }: TProps) => {

  const [billStatusUpdate, { isLoading }] = useBillStatusUpdateMutation();

  const handleBillStatusUpdate = async () => {
    try {
      await billStatusUpdate({ _id: path }).unwrap();
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
      toast.success("Bill status updated successfully!", {
        duration: 2000,
        position: "top-right",
      });
    } catch (err) {
      console.error("B.S.U failed:", err);
      toast.error("Failed to update bill status. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  const isUpdated = bill_update === "Updated";  

  return (
    <>
      <Toaster />
      <Button
        onClick={handleBillStatusUpdate}
        className={`text-white !px-2 !py-2 text-sm !h-auto !rounded-[0px] ${
          isUpdated ? "bg-green-500" : "bg-gray-400"  // ← green or gray
        }`}
        loading={isLoading}
      >
        {isUpdated ? "Updated" : "B.S.U"}
      </Button>
    </>
  );
};

export default BillStatusUpdate;
