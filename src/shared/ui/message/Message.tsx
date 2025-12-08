import { Panel } from "../panel";
import { Text } from "../text";
interface Props {
  message?: string;
  title?: string;
  type?: "error" | "normal";
}
const Message = ({
  message,
  title = "Radiology Doctor List",
  type = "normal",
}: Props) => {
  return (
    <Panel size="lg" header={title}>
      <Text size="3xl" color={type === "error" ? "danger" : "dark"}>
        {message}s.
      </Text>
    </Panel>
  );
};

export default Message;
