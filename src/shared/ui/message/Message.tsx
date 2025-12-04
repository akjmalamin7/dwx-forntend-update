import { Panel } from "../panel";
import { Text } from "../text";
interface Props {
  message?: string;
  type?: "error" | "normal";
}
const Message = ({ message, type = "normal" }: Props) => {
  return (
    <Panel size="lg" header="Radiology Doctor List">
      <Text size="3xl" color={type === "error" ? "danger" : "dark"}>
        {message}s.
      </Text>
    </Panel>
  );
};

export default Message;
