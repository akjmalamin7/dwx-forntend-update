import { useGetAdminFormLstQuery } from "@/shared/redux/features/doctor/admin-format-list/adminFormatListApi";
import { Select, Text } from "@/shared/ui";
import { useEffect, useMemo, useState } from "react";
interface IProps {
  value?: string;
  onSelect?: (value: string) => void;
}

const AdminFormatList = ({ value, onSelect }: IProps) => {
  const { data } = useGetAdminFormLstQuery();
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
        className="block mb-2

          text-gray-900 "
      >
        {/* //  dark:text-white */}
        Admin Format
      </Text>
      <Select
        value={selectedValue}
        options={options ?? []}
        size="sm"
        onSelect={handleSelectValue}
      />
      {/* <CustomSelect
        value={selectedValue}
        options={options ?? []}
        onSelectedValue={handleSelectValue}
      /> */}
    </div>
  );
};

export default AdminFormatList;
