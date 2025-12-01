import { useLazyGetAdminBillHistoryQuery } from "@/entities/admin/bill/api/query";
import { Button, Modal } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import { useState } from "react";
import { BILL_HISTORY_DATA_COL } from "./billHistory.dat";

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

    if (nextState && userId) {
      getBillHistory(userId);
    }
  };
  const DATA_TABLE = data?.data.map((item, index) => ({
    key: item._id,
    sl: index + 1,
    month: item.month,
    paid_amount: item.paid_amount,
    status: item.status,
    total_amount: item.total_amount,
    trans_id: item.trans_id,
    total_patients: item.total_patients,
  }));

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
          <div className="p-4">
            <Table
              loading={isLoading}
              columns={BILL_HISTORY_DATA_COL}
              dataSource={DATA_TABLE}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default BillHistory;
