import { ServerSidePagination } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import type { ReactNode } from "react";
interface ColumnType<T> {
  key: Extract<keyof T, string>;
  title: string;
  render?: (
    value: T[keyof T],
    record?: T,
    rowIndex?: number
  ) => ReactNode;
}

interface DataTableProps {
  isLoading?: boolean;
  column?: ColumnType<DataSource>[];
  dataSource?: DataSource[];
  page: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrev?: boolean;
  setPage: (page: number) => void;
}

const DataTable = ({
  isLoading = false,
  column = [],
  dataSource = [],
  page,
  totalPages,
  hasNext,
  hasPrev,
  setPage,
}: DataTableProps) => {
  return (
    <div className="p-4 bg-white">
      <Table loading={isLoading} columns={column} dataSource={dataSource} />
      <ServerSidePagination
        currentPage={page}
        totalPages={totalPages}
        hasNext={hasNext}
        hasPrev={hasPrev}
        onPageChange={setPage}
      />
    </div>
  );
};

export default DataTable;
