// SettingsForm.tsx
import { SettingsFormSchema, type SettingsFormValues } from "@/pages/admin/setting/ui/setting";
import { Button, ControlInput, ControlledSelect } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

interface IProps {
  onSubmit: SubmitHandler<SettingsFormValues>;
  isLoading?: boolean;
  defaultValues?: Partial<SettingsFormValues>;
  isEdit?: boolean;
}

const SettingForm = ({
  onSubmit,
  isLoading,
  defaultValues,
  isEdit = false,
}: IProps) => {
  const methods = useForm<SettingsFormValues>({
    mode: "onChange",
    resolver: yupResolver(SettingsFormSchema),
    defaultValues: {
      doctor_msg: "",
      customer_msg: "",
      mobile_1: "",
      mobile_2: "",
      mobile_3: "",
      mobile_4: "",
      skype: "",
      anydesk: "",
      email: "",
      address: "",
      logo: "",
      is_print: 1,
      bill_is_print: 1,
      pusher_time: undefined,
      patient_info: "",
      admin_pending_refresh: undefined,
      admin_complete_refresh: undefined,
      ...defaultValues,
    },
  });

  const {
    control,
    reset,
    formState: { isValid },
  } = methods;

  // defaultValues আসলে form populate করো (edit mode)
  useEffect(() => {
    if (defaultValues && isEdit) {
      reset({
        doctor_msg: defaultValues.doctor_msg || "",
        customer_msg: defaultValues.customer_msg || "",
        mobile_1: defaultValues.mobile_1 || "",
        mobile_2: defaultValues.mobile_2 || "",
        mobile_3: defaultValues.mobile_3 || "",
        mobile_4: defaultValues.mobile_4 || "",
        skype: defaultValues.skype || "",
        anydesk: defaultValues.anydesk || "",
        email: defaultValues.email || "",
        address: defaultValues.address || "",
        logo: defaultValues.logo || "",
        is_print: defaultValues.is_print ?? 1,
        bill_is_print: defaultValues.bill_is_print ?? 1,
        pusher_time: defaultValues.pusher_time,
        patient_info: defaultValues.patient_info || "",
        admin_pending_refresh: defaultValues.admin_pending_refresh,
        admin_complete_refresh: defaultValues.admin_complete_refresh,
      });
    }
  }, [defaultValues, isEdit, reset]);

  const handleSubmit: SubmitHandler<SettingsFormValues> = async (data) => {
    try {
      await onSubmit(data);
    } catch (err: unknown) {
      console.error("Error saving settings", err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="grid grid-cols-12 gap-y-4 items-center pt-5 pb-5"
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        {/* Messages */}
        <ControlInput
          control={control}
          size="sm"
          label="Doctor Message"
          placeholder="Doctor Message"
          name="doctor_msg"
        />
        <ControlInput
          control={control}
          size="sm"
          label="Customer Message"
          placeholder="Customer Message"
          name="customer_msg"
        />

        {/* Mobiles */}
        <ControlInput
          control={control}
          size="sm"
          label="Mobile 1"
          placeholder="Mobile 1"
          name="mobile_1"
        />
        <ControlInput
          control={control}
          size="sm"
          label="Mobile 2"
          placeholder="Mobile 2"
          name="mobile_2"
        />
        <ControlInput
          control={control}
          size="sm"
          label="Mobile 3"
          placeholder="Mobile 3"
          name="mobile_3"
        />
        <ControlInput
          control={control}
          size="sm"
          label="Mobile 4"
          placeholder="Mobile 4"
          name="mobile_4"
        />

        {/* Contact */}
        <ControlInput
          control={control}
          size="sm"
          label="Email"
          placeholder="Email"
          name="email"
        />
        <ControlInput
          control={control}
          size="sm"
          label="Skype"
          placeholder="Skype ID"
          name="skype"
        />
        <ControlInput
          control={control}
          size="sm"
          label="Anydesk"
          placeholder="Anydesk ID"
          name="anydesk"
        />

        {/* Other */}
        <ControlInput
          control={control}
          size="sm"
          label="Address"
          placeholder="Address"
          name="address"
        />
        <ControlInput
          control={control}
          size="sm"
          label="Logo URL"
          placeholder="Logo URL"
          name="logo"
        />
        <ControlInput
          control={control}
          size="sm"
          label="Patient Info"
          placeholder="Patient Info"
          name="patient_info"
        />
        <ControlInput
          control={control}
          size="sm"
          label="Pusher Time (ms)"
          placeholder="Pusher Time"
          name="pusher_time"
          type="number"
        />
        <ControlInput
          control={control}
          size="sm"
          label="Admin Pending Refresh (ms)"
          placeholder="Admin Pending Refresh"
          name="admin_pending_refresh"
          type="number"
        />
        <ControlInput
          control={control}
          size="sm"
          label="Admin Complete Refresh (ms)"
          placeholder="Admin Complete Refresh"
          name="admin_complete_refresh"
          type="number"
        />
     
      {/* Flags */}
      <ControlledSelect
        label="Manage Bill Print (1/0)"
        control={control}
        name="is_print"
        options={[
          { name: "Hide", value: "1" },
          { name: "Show", value: "0" },
        ]}
      />
      
      {/* Flags */}
      <ControlledSelect
        label="Bill Page Print (1/0)"
        control={control}
        name="bill_is_print"
        options={[
          { name: "Hide", value: "1" },
          { name: "Show", value: "0" },
        ]}
      />
      
       

        {/* Submit */}
        <div className="col-span-3"></div>
        <div className="col-span-9">
          <Button
            color="dark"
            size="size-2"
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            loading={isLoading}
            disabled={!isValid}
          >
            {isLoading ? "Submitting" : "Save Settings"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SettingForm;