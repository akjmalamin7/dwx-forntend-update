import { ManageTransactionList } from "@/entities/agent/manage-transaction";
import { Panel } from "@/shared/ui";

const ManageTransectionHistory = () => {
  return (
    <Panel header="Manage Transection History" size="lg">
      <ManageTransactionList />
    </Panel>
  );
};

export default ManageTransectionHistory;
