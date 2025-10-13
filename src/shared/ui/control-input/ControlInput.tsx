import { Input, Text } from "@/shared/ui"; // adjust if needed
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface IProps<TFieldValues extends FieldValues> {
  size?: "sm" | "md" | "lg";
  label?: string;
  name: Path<TFieldValues>;
  placeholder?: string;
  control: Control<TFieldValues>;
}

const ControlInput = <TFieldValues extends FieldValues>({
  size = "md",
  label,
  name,
  placeholder,
  control,
}: IProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          <div className="col-span-3">
            <Text element="label" className="font-semibold">
              {label}
            </Text>
          </div>
          <div className="col-span-9">
            <Input
              {...field}
              value={field.value}
              error={{
                status: !!fieldState.error,
                message: fieldState.error?.message,
              }}
              placeholder={placeholder}
              size={size}
            />
          </div>
        </>
      )}
    />
  );
};
export default ControlInput;
