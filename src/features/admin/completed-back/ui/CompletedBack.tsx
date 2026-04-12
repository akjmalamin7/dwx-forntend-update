import { useCompletedgBackMutation } from "@/shared/redux/features/admin/completed-back/completedBack";
import { Button, Modal, Text } from "@/shared/ui";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface TProps {
  path?: string;
  onDeleteSuccess?: () => void;
}

const CompletedBack = ({ path, onDeleteSuccess }: TProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completedgBack, { isLoading }] = useCompletedgBackMutation();

  const handleTypingBack = async () => {
    if (!path) return;

    try {
      await completedgBack({ _id: path }).unwrap();
      setIsModalOpen(false);

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

      {/* Open Modal Button */}
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white !px-2 !py-2 text-sm !h-auto !rounded-[0px]"
        loading={isLoading}
        disabled={isLoading}
      >
        C.B
      </Button>

      {/* Confirm Modal */}
      {isModalOpen && (
        <Modal
          title="Confirm Action"
          submitButton="Confirm"
          size="sm"
          onOk={handleTypingBack}
          onCancel={() => setIsModalOpen(false)}
          buttonColor="primary"
          loading={isLoading}
          disabled={isLoading}
        >
          <Text>
            Are you sure you want to move this patient <strong>back from completed</strong>?
          </Text>
        </Modal>
      )}
    </>
  );
};

export default CompletedBack;