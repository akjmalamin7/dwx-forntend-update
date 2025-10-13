import { useGetDoctorOptionsQuery } from "@/shared/redux/features/agent/ignore-dr/ignoreDrApi";
import { Loader, MultiSelect, Text } from "@/shared/ui";
import type { ErrorType } from "@/shared/utils/types/types";
interface IProps {
  label?: string;
  error?: ErrorType;
  value?: string[];
  onSelect?: (values: string[]) => void;
}
const DoctorMultiSelector = ({ label, error, value = [], onSelect }: IProps) => {
  const { data: doctorOptions = [], isLoading } = useGetDoctorOptionsQuery();
  if (isLoading) <Loader />;
  return (
    <>
      <div className="col-span-3">
        <Text element="label" className="font-semibold">
          {label}
        </Text>
      </div>

      <div className="col-span-9">
        <MultiSelect
          size="sm"
          options={doctorOptions.map((doc) => ({
            value: doc.id,
            name: doc.name,
          }))}
          value={value}
          loading={isLoading}
          onSelect={onSelect}
          error={error}
        />
      </div>
    </>
  );
};

export default DoctorMultiSelector;
