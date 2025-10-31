import { Select, Text } from "@/shared/ui";
import type { ErrorType, OptionsType } from "@/shared/utils/types/types";
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
  error?: ErrorType;
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  size?: "sm" | "md" | "lg";
  isInputLabel?: boolean;
}

const ControlledSelect = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  options,
  rules,
  size = "sm",
  isInputLabel = true,
}: ControlledSelectProps<TFieldValues>) => {
  return (
    <>
      <Controller
        name={name}
        control={control} // ✅ exact type as useForm returns
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            {isInputLabel && (
              <div className="col-span-3">
                {label && (
                  <Text element="label" className="font-semibold">
                    {label}
                  </Text>
                )}
              </div>
            )}

            <div className="col-span-9">
              <Select
                size={size}
                options={options}
                value={field.value}
                onSelect={field.onChange}
                error={{
                  status: !!fieldState.error,
                  message: fieldState.error?.message as string,
                }}
                label={isInputLabel ? "" : label}
              />
            </div>
          </>
        )}
      />
    </>
  );
};
export default ControlledSelect;
