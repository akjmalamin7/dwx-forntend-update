import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react";

export interface InputProps {
  label?: string;
  name?: string;
  value?: string;
  type?: "text" | "email" | "password" | "number" | "file" | "hidden" | "checkbox";
  radius?: "sm" | "md" | "lg";
  color?: "dark" | "light";
  bgColor?: "dark" | "light" | "transparent";
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  className?: string;
  readonly?: boolean;
  error?: { status?: boolean; message?: string };
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}
