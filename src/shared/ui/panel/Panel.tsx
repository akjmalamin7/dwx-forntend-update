import { Text } from "../text";
interface PanelProps {
  size?: "sm" | "md" | "lg" | "xl";
  header?: React.ReactNode | string;
  children?: React.ReactNode;
}
const Panel = ({ children, header, size = "md" }: PanelProps) => {
  const sizes = {
    sm: "",
    md: "max-w-4xl",
    lg: "max-w-7xl",
    xl: "max-w-8xl",
  }[size];
  return (
    <div
      className={`${sizes} mx-auto border border-indigo-200 rounded-md shadow-md print:shadow-none print:border-0 print:rounded-none`}
    >
      <div className="bg-blue-600 text-white px-4 py-2 rounded-t-md print:hidden">
        <Text element="h2" className="text-md text-yellow-50 font-semibold">
          {header ? header : "Pannel header"}
        </Text>
      </div>
      <div className="p-4 bg-white">{children}</div>
    </div>
  );
};

export default Panel;
