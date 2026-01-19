import { useAllDoctorListQuery } from "@/shared/redux/features/admin/all-doctor-list/allDcotorListApi.ts";
import { MultiSelect, Text } from "@/shared/ui";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
interface IProps<TFieldValues extends FieldValues> {
  label?: string;
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  useIgnored?: boolean;
  weight?: string;
}
const AdminDoctorMultiSelect = <TFieldValues extends FieldValues>({
  label,
  name,
  control,
  weight,
}: IProps<TFieldValues>) => {
  const { data, isLoading: isUserLoading } = useAllDoctorListQuery();

  const doctorOptions =
    data?.data
      ?.filter((doc) => doc !== null)
      .map((doc) => ({
        value: doc.id,
        name: doc.email,
      })) ?? [];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <div className="col-span-3">
            {label && (
              <Text
                element="label"
                className={weight ? weight : "font-semibold"}
              >
                {label}
              </Text>
            )}
          </div>

          <div className="col-span-9">
            <MultiSelect
              size="sm"
              options={doctorOptions || []}
              value={field.value}
              loading={isUserLoading}
              onSelect={(values: string[]) => field.onChange(values)}
              error={{
                status: !!fieldState.error,
                message: fieldState.error?.message as string,
              }}
            />
          </div>
        </>
      )}
    />
  );
};

export default AdminDoctorMultiSelect;
