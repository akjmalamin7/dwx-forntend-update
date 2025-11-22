import { Button, Checkbox, Loader } from "@/shared/ui";

type DoctorsType = {
  _id: string;
  email: string;
};

interface LProps {
  title?: string;
  doctor: DoctorsType[];
  email?: string;
  selected?: string[];
  isLoading?: boolean;
  onChangeDoctor?: (ids: string[]) => void;
  onUnchecked?: () => void;
}

const DoctorList = ({
  title,
  doctor,
  selected = [],
  isLoading,
  onChangeDoctor,
  onUnchecked,
}: LProps) => {
  const handleCheckboxChange = (checked: boolean, id: string) => {
    const updated = checked
      ? [...selected, id]
      : selected.filter((item) => item !== id);
    onChangeDoctor?.(updated);
  };
  return (
    <div className="border border-gray-300 rounded-md p-4">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-sm font-semibold text-gray-700 ">{title}</h2>
        <Button
          className={`h-auto! py-[4px]! rounded-[12px]! text-[13px]! `}
          type="button"
          onClick={onUnchecked}
        >
          Uncheck all
        </Button>
      </div>
      {isLoading ? (
        <Loader type="regular" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-2 gap-x-2">
          {doctor
            ?.filter((dr) => dr.email !== "All")
            ?.map((dr) => (
              <Checkbox
                key={dr._id}
                value={dr._id}
                name={dr._id}
                label={dr.email}
                checked={selected.includes(dr._id)}
                onChange={(e) => handleCheckboxChange(e.target.checked, dr._id)}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default DoctorList;
