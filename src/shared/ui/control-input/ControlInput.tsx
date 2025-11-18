import { Input, Text } from "@/shared/ui"; // adjust if needed
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface IProps<TFieldValues extends FieldValues> {
  size?: "sm" | "md" | "lg";
  type?:
  | "text"
  | "email"
  | "password"
  | "number"
  | "file"
  | "hidden"
  | "checkbox";
  label?: string;
  name: Path<TFieldValues>;
  placeholder?: string;
  control: Control<TFieldValues>;
  isInputLabel?: boolean;
  className?: string;
}

const ControlInput = <TFieldValues extends FieldValues>({
  size = "md",
  type = "text",
  label,
  name,
  placeholder,
  control,
  isInputLabel = true,
  className
}: IProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          {isInputLabel && (
            <div className="col-span-3">
              <Text element="label" className="font-semibold">
                {label}
              </Text>
            </div>
          )}

          <div className="col-span-9">
            <Input
              {...field}
              type={type}
              value={field.value}
              label={isInputLabel ? "" : label}
              error={{
                status: !!fieldState.error,
                message: fieldState.error?.message,
              }}
              placeholder={placeholder}
              size={size}
              className={className}
            />
          </div>
        </>
      )}
    />
  );
};
export default ControlInput;
