import type { ButtonProps } from "./button.types";

const Button = ({
  children,
  width = "auto",
  variant = "fill",
  color = "primary",
  type = "submit",
  size = "size-3",
  loading = false,
  disabled = false,
  className,
  onClick,
}: ButtonProps) => {
  const baseClass = `rounded-[4px] font-medium transition-all justify-center ${
    disabled === true ? "cursor-alias" : "lg:cursor-pointer"
  }`;
  const disabledOrLoadingClass = "opacity-50 cursor-not-allowed hover:none";
  const colorVariants = {
    primary: "bg-blue-600 text-white border-blue-600",
    secondary: "bg-gray-600 text-white border-gray-600",
    tertiary: "bg-green-600 text-white border-green-600",
    danger: "bg-red-600 text-white border-red-600",
    warning: "bg-yellow-500 text-black border-yellow-500",
    dark: "bg-gray-900 text-white border-gray-900",
    white: "bg-white text-black border-gray-300",
  };

  const outlineVariants = {
    primary: "border border-blue-600 text-blue-600 bg-transparent",
    secondary: "border border-gray-600 text-gray-600 bg-transparent",
    tertiary: "border border-green-600 text-green-600 bg-transparent",
    danger: "border border-red-600 text-red-600 bg-transparent",
    warning: "border border-yellow-500 text-yellow-500 bg-transparent",
    dark: "border border-gray-900 text-gray-900 bg-transparent",
    white: "border border-gray-300 text-black bg-transparent",
  };
  const textVariants = {
    primary: "text-blue-600",
    secondary: " text-gray-600 ",
    tertiary: "text-green-600 ",
    danger: "text-red-600 ",
    warning: "text-yellow-500 ",
    dark: "text-gray-900 ",
    white: "text-black ",
  };

  const variantClass = {
    fill: `px-[20px] py-[8px] inline-flex items-center ${colorVariants[color]}`,
    outline: `px-[20px] py-[8px] inline-flex items-center ${outlineVariants[color]}`,
    text: `bg-transparent border-transparent px-0 py-0 !h-[auto] ${textVariants[color]}`,
  }[variant];
  const sizeClass = {
    "size-1": "h-[28px] md:h-[32px]  text-[14px] font-regular",
    "size-2": "h-[30px] md:h-[36px]  text-[14px] font-regular",
    "size-3": "h-[36px] md:h-[40px]  text-[14px] font-regular",
    "size-4": "h-[38px] md:h-[44px]  text-[14px] font-regular",
    "size-5": "h-[40px] md:h-[50px]  text-[16px] font-regular",
    "size-6": "h-[44px] xl:h-[58px]  text-[16px] font-regular",
    "size-7": "h-[45px] lg:h-[64px] text-[16px] font-regular",
  }[size];

  const widthClass = width === "full" ? "w-full" : "w-auto";
  const finalClass = `${baseClass} ${variantClass} ${widthClass} ${sizeClass} ${
    loading || disabled ? disabledOrLoadingClass : ""
  } ${className} `;

  return (
    <button
      className={finalClass}
      type={type}
      onClick={!disabled && !loading ? onClick : undefined}
      disabled={loading || disabled}
    >
      {children}
    </button>
  );
};

export default Button;
