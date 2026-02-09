import { useDeleteXraytypeMutation } from "@/shared/redux/features/admin/xraytype-add/addXraytypeApi"; 
import { Button, Modal, Text } from "@/shared/ui";
import { useState } from "react";
interface IProps {
  id?: string;
  onDeleteSuccess?: () => void;
}
const DeleteXraytype = ({ id, onDeleteSuccess }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteXraytype, { isLoading }] = useDeleteXraytypeMutation();

  const handleDelete = async () => {
    if (!id) return;
    try { 
      await deleteXraytype(id).unwrap();
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
            Are you sure you want to proceed with this <strong>{id}</strong>{" "}
            action?
          </Text>
        </Modal>
      )}
    </div>
  );
};

export default DeleteXraytype;
