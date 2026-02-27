import { useAuth } from "@/shared/hooks";
import { useDeleteAdminPatientAttachmentMutation } from "@/shared/redux/features/admin/delete-admin-patient/deleteAdminPatient";
import { Button, Modal, Text } from "@/shared/ui";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IProps {
  id?: string;
  onDeleteSuccess?: () => void;
}
const DeleteAdminPatientAttachment = ({ id, onDeleteSuccess }: IProps) => {
   const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAdminPatientAttachment, { isLoading }] = useDeleteAdminPatientAttachmentMutation();
  const handleDelete = async () => {
    if (!id) return;

    try {
      await deleteAdminPatientAttachment(id).unwrap();
      setIsModalOpen(false);

      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
       // Success toast 
        toast.success("Delete Admin Patient Attachment successfully!", {
          duration: 2000,
          position: "top-right",
        });
        navigate(0);
        
    } catch (error) {
      console.error("Delete failed:", error);
      // Error toast
      toast.error("Failed to delete. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
       
    }
  };

    const { user } = useAuth();

  return (
    <>
      <Toaster />
      {user?.role === "admin" ? (
        <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-500 text-white !px-2 !py-1 !h-auto  text-sm rounded-none"
        loading={isLoading}
        disabled={isLoading}
        >
        X
        </Button>
      ) : null} 


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

export default DeleteAdminPatientAttachment;
