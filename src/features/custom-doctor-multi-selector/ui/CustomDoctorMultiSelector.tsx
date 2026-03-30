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

const SKIPPED_IDS = ["686b95c980aa4c941420dcf2", "686b95c980aa4c941420dd1f"];

const CustomDoctorMultiSelector = <TFieldValues extends FieldValues>({
  label,
  name,
  control,
  setValue,
  useIgnored = false,
  weight,
  formFor: _formFor,
  defaultIds,
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

  // ✅ UI তে SKIPPED_IDS দেখাবে না
  const allOptions = useMemo(() => {
    return doctorOptions
      .filter((d) => d !== null)
      .filter((d) => !SKIPPED_IDS.includes(d.id))
      .map((doc) => ({ value: doc.id, name: doc.name }));
  }, [doctorOptions]);

  useEffect(() => {
    if (defaultIds && defaultIds.length > 0) {
      // ✅ Edit mode — patient এর existing data যা আছে তাই set করো
      setValue(name, defaultIds);
    } else if (selectedDrData) {
      // ✅ Create mode — profile এর data directly use করো
      // SKIPPED_IDS profile এ থাকলে backend এ যাবে, না থাকলে যাবে না
      const preselected = useIgnored
        ? selectedDrData.ignored_dr ?? []      // ignore_dr — profile এর data
        : selectedDrData.selected_dr ?? [];    // doctor_id — profile এর data (SKIPPED_IDS সহ যদি থাকে)

      setValue(name, preselected);
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
              // ✅ UI তে SKIPPED_IDS দেখাবে না
              value={(field.value ?? []).filter(
                (id: string) => !SKIPPED_IDS.includes(id)
              )}
              loading={isDoctorsLoading || isProfileLoading}
              // ✅ user select করলে — profile এ SKIPPED_IDS থাকলে merge করো
              onSelect={(values: string[]) => {
                const skippedFromProfile = useIgnored
                  ? [] // ignore_dr তে SKIPPED_IDS যাবে না
                  : (selectedDrData?.selected_dr ?? []).filter((id) =>
                      SKIPPED_IDS.includes(id)
                    ); // doctor_id তে profile এ যদি SKIPPED_IDS থাকে তাহলে রাখো

                const merged = new Set([...values, ...skippedFromProfile]);
                field.onChange(Array.from(merged));
              }}
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