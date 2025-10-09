import { _ } from "lodash";
import { Text } from "../text";
interface PanelProps {
  size?: "sm" | "md" | "lg";
  header?: React.ReactNode | string;
  children?: React.ReactNode;
}
const Panel = ({ children, header, size = "md" }: PanelProps) => {
  const sizes = {
    sm: "",
    md: "max-w-4xl",
    lg: "max-w-7xl",
  }[size];
  return (
    <div
      className={`${sizes} mx-auto border border-indigo-200 rounded-md shadow-md`}
    >
      <div className="bg-blue-600 text-white px-4 py-2 rounded-t-md">
        {_.isString(header) ? (
          <Text element="h2" className="text-md text-yellow-50 font-semibold">
            All Completed Report
          </Text>
        ) : (
          header
        )}
      </div>
      <div className="p-4 bg-white">{children}</div>
    </div>
  );
};

export default Panel;
