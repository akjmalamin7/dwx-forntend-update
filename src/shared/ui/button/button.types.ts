export interface ButtonProps {
  children?: React.ReactNode;
  width?: "full" | "auto";
  variant?: "fill" | "outline" | "text";
  type?: "button" | "submit";
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "warning"
    | "dark"
    | "white";
  size?:
    | "size-1"
    | "size-2"
    | "size-3"
    | "size-4"
    | "size-5"
    | "size-6"
    | "size-7";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}
