import AdminPaymentForm from "@/entities/admin-payment-form";
import { usePageTitle } from "@/shared/hooks";
import { Panel, PanelHeading } from "@/shared/ui";

const PaymentAdd = () => {

  usePageTitle("Add Bank Info", {
        prefix: "DWX - ",
        defaultTitle: "DWX",
        restoreOnUnmount: true,
      });
      
  return (
    <Panel
      header={
        <PanelHeading
          title="Add Bank Info"
          button="Bank Accunt List"
          path="/admin/payment-list"
        />
      }
    >
      <AdminPaymentForm />
    </Panel>
  );
};

export default PaymentAdd;
