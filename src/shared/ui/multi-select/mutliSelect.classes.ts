interface SelectClassesProps {
  color?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  radius?: "sm" | "md" | "lg";
  bgColor?: "dark" | "light" | "transparent";
  disabled?: boolean;
  className?: string;
  hoverColor?: string; // optional hover text color
  focusBorderColor?: string; // optional focus border
}

export const finalSelectClasses = ({
  color = "dark",
  size = "md",
  radius = "md",
  bgColor = "transparent",
  disabled = false,
  className = "",
  hoverColor,
  focusBorderColor,
}: SelectClassesProps) => {
  const colorClasses: Record<string, string> = {
    dark: "text-gray-900",
    light: "text-gray-100",
  };

  const sizeClasses: Record<string, string> = {
    sm: "h-[30px] xl:h-[38px] text-[14px]",
    md: "h-[36px] xl:h-[44px] text-[14px]",
    lg: "h-[40px] xl:h-[50px] text-[14px]",
  };

  const roundClasses: Record<string, string> = {
    sm: "rounded-[8px]",
    md: "rounded-[10px]",
    lg: "rounded-[12px]",
  };

  const bgClasses: Record<string, string> = {
    dark: "bg-gray-500",
    light: "bg-[#f7f7f708]",
    transparent: "",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  const hoverClasses = hoverColor ? `hover:text-${hoverColor}` : "";
  const focusClasses = focusBorderColor
    ? `focus:border-${focusBorderColor} focus:ring-1 focus:ring-${focusBorderColor}`
    : "focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

  return `border border-gray-500 w-full px-[15px] appearance-none outline-none
    ${roundClasses[radius]}
    ${sizeClasses[size]}
    ${bgClasses[bgColor]}
    ${colorClasses[color]}
    ${disabledClasses}
    ${hoverClasses}
    ${focusClasses}
    ${className}`.replace(/\s+/g, " "); // extra spaces clean
};
