import { useJWT } from "@/shared/hooks";
import { useGetDoctorOptionsQuery } from "@/shared/redux/features/agent/ignore-dr/ignoreDrApi";
import { useGetProfileSelectDoctorIdQuery } from "@/shared/redux/features/profile/profileApi";
import { MultiSelect, Text } from "@/shared/ui";
import { skipToken } from "@reduxjs/toolkit/query";
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
}

const DoctorMultiSelector = <TFieldValues extends FieldValues>({
  label,
  name,
  control,
  useIgnored = false,
}: IProps<TFieldValues>) => {
  const decoded = useJWT();
  const userId: string | undefined = decoded?.id;
  const { data: doctorOptions = [], isLoading: isDoctorsLoading } =
    useGetDoctorOptionsQuery();

  const { data: selectedDrData, isLoading: isProfileLoading } =
    useGetProfileSelectDoctorIdQuery(userId ?? skipToken);

  // if (isDoctorsLoading || isProfileLoading) return <Loader />;
  const preselectedIds: string[] = useIgnored
    ? selectedDrData?.ignored_dr ?? []
    : selectedDrData?.selected_dr ?? [];

  const allOptions = doctorOptions
    .filter((doc) => doc != null)
    .map((doc) => ({ value: doc.id, name: doc.name }));
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <div className="col-span-3">
            {label && (
              <Text element="label" className="font-semibold">
                {label}
              </Text>
            )}
          </div>

          <div className="col-span-9">
            <MultiSelect
              size="sm"
              options={allOptions}
              value={field.value?.length ? field.value : preselectedIds}
              loading={isDoctorsLoading || isProfileLoading}
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

export default DoctorMultiSelector;
