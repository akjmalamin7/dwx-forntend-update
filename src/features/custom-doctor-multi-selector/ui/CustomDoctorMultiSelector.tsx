import { useJWT } from "@/shared/hooks";
import { useGetDoctorOptionsQuery } from "@/shared/redux/features/agent/ignore-dr/ignoreDrApi";
import { useGetProfileSelectDoctorIdQuery } from "@/shared/redux/features/profile/profileApi";
import { CustomMultiSelect, Text } from "@/shared/ui";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useMemo } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form";
interface IProps<TFieldValues extends FieldValues> {
  label?: string;
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  setValue: (name: Path<TFieldValues>, value: string[]) => void;
  useIgnored?: boolean;
  weight?: string;
}
const CustomDoctorMultiSelector = <TFieldValues extends FieldValues>({
  label,
  name,
  control,
  setValue,
  useIgnored = false,
  weight,
}: IProps<TFieldValues>) => {
  const decoded = useJWT();
  const userId: string | undefined = decoded?.id;
  const { data: doctorOptions = [], isLoading: isDoctorsLoading } =
    useGetDoctorOptionsQuery();

  const { data: selectedDrData, isLoading: isProfileLoading } =
    useGetProfileSelectDoctorIdQuery(userId ?? skipToken);
  const transformedData = selectedDrData
    ? {
        doctor_id: selectedDrData.selected_dr ?? [],
        ignore_dr: selectedDrData.ignored_dr ?? [],
      }
    : { doctor_id: [], ignore_dr: [] };

  const preselectedIds: string[] = useIgnored
    ? transformedData.ignore_dr
    : transformedData.doctor_id;

  const allOptions = useMemo(() => {
    const options = doctorOptions
      .filter((d) => d !== null)
      .map((doc) => ({ value: doc.id, name: doc.name }));
    return options;
  }, [doctorOptions]);

  useEffect(() => {
    if (selectedDrData) {
      const preselectedIds: string[] = useIgnored
        ? selectedDrData.ignored_dr ?? []
        : selectedDrData.selected_dr ?? [];

      setValue(name, preselectedIds);
    }
  }, [selectedDrData, useIgnored, control, name, setValue]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={preselectedIds as PathValue<TFieldValues, typeof name>}
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
            <CustomMultiSelect
              options={allOptions}
              // value={field.value?.length ? field.value : preselectedIds}
              value={field.value ?? []}
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

export default CustomDoctorMultiSelector;
