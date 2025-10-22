import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";

interface CardProps {
  children?: React.ReactNode;
  padding?: "xs" | "sm" | "md" | "lg" | "xlg" | "2xl" | "none";
  bgColor?: "dark" | "white";
  radius?: "sm" | "md" | "lg";
  className?: string;
  cardStyle?: "border" | "shadow";
}

const cardStyles: Record<string, string> = {
  border: "border border-[#E5E5F0]",
  shadow: "drop-shadow-sm",
};

const bgColors: Record<string, string> = {
  primary: "bg-gray-100",
  white: "bg-gray-100",
};
const radiuses: Record<string, string> = {
  sm: "rounded-[8px]",
  md: "rounded-[12px]",
  lg: "rounded-[16px]",
};
const Card = ({
  cardStyle = "shadow",
  padding = "none",
  bgColor = "white",
  radius = "md",
  className,
  children,
}: CardProps) => {
  const paddings = {
    none: "px-0 py-0",
    xs: "px-[10px] py-[10px]",
    sm: "px-[12px] py-[12px]",
    md: "px-[16px] py-[16px]",
    lg: "px-[20px] py-[20px]",
    xlg: "px-[25px] py-[25px]",
    "2xl": "px-[48px] py-[48px]",
  }[padding];
  const cardBgColors = bgColors[bgColor] || "";
  const cardRadius = radiuses[radius] || "";
  const customCardStyles = cardStyles[cardStyle] || "";
  const finalClassName = `card ${customCardStyles} ${paddings} ${cardBgColors} ${cardRadius} overflow-hidden ${className}`;
  return <div className={finalClassName}>{children}</div>;
};
Card.CardHeader = CardHeader;
Card.CardBody = CardBody;
Card.CardFooter = CardFooter;
export default Card;
