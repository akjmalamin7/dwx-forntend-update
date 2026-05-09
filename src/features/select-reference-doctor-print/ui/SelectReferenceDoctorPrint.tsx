import { useGetReferenceListQuery } from "@/shared/redux/features/agent/reference-list/referenceListApi";
import { CustomSelect } from "@/shared/ui";
import type { OptionsType } from "@/shared/utils/types/types";
import { useCallback, useMemo, useState } from "react";

interface Props {
  onSelectedValue?: (value: string) => void;
}

const SelectReferenceDoctorPrint = ({ onSelectedValue }: Props) => {
  const [selectValue, setSelectValue] = useState<string>();
  const { data: referenceOptions, isLoading } = useGetReferenceListQuery();

  const options: OptionsType[] = useMemo(() => {
    if (!referenceOptions) return [];
    return referenceOptions.map((item) => ({
      name: item.name,
      value: item.id,
    }));
  }, [referenceOptions]);

  const handleSelectChange = useCallback(
    (val: string) => {
      const option = options.find((opt) => opt.value === val);
      if (option) {
        setSelectValue(val);
        onSelectedValue?.(option.name);
      } else {
        setSelectValue(undefined);
        onSelectedValue?.("");
      }
    },
    [options, onSelectedValue]
  );

  return (
    <CustomSelect
      value={selectValue}
      options={options}
      onSelectedValue={handleSelectChange}
      loading={isLoading}
    />
  );
};

export default SelectReferenceDoctorPrint;