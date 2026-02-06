import React from "react";

interface TextProps {
  isEditable?: boolean;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  element?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "div"
    | "strong"
    | "label"
    | "del";
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "warning"
    | "dark"
    | "white";
  textAlign?: "start" | "center" | "end";
  fontWeight?: "regular" | "medium" | "semiBold" | "bold";
  textDecoration?: "underline" | "overline" | "line-through" | "none";
  className?: string;
}

const Text = ({
  element = "p",
  size = "md",
  color = "dark",
  textAlign = "start",
  fontWeight = "regular",
  textDecoration = "none",
  children,
  className = "",
  isEditable = false,
}: TextProps) => {
  const Tag = element as keyof React.JSX.IntrinsicElements;

  const sizeClasses = {
    sm: "text-[12px]",
    md: "text-[16px] md:text-[18px]",
    lg: "text-[16px] md:text-[18px]",
    xl: "text-[18px] md:text-[20px]",
    "2xl": "text-[20px] md:text-[28px]",
    "3xl": "text-[26px] lg:text-[36px]",
  }[size];

  const colorClasses = {
    primary: "text-blue-600",
    secondary: "text-gray-600",
    tertiary: "text-green-600",
    danger: "text-red-600",
    warning: "text-yellow-500",
    dark: "text-gray-900",
    white: "text-white",
  }[color];

  const textAlignClasses = {
    start: "text-left",
    center: "text-center",
    end: "text-right",
  }[textAlign];

  const fontWeightClasses = {
    regular: "font-normal",
    medium: "font-medium",
    semiBold: "font-semibold",
    bold: "font-bold",
  }[fontWeight];

  const textDecorationClasses = {
    underline: "underline",
    overline: "overline",
    "line-through": "line-through",
    none: "no-underline",
  }[textDecoration];

  const finalClass = `${sizeClasses} ${colorClasses} ${textAlignClasses} ${fontWeightClasses} ${textDecorationClasses} ${className}`;

  return (
    <Tag className={finalClass} contentEditable={isEditable ?? false}>
      {children}
    </Tag>
  );
};

export default Text;
