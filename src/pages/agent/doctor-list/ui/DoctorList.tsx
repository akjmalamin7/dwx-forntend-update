import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { Link } from "react-router-dom"; 
import parse from 'html-react-parser';

import { DOCTOR_DATA_COL } from "./doctor.data.col";
import { useGetDoctorListQuery } from "@/shared/redux/features/agent/doctor-list/doctorListApi";

const DoctorList = () => {
  const { data: DoctorList, isLoading } = useGetDoctorListQuery();

  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      DoctorList?.filter((item) => item.email !== "All").map((item, index) => ({
        key: item._id,
        sl: index + 1,
        name: item.email, 
        mobile: item.mobile,
        role: item.role === 'xray_dr' ? 'Radiology' : 'ECG',
        address: item.address,        
        action: "",
      })) || [],
    [DoctorList]
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
    searchFields: ["name"],
    rowsPerPage: 100,
  });

  const COLUMN = DOCTOR_DATA_COL.map((item) => { 
    return item;
  });

  return (
    <Panel header="Doctor List" size="lg">
      <div className="p-4 bg-white">
        <div className="mb-4 w-1/3">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by Name"
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

export default DoctorList;
