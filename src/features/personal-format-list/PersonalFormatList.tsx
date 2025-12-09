import { useGetPersonalFormLstQuery } from "@/shared/redux/features/doctor/personal-format-list/personalFormatListApi";
import { CustomSelect, Text } from "@/shared/ui";
import { useEffect, useMemo, useState } from "react";
interface IProps {
  onSelect?: (value: string) => void;
  value?: string;
}

const PersonalFormatList = ({ value, onSelect }: IProps) => {
  const { data } = useGetPersonalFormLstQuery();

  const [selectedValue, setSelectedValue] = useState<string>("");
  const formats = useMemo(() => data?.data ?? [], [data]);
  const options = useMemo(() => {
    return (
      formats
        .filter((f) => f !== null && f !== undefined)
        .map((f) => ({
          name: f.title,
          value: f.details ?? "",
        })) ?? []
    );
  }, [formats]);
  const handleSelectValue = (val: string) => {
    setSelectedValue(val);
    onSelect?.(val);
  };
  useEffect(() => {
    if (!value) {
      setSelectedValue("");
      return;
    }
    setSelectedValue(value);
  }, [value, formats]);
  return (
    <div className="w-1/2">
      <Text
        element="label"
        fontWeight="bold"
        size="md"
        className="block mb-2 text-gray-900 dark:text-white"
      >
        Personal Format
      </Text>

      <CustomSelect
        value={selectedValue}
        options={options ?? []}
        onSelectedValue={handleSelectValue}
      />
    </div>
  );
};

export default PersonalFormatList;
