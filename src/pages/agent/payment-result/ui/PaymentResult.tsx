import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, Panel, PanelHeading, Text } from "@/shared/ui";

interface Props {
  status: "success" | "fail" | "cancel";
}

// Text component এর color prop এর টাইপ import করুন অথবা এখানে define করুন
type TextColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger"
  | "warning"
  | "dark"
  | "white";

interface PaymentResultConfig {
  title: string;
  color: TextColor;
  message: string;
}

const config: Record<"success" | "fail" | "cancel", PaymentResultConfig> = {
  success: {
    title: "Payment Successful",
    color: "tertiary", //  "success" এর বদলে "tertiary" (আপনার Text এ green color এর জন্য এটাই আছে)
    message: "আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।",
  },
  fail: {
    title: "Payment Failed",
    color: "danger",
    message: "পেমেন্ট ব্যর্থ হয়েছে, আবার চেষ্টা করুন।",
  },
  cancel: {
    title: "Payment Cancelled",
    color: "warning",
    message: "পেমেন্ট বাতিল করা হয়েছে।",
  },
};

const PaymentResult = ({ status }: Props) => {
  const [params] = useSearchParams();
  const tran_id = params.get("tran_id");
  const navigate = useNavigate();
  const { title, color, message } = config[status];

  return (
    <Panel header={<PanelHeading title={title} button="" path="" />} size="lg">
      <div className="flex flex-col items-center gap-4 py-10">
        <Text size="lg" color={color} fontWeight="bold">
          {message}
        </Text>
        {tran_id && <Text size="sm">Transaction ID: {tran_id}</Text>}
        <Button color="dark" onClick={() => navigate("/agent/bills")}>
          বিল লিস্টে ফিরে যান
        </Button>
      </div>
    </Panel>
  );
};

export default PaymentResult;