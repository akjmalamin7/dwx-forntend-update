import { Panel, Text } from "@/shared/ui";
import type { ReactNode } from "react";
interface Props {
  title?: ReactNode;
}
const AgentFormError = ({ title }: Props) => {
  return (
    <Panel>
      <Text element="p" size="xl" fontWeight="bold">
        {title}
      </Text>
      <Text element="h1" size="2xl" fontWeight="bold" color="danger">
        Hotline: +880 1759497773, +880 1867074078
      </Text>
    </Panel>
  );
};
export default AgentFormError;
