import { Input } from "@/shared/ui"; // adjust if needed
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface IProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
}

const ControlInput = <TFieldValues extends FieldValues>({
  control,
  name,
  placeholder,
  size = "md",
}: IProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Input {...field} placeholder={placeholder} size={size} />
      )}
    />
  );
};
export default ControlInput;
