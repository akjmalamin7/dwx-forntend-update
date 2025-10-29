import { Checkbox, Loader } from "@/shared/ui";

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
}

const DoctorList = ({
  title,
  doctor,
  selected = [],
  isLoading,
  onChangeDoctor,
}: LProps) => {
  const handleCheckboxChange = (checked: boolean, id: string) => {
    const updated = checked
      ? [...selected, id]
      : selected.filter((item) => item !== id);
    onChangeDoctor?.(updated);
  };
  return (
    <div className="border border-gray-300 rounded-md p-4">
      <h2 className="text-sm font-semibold text-gray-700 mb-2">{title}</h2>
      {isLoading ? (
        <Loader type="regular" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-2">
          {doctor?.filter((dr) => dr.email !== "All")?.map((dr) => (
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
