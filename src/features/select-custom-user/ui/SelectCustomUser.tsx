import { CustomMultiSelect, Text } from "@/shared/ui";
import { useMemo } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form";
import { useGetCustomersListQuery } from "../api/query";

interface IProps<TFieldValues extends FieldValues> {
  label?: string;
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  weight?: string;
}

interface Option {
  value: string;
  name: string;
}

const SelectCustomUser = <TFieldValues extends FieldValues>({
  label,
  name,
  control,
  weight,
}: IProps<TFieldValues>) => {
  const { data: doctorOptions, isLoading } = useGetCustomersListQuery();

  const allOptions: Option[] = useMemo(
    () =>
      doctorOptions?.map((doc) => ({
        value: doc.id,
        name: doc.name,
      })) ?? [],
    [doctorOptions]
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={"" as PathValue<TFieldValues, typeof name>}
      render={({ field, fieldState }) => (
        <>
          {label && (
            <Text element="label" className={weight ?? "font-semibold"}>
              {label}
            </Text>
          )}
          <CustomMultiSelect
            options={allOptions}
            value={field.value ? [field.value] : []}
            loading={isLoading}
            onSelect={(vals: string[]) => {
              const lastVal = vals[vals.length - 1] || "";
              field.onChange(lastVal as PathValue<TFieldValues, typeof name>);
            }}
            error={{
              status: !!fieldState.error,
              message: fieldState.error?.message as string,
            }}
          />
        </>
      )}
    />
  );
};

export default SelectCustomUser;
