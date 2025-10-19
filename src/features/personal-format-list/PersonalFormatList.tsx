import { useGetPersonalFormLstQuery } from "@/shared/redux/features/doctor/personal-format-list/personalFormatListApi";
import { Text } from "@/shared/ui";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
interface IProps {
  onSelect?: (value: string) => void;
  value?: string;
}

const PersonalFormatList = ({ value, onSelect }: IProps) => {
  const { data } = useGetPersonalFormLstQuery();

  const [selectedValue, setSelectedValue] = useState<string>("");
  const formats = useMemo(() => data?.data ?? [], [data]);

  const handleSelectValue = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect?.(value);
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

      <select
        className="border border-gray-500  w-full px-[15px] appearance-none outline-none h-[30px] xl:h-[38px] text-[14px] rounded-[8px]"
        value={selectedValue}
        onChange={handleSelectValue}
      >
        <option value="">Select Personal Format</option>
        {formats &&
          formats.map((personaFormat) => (
            <option key={personaFormat._id} value={personaFormat.details}>
              {personaFormat.title}
            </option>
          ))}
      </select>
    </div>
  );
};

export default PersonalFormatList;
