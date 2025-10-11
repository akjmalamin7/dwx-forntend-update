import type { ErrorType, OptionsType } from "@/shared/utils/types/types";
import type { FocusEvent } from "react";

export interface MultiSelectProps {
  label?: string;
  name?: string;
  radius?: "sm" | "md" | "lg";
  color?: "dark" | "light";
  bgColor?: "dark" | "light" | "transparent";
  size?: "sm" | "md" | "lg";
  options: OptionsType[];
  error?: ErrorType;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  value?: string[]; // selected values
  onSelect?: (values: string[]) => void;
  onFocus?: (event: FocusEvent<HTMLSelectElement>) => void;
}
