import {
  useGetAdminPatientFilterListQuery,
  useGetAdminPatientFilterUserQuery,
} from "@/entities/admin/patient-filter/api/query";
import { AgentFormError } from "@/features/agent/agent-form-error";
import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination";
import { useActiveUser } from "@/shared/hooks/use-active-user";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { CustomMultiSelect, Input, Panel } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { PATIENT_FILTER_DATA_COL } from "./patient.filter.data.col";
import { CompletedBack, DeleteAdminPatient } from "@/features"; 
const formDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};
const PatientFilter = () => {
  const [agentId, setAgentId] = useState<string>(""); 
  const {
    page,
    limit,
    search,
    startDate,
    endDate, 
    setStartDate,
    setEndDate,
    setPage,
    setSearch,
    setLimit,
  } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 100,
    startDate: formDate(new Date()),
    endDate: formDate(new Date()),
  });
  const { data: userData, isLoading: isUserLoading , refetch} =
    useGetAdminPatientFilterUserQuery({ page, limit: 300 });
  const { data, isLoading } = useGetAdminPatientFilterListQuery({
    page,
    limit,
    search,
    startDate,
    endDate,
    agentId,   
  });
  const handleStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

 const handleAgentChange = (vals: string[]) => {
    const lastVal = vals[vals.length - 1] || "";
    setAgentId(lastVal);
    setPage(1);
  };

  const totalPages = data?.pagination.totalPages || 1;
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });
  const DATA_TABLE = useMemo(
    () =>
      data?.data.map((item, index) => ({
        key: item._id,
        sl: (page - 1) * limit + index + 1,
        agent_name: item.agent_id?.email,
        start_time:
          new Date(item.createdAt).toLocaleString([], {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }) +
          " <br/> " +
          new Date(item.completed_time).toLocaleString([], {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),

        patient_age: item.age,
        patient_name: item.name,
        patient_id: item.patient_id,
        patient_sex: item.gender,
        xray_name: item.xray_name,
        type: item.rtype,
        completed_time: item.completed_time,
        completed_dr: item.completed_dr?.email || "",
        printstatus: item.printstatus || "Waiting",
        action: "",
      })) || [],
    [data?.data, limit, page],
  );
  const COLUMN = PATIENT_FILTER_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource, rowIndex?: number) => ( 
           <div key={rowIndex} className="flex justify-end">
            <Link
              to={`/admin/completed-patient-view/${record?.key}`}
              className="bg-green-500 text-white px-2 py-2 text-sm"
            >
              View
            </Link>

            <CompletedBack
              path={record?.key}
              onDeleteSuccess={refetch}
              // sendMessage={sendMessage}
            />
            <DeleteAdminPatient id={record?.key} onDeleteSuccess={refetch} />
          </div>
        ),
      };
    }
    return item;
  });
  usePageTitle("Patient Filter", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });
  const transformUserData = useMemo(() => {
    if (isUserLoading) return [];
    return (
      userData?.data.map((user: { _id: string; email: string }) => ({
        name: user.email,
        value: user._id,
      })) || []
    );
  }, [userData, isUserLoading]);
  const { status } = useActiveUser();
  if (status !== "active") {
    return (
      <AgentFormError title="Something went wrong!. Please contact with support." />
    );
  }
  return (
    <Panel header={`Archive patients filter , Total = ${data?.totalPatient ?? 0}`} size="xl">
      {/* filter */}
      <div className="flex justify-between gap-4 items-center mb-4">
        <div className="flex gap-4 items-center">
          <div>
            <label className="font-semibold">Start Date:</label>
            <Input
              type="date"
              value={startDate}
              onChange={handleStartDate}
              className="border px-2 py-1 rounded"
              size="sm"
            />
          </div>

          <div>
            <label className="font-semibold">End Date:</label>
            <Input
              type="date"
              value={endDate}
              onChange={handleEndDate}
              className="border px-2 py-1 rounded"
              size="sm"
            />
          </div>
          <div className=" ">
              
          <CustomMultiSelect
            options={transformUserData}
            value={agentId ? [agentId] : []}  
            loading={isUserLoading}
            onSelect={handleAgentChange}
          />
         
        </div>
        </div>
        
      </div>
      {/* data table  */}
      <DataTable
        isLoading={isLoading}
        column={COLUMN}
        dataSource={DATA_TABLE}
        search={search}
        page={page}
        totalPages={totalPages}
        hasNext={data?.pagination.hasNext}
        hasPrev={data?.pagination.hasPrev}
        setPage={setPage}
        setLimit={setLimit}
        limit={limit}
        setSearch={setSearch}
      />
    </Panel>
  );
};

export default PatientFilter;
