import { useCustomerUpdateBillActionMutation } from "@/shared/redux/features/admin/update-customer-bill-action/updateCustomerBillAction";
import { Select } from "@/shared/ui";
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
    <Select
      size="sm"
      value={currentValue}
      name={name}
      onSelect={handleSelect}
      disabled={isLoading}
      className="lg:!h-[30px]"
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
