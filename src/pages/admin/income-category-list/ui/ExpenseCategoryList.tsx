import { usePageTitle } from "@/shared/hooks";
import { Panel } from "@/shared/ui";
import { DataTable } from "@/widgets";
import { useMemo, useState } from "react";
import {
  useGetIncomeCategoryListQuery,
  useCreateIncomeCategoryMutation,
  useDeleteIncomeCategoryMutation,
} from "@/shared/redux/features/admin/income/incomeApi";
import type { DataSource } from "@/shared/ui/table/table.model";

const IncomeCategoryList = () => {
  const [categoryName, setCategoryName] = useState("");

  const { data: categories, isLoading } = useGetIncomeCategoryListQuery();
  const [createIncomeCategory, { isLoading: isCreating }] =
    useCreateIncomeCategoryMutation();
  const [deleteIncomeCategory] = useDeleteIncomeCategoryMutation();

  usePageTitle("Income Categories", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  const handleCreate = async () => {
    const name = categoryName.trim();
    if (!name) return;

    try {
      await createIncomeCategory({ name }).unwrap();
      setCategoryName("");
    } catch (err) {
      console.error("Failed to create category", err);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmed) return;

    try {
      await deleteIncomeCategory(id).unwrap();
    } catch (err) {
      console.error("Failed to delete category", err);
    }
  };

  const DATA_TABLE = useMemo(
    () =>
      categories?.map((item, index) => ({
        key: item.id,
        sl: index + 1,
        name: item.name,
        action: "",
      })) || [],
    [categories]
  );

  const COLUMN = [
    { key: "sl", title: "SL", dataIndex: "sl", align: "center" as const, width: 20 },
    { key: "name", title: "Category Name", dataIndex: "name", align: "start" as const, width: 100 },
    { key: "action", title: "Action", dataIndex: "action", align: "center" as const, width: 30 },
  ].map((item) => {
    if (item.key === "action") {
      return {
        ...item,
        render: (_: unknown, record?: DataSource) => (
          <button
            onClick={() => handleDelete(record?.key as string)}
            className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
          >
            Delete
          </button>
        ),
      };
    }
    return item;
  });

  return (
    <Panel header="Income Categories" size="lg">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          className="border border-gray-300 rounded px-3 py-2 text-sm flex-1 min-w-[220px]"
        />
        <button
          onClick={handleCreate}
          disabled={isCreating || !categoryName.trim()}
          className="bg-blue-600 text-white px-5 py-2 text-sm rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating ? "Adding..." : "Add Category"}
        </button>
      </div>

      <DataTable
        isLoading={isLoading}
        column={COLUMN}
        dataSource={DATA_TABLE}
        page={1}
        totalPages={1}
        setPage={() => {}}
      />
    </Panel>
  );
};

export default IncomeCategoryList;