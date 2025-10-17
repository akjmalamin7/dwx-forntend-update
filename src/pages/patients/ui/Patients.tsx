import { useGetPendingPatientListQuery } from "@/shared/redux/features/agent/pending-patient-list/pendingPatientListApi";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";

const Patients = () => {
  const COLUMN = PATIENT_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (value: unknown, record?: DataSource, rowIndex?: number) => {
          return (
            <div key={rowIndex}>
              <Link
                to={`/agent/patient-view/${record?.key}`}
                className="bg-green-500 text-white px-2 py-1 rounded text-sm"
              >
                View
              </Link>
              <Link
                to={`/agent/patient-print/${record?.key}`}
                className="bg-yellow-500 ml-2 text-white px-2 py-1 rounded text-sm"
              >
                Print
              </Link>
            </div>
          );
        },
      };
    }
    return item;
  });

  const { data: patientList, isLoading: dataLoading } =
    useGetPendingPatientListQuery();

  // Prepare table data
  const DATA_TABLE = useMemo(() => {
    return (
      patientList?.map((item, index) => ({
        key: item._id,
        sl: index + 1,
        start_time: new Date(item.createdAt).toLocaleString(),
        patient_age: item.age,
        patient_name: item.name,
        patient_id: item.patient_id,
        patient_sex: item.gender,
        xray_name: item.xray_name,
        type: item.rtype,
        viewed: item.doctor_id?.length ? item.doctor_id[0]?.email : "",
        action: "",
      })) || []
    );
  }, [patientList]);

  const [filteredData, setFilteredData] = useState<DataSource[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    setFilteredData(DATA_TABLE);
    setCurrentPage(1);
  }, [DATA_TABLE]);

  // Total pages only apply when not searching
  const totalPages = Math.ceil(DATA_TABLE.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return DATA_TABLE.slice(start, start + rowsPerPage);
  }, [DATA_TABLE, currentPage]);

  return (
    <Panel header="Pending Report" size="lg">
      <div className="p-4 bg-white">
        <Search
          data={DATA_TABLE}
          searchFields={["patient_name", "patient_id", "xray_name"]}
          onSearch={(filtered) => {
            if (filtered.length === DATA_TABLE.length) {
              // search cleared
              setIsSearching(false);
            } else {
              setIsSearching(true);
            }
            setFilteredData(filtered);
            setCurrentPage(1);
          }}
          placeholder="Search by Name, ID or Xray..."
        />

        {/* Table */}
        <Table
          loading={dataLoading}
          columns={COLUMN}
          dataSource={isSearching ? filteredData : paginatedData}
        />

        {/* Pagination only when not searching */}
        {!isSearching && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </Panel>
  );
};

export default Patients;
