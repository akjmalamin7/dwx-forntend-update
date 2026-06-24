import { usePageTitle } from "@/shared/hooks";
import { Button, ControlInput, Panel, PanelHeading } from "@/shared/ui";
import {
  repayFormSchema,
  type RepayFormValues,
} from "@/shared/utils/types/types";
import { useRepayLoanMutation } from "@/shared/redux/features/admin/loan/loanApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const RepayLoan = () => {
  const { loanId } = useParams<{ loanId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const employeeName = (location.state as { employeeName?: string } | null)
    ?.employeeName;

  const [repayLoan, { isLoading }] = useRepayLoanMutation();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<RepayFormValues>({
    mode: "onChange",
    resolver: yupResolver(repayFormSchema),
    defaultValues: {
      loan_id: loanId || "",
      amount: 0,
      note: "",
    },
  });

  const onSubmit: SubmitHandler<RepayFormValues> = async (data) => {
    try {
      await repayLoan(data).unwrap();

      toast.success("Repayment recorded successfully!", {
        duration: 2000,
        position: "top-right",
      });

      navigate(-1);
    } catch (err: unknown) {
      console.error("Error repaying loan:", err);

      toast.error("Failed to record repayment. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  usePageTitle("Repay Loan", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <>
      <Toaster />
      <Panel
        header={
          <PanelHeading
            title="Repay Loan"
            button="Loan List"
            path="/admin/loan"
          />
        }
        size="md"
      >
        <form
          className="grid grid-cols-12 gap-y-4 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Employee (display only) */}
          <div className="col-span-3">
            <label className="text-sm font-medium text-gray-700">
              Employee
            </label>
          </div>
          <div className="col-span-9">
            <p className="border border-gray-300 bg-gray-50 rounded px-3 py-2 text-sm text-gray-700">
              {employeeName || `Loan ID: ${loanId}`}
            </p>
          </div>

          {/* Amount */}
          <ControlInput
            control={control}
            size="sm"
            type="number"
            label="Repay Amount"
            placeholder="Amount"
            name="amount"
          />

          {/* Note */}
          <ControlInput
            control={control}
            size="sm"
            label="Note (optional)"
            placeholder="Note"
            name="note"
          />

          {/* Submit */}
          <div className="col-span-3"></div>
          <div className="col-span-9">
            <Button
              type="submit"
              color="dark"
              size="size-2"
              loading={isLoading}
              disabled={!isValid}
            >
              {isLoading ? "Submitting" : "Repay"}
            </Button>
          </div>
        </form>
      </Panel>
    </>
  );
};

export default RepayLoan;