import React from "react";

interface Props {
  children?: React.ReactNode;
  padding?: "xs" | "sm" | "md" | "lg" | "xlg" | "2xl" | "none";
}
const CardHeader = ({ padding = "xs", children }: Props) => {
  const paddings = {
    none: "px-0 py-0",
    xs: "px-[10px] py-[10px]",
    sm: "px-[12px] py-[12px]",
    md: "px-[16px] py-[16px]",
    lg: "px-[20px] py-[20px]",
    xlg: "px-[25px] py-[25px]",
    "2xl": "px-[48px] py-[48px]",
  }[padding];
  const finalClasses = `bg-gray-00 w-full ${paddings}`;
  return <div className={finalClasses}>{children}</div>;
};

export default CardHeader;
