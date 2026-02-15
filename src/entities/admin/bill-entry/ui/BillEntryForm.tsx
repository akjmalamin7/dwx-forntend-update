import { SelectCustomUser } from "@/features/select-custom-user";
import { ControlInput, ControlledSelect } from "@/shared/ui";
import { useFormContext } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import type { BILL_ENTRY_TYPE } from "../model/schema";

const BillEntryForm = () => {
  const { control } = useFormContext<BILL_ENTRY_TYPE>();
  return (
    <Fragment>
      <SelectCustomUser control={control} name="user_id" label="User" />

      
      
      <ControlledSelect
        label="Month"
        control={control}
        name="month"
        options={[
          { name: "2026-2", value: "2026-2" },
          { name: "2026-1", value: "2026-1" },          
          { name: "2025-12", value: "2025-12" },
          { name: "2025-11", value: "2025-11" },
          { name: "2025-10", value: "2025-10" },
          { name: "2025-9", value: "2025-9" },
          { name: "2025-8", value: "2025-8" },
          { name: "2025-7", value: "2025-7" },
          { name: "2025-6", value: "2025-6" },
          { name: "2025-5", value: "2025-5" },
          { name: "2025-4", value: "2025-4" },
          { name: "2025-3", value: "2025-3" },
          { name: "2025-2", value: "2025-2" },
          { name: "2025-1", value: "2025-1" },
          { name: "2024-12", value: "2024-12" },
          { name: "2024-11", value: "2024-11" },
          { name: "2024-10", value: "2024-10" },
          { name: "2024-9", value: "2024-9" },
          { name: "2024-8", value: "2024-8" },
          { name: "2024-7", value: "2024-7" },
          { name: "2024-6", value: "2024-6" },
          { name: "2024-5", value: "2024-5" },
          { name: "2024-4", value: "2024-4" },
          { name: "2024-3", value: "2024-3" },
          { name: "2024-2", value: "2024-2" },
          { name: "2024-1", value: "2024-1" },
          { name: "2023-12", value: "2023-12" },
          { name: "2023-11", value: "2023-11" },
          { name: "2023-10", value: "2023-10" },
          { name: "2023-9", value: "2023-9" },
          { name: "2023-8", value: "2023-8" },
          { name: "2023-7", value: "2023-7" },
          { name: "2023-6", value: "2023-6" },
          { name: "2023-5", value: "2023-5" },
          { name: "2023-4", value: "2023-4" },
          { name: "2023-3", value: "2023-3" },
          { name: "2023-2", value: "2023-2" },
          { name: "2023-1", value: "2023-1" },
          { name: "2022-12", value: "2022-12" },
          { name: "2022-11", value: "2022-11" },
          { name: "2022-10", value: "2022-10" },
        ]}
      />

      <ControlInput
        control={control}
        size="sm"
        label="Total Single"
        placeholder="0"
        name="total_single"
      />

      <ControlInput
        control={control}
        size="sm"
        label="Total Double"
        placeholder="0"
        name="total_double"
      />
      <ControlInput
        control={control}
        size="sm"
        label="Total Multiple"
        placeholder="0"
        name="total_multiple"
      />
      <ControlInput
        control={control}
        size="sm"
        label="Total Ecg"
        placeholder="0"
        name="total_ecg"
      />
    </Fragment>
  );
};

export default BillEntryForm;
