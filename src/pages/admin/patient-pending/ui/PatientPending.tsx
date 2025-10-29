import { TypingBack } from "@/features";
import { useAuth } from "@/shared/hooks";
import { useSearchPagination } from "@/shared/hooks/search-paginatation/useSearchPagination";
import { useGetPendingPatientListQuery } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientListApi";
import { Pagination, Panel, Search } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PATIENT_DATA_COL } from "./patient.data.col";

const PatientPending = () => {
  const { data: patientList, isLoading } = useGetPendingPatientListQuery();
  const { user } = useAuth();
  const DATA_TABLE = useMemo(
    () =>
      patientList?.map((item, index) => ({
        key: item._id,
        sl: index + 1,
        start_time: new Date(item.createdAt).toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        agent_name: item.agent_id?.email,
        patient_name: item.name,
        patient_id: item.patient_id,
        gender: item.gender,
        age: item.age,
        rtype: item.rtype,
        selected_dr:
          user?.id && Array.isArray(item.doctor_id) && item.doctor_id.length > 0
            ? item.doctor_id.map((d) => d.email).join(", ")
            : "All",
        ignored_dr:
          Array.isArray(item.ignore_dr) && item.ignore_dr.length > 0
            ? item.ignore_dr.map((d) => d.email).join(", ")
            : "",
        online_dr: item.online_dr?.email,
        xray_name: item.xray_name,
        action: "",
      })) || [],
    [patientList, user?.id]
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
    searchFields: ["patient_name", "patient_id", "agent_name"],
    rowsPerPage: 100,
  });

  const COLUMN = PATIENT_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => (
          <div key={rowIndex} className="flex">
            <TypingBack path={record?.key} />
            <Link
              to={`/admin/select-doctor/${record?.key}`}
              className="bg-blue-500 text-white px-2 py-2 text-sm"
            >
              S.D
            </Link>
            <Link
              to={`/admin/patient-view/${record?.key}`}
              className="bg-yellow-500 text-white px-2 py-2 text-sm"
            >
              View
            </Link>
            <Link
              to={`/admin/patient-view/${record?.key}`}
              className="bg-red-500 text-white px-2 py-2 text-sm"
            >
              Delete
            </Link>
          </div>
        ),
      };
    }
    return item;
  });
  return (
    <Panel header="Pending Report" size="lg">
      <div className="p-4 bg-white">
        <div className="mb-4 w-1/3">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by Patient Name, ID or DC Name..."
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

export default PatientPending;
