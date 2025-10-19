import type { ErrorType } from "@/shared/utils/types/types";
import type { FocusEvent } from "react";

export interface PersonalFormatProps {
  label?: string;
  name?: string;
  value?: string;
  radius?: "sm" | "md" | "lg";
  color?: "dark" | "light";
  bgColor?: "dark" | "light" | "transparent";
  size?: "sm" | "md" | "lg";
  error?: ErrorType;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  onSelect?: (value: string) => void;
  onFocus?: (event: FocusEvent<HTMLSelectElement>) => void;
}
