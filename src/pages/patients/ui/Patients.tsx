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
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
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
        ),
      };
    }
    return item;
  });

  const { data: patientList, isLoading } = useGetPendingPatientListQuery();

  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
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
        viewed: item.doctor_id?.[0]?.email || "",
        action: "",
      })) || [],
    [patientList]
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return DATA_TABLE;
    }

    const lowerQuery = searchQuery.toLowerCase();
    return DATA_TABLE.filter((item) =>
      ["patient_name", "patient_id", "xray_name"].some((field) => {
        const value = item[field as keyof typeof item];
        if (value !== undefined && value !== null) {
          return String(value).toLowerCase().includes(lowerQuery);
        }
        return false;
      })
    );
  }, [DATA_TABLE, searchQuery]);

  // Paginate filtered data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <Panel header="Pending Report" size="lg">
      <div className="p-4 bg-white">
        <div className="mb-4">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by Name, ID or Xray..."
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

export default Patients;
