import { useLazyGetAdminBillHistoryQuery } from "@/entities/admin/bill/api/query";
import { Button, Modal } from "@/shared/ui";
import { useState } from "react";

interface IProps {
  userId?: string;
  buttonAction?: boolean;
}

const BillHistory = ({ userId, buttonAction }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [getBillHistory, { data, isLoading }] =
    useLazyGetAdminBillHistoryQuery();

  const handleTogleModal = () => {
    const nextState = !isModalOpen;
    setIsModalOpen(nextState);

    // API runs only when opening modal
    if (nextState && userId) {
      getBillHistory(userId);
    }
  };

  console.log("bill history data", data);

  return (
    <>
      <Button disabled={buttonAction} onClick={handleTogleModal}>
        Notes
      </Button>

      {isModalOpen && (
        <Modal
          size="lg"
          onCancel={handleTogleModal}
          title="Bill History"
          cancelButton="Close"
          cancelColor="secondary"
        >
          {isLoading ? "Loading..." : JSON.stringify(data)}
        </Modal>
      )}
    </>
  );
};

export default BillHistory;
