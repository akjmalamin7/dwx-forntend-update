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
  formFor?: string;
  defaultIds?: string[]; 
}
const CustomDoctorMultiSelector = <TFieldValues extends FieldValues>({
  label,
  name,
  control,
  setValue,
  useIgnored = false,
  weight,
  formFor,
  defaultIds
}: IProps<TFieldValues>) => {
  const isEcg = formFor?.toUpperCase() === "ECG";
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

  const SKIPPED_IDS = ["686b95c980aa4c941420dcf2", "686b95c980aa4c941420dd1f"];

 
  const preselectedIds: string[] = useIgnored
    ? transformedData.ignore_dr
    : transformedData.doctor_id;
 
    

  const allOptions = useMemo(() => {
  return doctorOptions
    .filter((d) => d !== null)
    .filter((d) => !SKIPPED_IDS.includes(d.id))  // 👈 এটা add করুন
    .map((doc) => ({ value: doc.id, name: doc.name }));
}, [doctorOptions]);

/*
  useEffect(() => {
    if (selectedDrData && !isEcg) {
      const preselectedIds: string[] = useIgnored
        ? selectedDrData.ignored_dr ?? []
        : selectedDrData.selected_dr ?? [];

      setValue(name, preselectedIds);
    }
  }, [selectedDrData, useIgnored, control, name, setValue]);*/

   
  useEffect(() => {
  if (!isEcg) {
    if (defaultIds && defaultIds.length > 0) {
      // Edit mode — patient data  
      setValue(name, defaultIds.filter((id) => !SKIPPED_IDS.includes(id)));
    } else if (selectedDrData) {
      // Create mode — profile  
      const preselectedIds = (
        useIgnored
          ? selectedDrData.ignored_dr ?? []
          : selectedDrData.selected_dr ?? []
      ).filter((id) => !SKIPPED_IDS.includes(id));

      setValue(name, preselectedIds);
    }
  }
}, [selectedDrData, defaultIds, useIgnored, name, setValue]);


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
