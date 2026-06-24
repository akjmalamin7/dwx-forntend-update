import { usePageTitle } from "@/shared/hooks";
import { Panel } from "@/shared/ui";
import { DataTable } from "@/widgets";
import { useMemo, useState } from "react";
import {
  useGetExpenseCategoryListQuery,
  useCreateExpenseCategoryMutation,
  useDeleteExpenseCategoryMutation,
} from "@/shared/redux/features/admin/expence/expenceApi";
import { EXPENSE_CATEGORY_DATA_COL } from "./expence.category.data.col";
import type { DataSource } from "@/shared/ui/table/table.model";

const ExpenseCategoryList = () => {
  const [categoryName, setCategoryName] = useState("");

  const { data: categories, isLoading } = useGetExpenseCategoryListQuery();
  const [createExpenseCategory, { isLoading: isCreating }] =
    useCreateExpenseCategoryMutation();
  const [deleteExpenseCategory] = useDeleteExpenseCategoryMutation();

  usePageTitle("Expense Categories", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  const handleCreate = async () => {
    const name = categoryName.trim();
    if (!name) return;

    try {
      await createExpenseCategory({ name }).unwrap();
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
      await deleteExpenseCategory(id).unwrap();
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

  const COLUMN = EXPENSE_CATEGORY_DATA_COL.map((item) => {
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
    <Panel header="Expense Categories" size="lg">
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

export default ExpenseCategoryList;