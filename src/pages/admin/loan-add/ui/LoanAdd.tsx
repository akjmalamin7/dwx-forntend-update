import { useGetAdminUserListQuery } from "@/entities/admin/users/api/query";
import { usePageTitle } from "@/shared/hooks";
import {
  Button,
  ControlInput,
  ControlledSelect,
  Panel,
  PanelHeading,
} from "@/shared/ui";
import {
  loanFormSchema,
  type LoanFormValues,
} from "@/shared/utils/types/types";
import { useCreateLoanMutation } from "@/shared/redux/features/admin/loan/loanApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const LoanAdd = () => {
  const [createLoan, { isLoading }] = useCreateLoanMutation();

  const { data: userList } = useGetAdminUserListQuery({
    page: 1,
    limit: 1000,
    search: "",
    role: "admin",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<LoanFormValues>({
    mode: "onChange",
    resolver: yupResolver(loanFormSchema),
    defaultValues: {
      employee_id: "",
      total_loan: 0,
      note: "",
    },
  });

  const onSubmit: SubmitHandler<LoanFormValues> = async (data) => {
    try {
      await createLoan(data).unwrap();
      reset();

      toast.success("Loan added successfully!", {
        duration: 2000,
        position: "top-right",
      });
    } catch (err: unknown) {
      console.error("Error creating loan:", err);

      toast.error("Failed to add loan. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  usePageTitle("Add Loan", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  const employeeOptions =
    userList?.data?.map((user) => ({
      name: `${user.name} (${user.email})`,
      value: user._id,
    })) || [];

  return (
    <>
      <Toaster />
      <Panel
        header={
          <PanelHeading
            title="Add Loan"
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
          {/* Employee */}
          <ControlledSelect
            label="Employee"
            control={control}
            name="employee_id"
            options={employeeOptions} 
          />

          {/* Total Loan */}
          <ControlInput
            control={control}
            size="sm"
            type="number"
            label="Loan Amount"
            placeholder="Amount"
            name="total_loan"
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
              {isLoading ? "Submitting" : "Add Loan"}
            </Button>
          </div>
        </form>
      </Panel>
    </>
  );
};

export default LoanAdd;