import { useDeleteSoftwareMutation } from "@/shared/redux/features/admin/software-add/addSoftwareApi"; 
import { Button, Modal, Text } from "@/shared/ui";
import { useState } from "react";
interface IProps {
  id?: string;
  onDeleteSuccess?: () => void;
}
const DeleteSoftware = ({ id, onDeleteSuccess }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteSoftware, { isLoading }] = useDeleteSoftwareMutation();

  const handleDelete = async () => {
    if (!id) return;
    try { 
      await deleteSoftware(id).unwrap();
      setIsModalOpen(false);
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      console.error("Delete failed:", error);
      
    }
  };
  return (
    <div>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-500 text-white !px-2 !py-1 !h-auto rounded text-sm"
      >
        Delete
      </Button>

      {isModalOpen && (
        <Modal
          title="Confirm Action"
          submitButton="Delete"
          size="sm"
          onOk={() => {
            handleDelete();
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
          buttonColor="danger"
          loading={isLoading}
          disabled={isLoading}
        >
          <Text>
            Are you sure you want to proceed with this 
            action?
          </Text>
        </Modal>
      )}
    </div>
  );
};

export default DeleteSoftware;
