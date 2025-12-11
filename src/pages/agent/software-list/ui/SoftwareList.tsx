import { usePageTitle } from "@/shared/hooks";
import { useServerSidePagination } from "@/shared/hooks/server-side-pagination";
import { usePageQuery } from "@/shared/hooks/use-page-query/usePageQuery";
import { Panel, PanelHeading } from "@/shared/ui";
import type { DataSource } from "@/shared/ui/table/table.model";
import { DataTable } from "@/widgets";
import { useMemo } from "react";
import { SOFTWARE_DATA_COL } from "./software.data.col";
import { useGetSoftwareQuery } from "@/entities/software-list/api/query";
import { Link } from "react-router-dom"; 

const SoftwareList = () => {
  const { page, limit, search, setPage, setSearch, setLimit } = usePageQuery({
    defaultPage: 1,
    defaultLimit: 10,
  });
  const {
    data: softwareList,
    isLoading, 
  } = useGetSoftwareQuery({ page, limit, search });
  const totalPages = softwareList?.pagination.totalPages || 1;
  useServerSidePagination({
    totalPages,
    initialPage: page,
    onPageChange: setPage,
  });
  // Prepare data
  const DATA_TABLE = useMemo(
    () =>
      softwareList?.data?.map((item, index) => ({
        key: item._id,
        sl: (page - 1) * limit + index + 1,
        name: item.title,
        url: item.url,
        action: "",
      })) || [],
    [softwareList?.data, limit, page]
  );

  const COLUMN = SOFTWARE_DATA_COL.map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource) => (
          <div className="flex gap-2">
            <Link
                          to={`${record?.url}`}
                          target="_new"
                          download={true}
                           className="bg-green-500 text-white !px-2 !py-1 !h-auto rounded text-sm" 
                        >
                          Download
                        </Link> 
          </div>
        ),
      };
    }
    return item;
  });

  usePageTitle("Software List", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <Panel
      header={
        <PanelHeading
          title="Software List"
          button=" "
          path=" "
        />
      }
      size="md"
    >
      <DataTable
        isLoading={isLoading}
        column={COLUMN}
        dataSource={DATA_TABLE}
        search={search}
        page={page}
        totalPages={totalPages}
        hasNext={softwareList?.pagination.hasNext}
        hasPrev={softwareList?.pagination.hasPrev}
        setPage={setPage}
        setLimit={setLimit}
        limit={limit}
        setSearch={setSearch}
        size="sm"
      />
    </Panel>
  );
};

export default SoftwareList;
