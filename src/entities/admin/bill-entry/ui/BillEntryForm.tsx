import { SelectCustomUser } from "@/features/select-custom-user";
import { ControlInput } from "@/shared/ui";
import { useFormContext } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import type { BILL_ENTRY_TYPE } from "../model/schema";

const BillEntryForm = () => {
  const { control } = useFormContext<BILL_ENTRY_TYPE>();
  return (
    <Fragment>
      <SelectCustomUser control={control} name="user_id" label="User" />

      <ControlInput
        control={control}
        size="sm"
        label="Month"
        placeholder="Month"
        name="month"
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
