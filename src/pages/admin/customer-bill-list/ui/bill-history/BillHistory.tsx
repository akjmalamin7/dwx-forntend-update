import { useLazyGetAdminBillHistoryQuery } from "@/entities/admin/bill/api/query";
import { Button, Modal } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import { useState } from "react";
import { BILL_HISTORY_DATA_COL } from "./billHistory.dat";
import { Link } from "react-router-dom";

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



  
    const COLUMN = BILL_HISTORY_DATA_COL.map((item) => {
      if (item.key === "action") {
        return {
          ...item,
          render: (_: unknown, record: any,  rowIndex?: number) => {
          
           
            return (
              <div key={rowIndex} className="flex gap-2">
              
             
                <Link
                  to={`/admin/customer-print-bill/${item.key}`}
                  className="bg-green-500 text-white px-4 py-2 text-sm rounded"
                >
                  Print
                </Link>
             
  
              
                <Link
                  to={`/admin/customer-pay-bill/${item.key}`}
                  className="bg-blue-500 text-white px-4 py-2 text-sm rounded"
                >
                  Pay
                </Link>
             
  
                { record.status === "Waiting" && (
                <Link
                  to={`/admin/customer-pay-bill/${item.key}`}
                  className="bg-blue-500 text-white px-4 py-2 text-sm rounded"
                >
                  Accept
                </Link>
                )}
              </div> 
            );
          },
        };
      }
      return item;
    });

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
              columns={COLUMN}
              dataSource={DATA_TABLE}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default BillHistory;
