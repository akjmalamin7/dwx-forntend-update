import { Select, ServerSidePagination, ServerSideSearch } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useEffect, type ReactNode } from "react";
interface ColumnType<T> {
  key: Extract<keyof T, string>;
  title: string;
  render?: (value: T[keyof T], record?: T, rowIndex?: number) => ReactNode;
}

interface DataTableProps {
  isLoading?: boolean;
  column?: ColumnType<DataSource>[];
  dataSource?: DataSource[];
  page: number;
  limit?: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrev?: boolean;
  search?: string;
  setSearch?: (value: string) => void;
  setPage: (page: number) => void;
  setLimit?: (page: number) => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  cardView?: React.ReactNode;
}

const DataTable = ({
  isLoading = false,
  column = [],
  dataSource = [],
  page,
  totalPages,
  hasNext,
  hasPrev,
  limit,
  search,
  setLimit,
  setSearch,
  setPage,
  size,
  cardView,
}: DataTableProps) => {
  const handleLimit = (value: string) => {
    setLimit?.(Number(value));
    setPage?.(1);
  };
  useEffect(() => {
    if (!isLoading && dataSource.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [isLoading, dataSource.length, page, setPage]);
  return (
    <div className="bg-white">
      <div className="mb-3 flex justify-between items-center gap-4">
        <div className="w-1/2 lg:w-1/3">
          <ServerSideSearch
            value={search}
            onChange={setSearch}
            placeholder="Searching.."
          />
        </div>
        <div className="w-1/2 md:w-[120px]">
          <Select
            size="sm"
            label=""
            value={limit?.toString()}
            onSelect={handleLimit}
            options={[
              { name: "10", value: "10" },
              { name: "20", value: "20" },
              { name: "30", value: "30" },
              { name: "40", value: "40" },
              { name: "50", value: "50" },
              { name: "60", value: "60" },
              { name: "70", value: "70" },
              { name: "80", value: "80" },
              { name: "90", value: "90" },
              { name: "100", value: "100" },
            ]}
          />
        </div>
      </div>

      <div className={`${cardView ? "hidden md:block" : "block"}`}>
        <Table
          size={size}
          loading={isLoading}
          columns={column}
          dataSource={dataSource}
        />
      </div>
      {/* CardView: mobile visible, md+ hidden */}
      {cardView && (
        <div className="flex flex-col gap-4 md:hidden">{cardView}</div>
      )}

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
