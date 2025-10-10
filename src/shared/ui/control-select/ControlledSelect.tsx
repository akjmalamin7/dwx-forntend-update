import { Select, Text } from "@/shared/ui";
import type { OptionsType } from "@/shared/utils/types/types";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";

interface ControlledSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  options: OptionsType[];
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  size?: "sm" | "md" | "lg";
}

const ControlledSelect = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  rules,
  size = "sm",
}: ControlledSelectProps<T>) => {
  return (
    <>
      {label && (
        <Text element="label" className="font-semibold">
          {label}
        </Text>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <Select
              size={size}
              options={options}
              value={field.value}
              onSelect={field.onChange}
            />
            {fieldState.error && (
              <Text color="danger" size="sm">
                {fieldState.error.message}
              </Text>
            )}
          </>
        )}
      />
    </>
  );
};

export default ControlledSelect;
