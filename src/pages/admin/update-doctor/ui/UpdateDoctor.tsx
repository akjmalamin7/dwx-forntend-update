 
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { DOCTOR_DATA_COL } from "./updateDoctor.data.col";
import { useGetUpdateDoctorListQuery } from "@/shared/redux/features/admin/update-doctor-list/updateDoctorListApi";

const UpdateDoctor = () => {
  const { data: doctorList, isLoading } = useGetUpdateDoctorListQuery();
 
  const DATA_TABLE = useMemo(
    () =>
      doctorList?.filter((item) => item.email !== "All").map((item, index) => ({
        key: item._id,
        sl: index + 1, 
        email:  item.email, 
        role: item.role=='xray_dr'?'Radiology Doctor':'Ecg Doctor', 
        action: "",
      })) || [],
    [doctorList]
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
    searchFields: ["email", "role"],
    rowsPerPage: 100,
  });

  const COLUMN = DOCTOR_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex}> 
             <Link
              to={`/admin/doctor-bill-month/${record?.key}`}
              className="bg-yellow-500 text-white px-4 py-2 text-sm rounded"
            >
              View
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

export default UpdateDoctor;
