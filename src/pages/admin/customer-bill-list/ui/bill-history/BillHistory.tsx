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
    total_amount: ((item.total_amount || 0) * 1.018).toFixed(0),
    trans_id: item.trans_id,
    total_patients: item.total_patients,
  }));


  
  // ---- Footer totals ----
  const totals = data?.data.reduce(
    (acc, item) => ({
      paid_amount: acc.paid_amount + (item.paid_amount || 0),
      total_amount: acc.total_amount + (item.total_amount || 0),
      total_patients: acc.total_patients + (item.total_patients || 0),
    }),
    { paid_amount: 0, total_amount: 0, total_patients: 0 }
  );
 
  
  const FOOTER_ROW = [
    {
      key: "footer",
      sl: "Total",
      month: "",
      paid_amount: totals?.paid_amount,
      status: "",
      total_amount:  ((totals?.total_amount || 0) * 1.018).toFixed(0) ,
      trans_id: "",
      total_patients: totals?.total_patients,
    },
  ];

  const DATA_TABLE_WITH_FOOTER = [
    ...(DATA_TABLE || []),
    ...FOOTER_ROW,
  ];

  // ---- Columns ----
  const COLUMN = BILL_HISTORY_DATA_COL.map((item) => {
    if (item.key === "sl") {
      return {
        ...item,
        render: (_: unknown, record: any) =>
          record.key === "footer" ? (
            <span className="font-bold text-gray-800">Total</span>
          ) : (
            record.sl
          ),
      };
    }

    if (
      item.key === "paid_amount" ||
      item.key === "total_amount" ||
      item.key === "total_patients"
    ) {
      return {
        ...item,
        render: (_: unknown, record: any) =>
          record.key === "footer" ? (
            <span className="font-bold text-gray-800">
              {record[item.dataIndex as string]}
            </span>
          ) : (
            record[item.dataIndex as string]
          ),
      };
    }

    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record: any, rowIndex?: number) => {
          if (record.key === "footer") return null; // no action for footer row
          return (
            <div key={rowIndex} className="flex gap-2">
              <Link
                to={`/admin/customer-print-bill/${record.key}`}
                className="bg-green-500 text-white px-4 py-1 text-sm rounded"
              >
                Print
              </Link>

              <Link
                to={`/admin/customer-pay-bill/${record.key}`}
                className="bg-blue-500 text-white px-4 py-1 text-sm rounded"
              >
                Pay
              </Link>

              {record.status === "Waiting" && (
                <Link
                  to={`/admin/customer-pay-bill/${record.key}`}
                  className="bg-blue-500 text-white px-4 py-1 text-sm rounded"
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
              dataSource={DATA_TABLE_WITH_FOOTER}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default BillHistory;