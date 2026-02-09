import { Text } from "../text";
interface PanelProps {
  size?: "sm" | "md" | "lg" | "xl";
  header?: React.ReactNode | string;
  children?: React.ReactNode;
  margin?: "sm" | "md" | "lg";
}
const Panel = ({
  children,
  header,
  size = "md",
  margin = "sm",
}: PanelProps) => {
  const sizes = {
    sm: "",
    md: "max-w-4xl",
    lg: "max-w-7xl",
    xl: "max-w-8xl",
  }[size];

  const margins = {
    sm: "my-2",
    md: "my-4",
    lg: "my-8",
  }[margin];

  return (
    <div
      className={`${sizes} ${margins} mx-auto border border-indigo-200 rounded-md shadow-md print:shadow-none print:border-0 print:rounded-none`}
    >
      <div className="bg-blue-600 text-white px-3 py-3.5 rounded-t-md print:hidden">
        <Text element="h2" className="text-md text-yellow-50 font-semibold">
          {header ? header : "Pannel header"}
        </Text>
      </div>
      <div className="p-4 bg-white">{children}</div>
    </div>
  );
};

export default Panel;
