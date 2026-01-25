import { useDeleteAdminUserMutation } from "@/entities/admin/users/api/mutation";
import { Button, Modal, Text } from "@/shared/ui";
import { useState } from "react";
interface IProps {
  id?: string;
  onDeleteSuccess?: () => void;
}
const DeleteAdminUser = ({ id, onDeleteSuccess }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAdminUser, { isLoading }] = useDeleteAdminUserMutation();
  const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteAdminUser(id).unwrap();
      setIsModalOpen(false);
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      console.error("Delete failed:", error);
      console.log("Full error object:", JSON.stringify(error, null, 2));
    }
  };
  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-500 text-white !px-2 !py-1 !h-auto  text-sm rounded-none"
        loading={isLoading}
        disabled={isLoading}
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
    </>
  );
};

export default DeleteAdminUser;
