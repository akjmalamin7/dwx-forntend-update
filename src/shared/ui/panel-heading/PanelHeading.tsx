import isString from "lodash/isString";
import { Link } from "react-router-dom";
import { Text } from "../text";

interface IProps {
  title: string;
  button: React.ReactNode | string;
  path?: string;
}
const PanelHeading = ({ title, button, path }: IProps) => {
  return (
    <div className="flex justify-between items-center print:hidden">
      <div>
        <Text element="h2" className="text-md text-yellow-50 font-semibold">
          {title}
        </Text>
      </div>
      <div>
        {isString(button) ? (
          <Link
            to={path || "/"}
            className="bg-green-500 rounded-md px-4 py-1 block"
          >
            {button}
          </Link>
        ) : (
          button
        )}
      </div>
    </div>
  );
};
export default PanelHeading;
