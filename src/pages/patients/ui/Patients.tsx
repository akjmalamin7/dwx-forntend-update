import { useGetPendingPatientListQuery } from "@/shared/redux/features/agent/pending-patient-list/pendingPatientListApi";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { Link } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";

import { useEffect, useMemo, useState } from "react";
const Patients = () => {
  const COLUMN = PATIENT_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (value: unknown, record?: DataSource, rowIndex?: number) => {
          console.log(record);
          return (
            <div key={rowIndex} data-total={value}>
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

  // DATA_TABLE memoized
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
  const [filteredData, setFilteredData] = useState<DataSource[]>(DATA_TABLE);
  const [currentPage, setCurrentPage] = useState(10);
  const rowsPerPage = 10;
  useEffect(() => {
    setFilteredData(DATA_TABLE);
    setCurrentPage(1); // reset page
  }, [DATA_TABLE]);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = DATA_TABLE.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <Panel header="Pending Report" size="lg">
      <div className="p-4 bg-white">
        <Search
          data={DATA_TABLE}
          searchFields={["patient_name", "patient_id", "xray_name"]}
          onSearch={(filtered) => setFilteredData(filtered)}
          placeholder="Search by Name, ID or Xray..."
        />

        {/* Table */}
        <Table
          loading={dataLoading}
          columns={COLUMN}
          dataSource={paginatedData}
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Panel>
  );
};

export default Patients;
