import { Select, Text } from "@/shared/ui";
import type { OptionsType } from "@/shared/utils/types/types";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";

interface ControlledSelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  options: OptionsType[];
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  size?: "sm" | "md" | "lg";
}

const ControlledSelect = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  options,
  rules,
  size = "sm",
}: ControlledSelectProps<TFieldValues>) => {
  return (
    <>
      {label && (
        <Text element="label" className="font-semibold">
          {label}
        </Text>
      )}
      <Controller
        name={name}
        control={control} // ✅ exact type as useForm returns
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
