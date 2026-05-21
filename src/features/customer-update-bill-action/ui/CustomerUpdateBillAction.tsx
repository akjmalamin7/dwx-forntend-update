import { useCustomerUpdateBillActionMutation } from "@/shared/redux/features/admin/update-customer-bill-action/updateCustomerBillAction";
 
import AdminSelect from "@/shared/ui/select/AdminSelect";
import { useState } from "react";

interface IProps {
  defaultValue?: string;
  name?: string;
  id?: string;
}
const CustomerUpdateBillAction = ({ defaultValue, name, id }: IProps) => {
  const [currentValue, setCurrentValue] = useState(defaultValue || "");
  const [customerUpdateBillAction, { isLoading }] =
    useCustomerUpdateBillActionMutation();
  const handleSelect = async (selectedValue: string) => {
    if (!id) {
      console.error("Bill ID is missing!");
      alert("Bill ID is missing. Cannot update.");
      return;
    }

    const previousValue = currentValue;

    setCurrentValue(selectedValue);

    try {
      await customerUpdateBillAction({
        patient_id: id,
        new_image_type: selectedValue,
      }).unwrap();
    } catch (error) {
      console.error("Update failed:", error);
      setCurrentValue(previousValue);
      alert("Bill ID is missing. Cannot update.");
    }
  };
  return (
    <AdminSelect
      size="sm"
      value={currentValue}
      name={name}
      onSelect={handleSelect}
      disabled={isLoading}
      className="!h-[22px] !min-h-[22px] [&>*]:!h-[22px] [&>*]:!min-h-[22px]"
      options={[
        { name: "Single", value: "single" },
        { name: "Double", value: "double" },
        { name: "Multiple", value: "multiple" },
        { name: "Ecg", value: "ecg" },
      ]}
    />
  );
};

export default CustomerUpdateBillAction;
