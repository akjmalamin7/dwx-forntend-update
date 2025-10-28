 
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { DOCTOR_DATA_COL } from "./updateDoctorBill.data.col"; 
import { useGetAdminDoctorBillQuery } from "@/shared/redux/features/admin/doctor-update-month/doctorBillApi";

const UpdateDoctorBill = () => { 
 
    const { doctor_id } = useParams<{ doctor_id: string }>();
    const {
      data: billList,
      isLoading
    } = useGetAdminDoctorBillQuery(doctor_id!, { skip: !doctor_id });
  

  const DATA_TABLE = useMemo(
    () =>
      billList?.map((item, index) => ({
        key: item._id,
        sl: index + 1, 
        month:  item.month,  
        total_patients:  item.total_patients,  
        total_amount:  item.total_amount,  
        status:  item.status,  
        paid_amount:  item.paid_amount,   
        payment_date: item.payment_date
        ? new Date(item.payment_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "—",
        action: "",
      })) || [],
    [billList]
  );


 

  const {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    paginatedData,
    totalPages,
  } = useSearchPagination({
    data: DATA_TABLE,
    searchFields: ["month"],
    rowsPerPage: 100,
  });

  const COLUMN = DOCTOR_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex} className="flex gap-2"> 
             <Link
              to={`/admin/doctor-print-bill/${record?.key}`}
              className="bg-green-500 text-white px-4 py-2 text-sm rounded"
            >
              Print
            </Link>
            <Link
              to={`/admin/doctor-pay-bill/${record?.key}`}
              className="bg-blue-500 text-white px-4 py-2 text-sm rounded"
            >
              Pay
            </Link>
            <Link
              to={`/admin/doctor-update-bill/?month=${record?.key}&doctorId=${record?.key}`}
              className="bg-yellow-500 text-white px-4 py-2 text-sm rounded"
            >
              Update
            </Link>
            
          </div>
        ),
      };
    }
    return item;
  });

  return (
    <Panel header="Update Doctor Bill" size="lg">
      <div className="p-4 bg-white">
        <div className="mb-4 w-1/3">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by Doctor"
          />
        </div>

        <Table
          loading={isLoading}
          columns={COLUMN}
          dataSource={paginatedData}
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </Panel>
  );
};

export default UpdateDoctorBill;
