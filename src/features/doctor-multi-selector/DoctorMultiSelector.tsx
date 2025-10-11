import { useGetDoctorOptionsQuery } from "@/shared/redux/features/agent/ignore-dr/ignoreDrApi";
import { Loader, MultiSelect, Text } from "@/shared/ui";
interface IProps {
  label?: string;
  onSelect?: (values: string[]) => void;
}
const DoctorMultiSelector = ({ label, onSelect }: IProps) => {
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
          loading={isLoading}
          onSelect={onSelect}
        />
      </div>
    </>
  );
};

export default DoctorMultiSelector;
