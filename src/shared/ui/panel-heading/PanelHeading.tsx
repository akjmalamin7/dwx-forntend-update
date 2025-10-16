import { Link } from "react-router-dom";
import { Text } from "../text";

interface IProps {
  title: string;
  button: string;
  path: string;
}
const PanelHeading = ({ title, button, path }: IProps) => {
  return (
    <div className="flex justify-between items-center print:hidden">
      <div>
        <Text element="h2" className="text-md text-yellow-50 font-semibold">{title}</Text>
      </div>
      <div>
        <Link to={path || "/"} className="bg-green-500 rounded-md p-1 block">{button}</Link>
      </div>
    </div>
  );
};
export default PanelHeading;