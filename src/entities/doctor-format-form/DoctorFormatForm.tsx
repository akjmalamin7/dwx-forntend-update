import { Editor } from "@/features";
import {
  FormatFormschema,
  type FormatFormValues,
} from "@/pages/doctor/format-add/ui/formatAdd.types";

import {
  useAddFormatMutation,
  useGetFormatQuery,
  useUpdateFormatMutation,
} from "@/shared/redux/features/doctor/format/formatApi";
import { Button, ControlInput, Text } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
interface Iprops {
  isUpdate?: boolean;
}
const DoctorFormatForm = ({ isUpdate = false }: Iprops) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormatFormValues>({
    mode: "onChange",
    resolver: yupResolver(FormatFormschema),
    defaultValues: {
      title: "",
      details: "",
      type: "DoctorFormat",
    },
  });
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [createFormat, { isLoading: isCreating }] = useAddFormatMutation();
  const [updateFormat, { isLoading: isUpdating }] = useUpdateFormatMutation();
  const { data: formatData, isLoading: isViewLoading } = useGetFormatQuery(
    id!,
    {
      skip: !isUpdate || !id,
    }
  );
  useEffect(() => {
    if (isUpdate && formatData) {
      reset({
        title: formatData.title || "",
        details: formatData.details || "",
        type: formatData.type || "DoctorFormat",
      });
    }
  }, [isUpdate, formatData, reset]);

  const onSubmit: SubmitHandler<FormatFormValues> = async (data) => {
    try {
      if (isUpdate && id) {
        await updateFormat({ id, ...data }).unwrap();
        navigate("/doctor/format");
      } else {
        await createFormat(data).unwrap();
        reset();
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "data" in err) {
        const e = err as { data?: { message?: string }; message?: string };
        console.error("Error creating patient:", e.data?.message || e.message);
      } else {
        console.error("Error creating patient:", String(err));
      }
    }
  };

  const isLoading = isCreating || isUpdating || (isUpdate && isViewLoading);
  return (
    <form
      className="grid grid-cols-12 gap-y-4 items-center pt-5 pb-5"
      onSubmit={handleSubmit(onSubmit, (errros) => console.log(errros))}
    >
      <ControlInput
        control={control}
        size="sm"
        label="Format Title"
        placeholder="Format Title"
        name="title"
      />

      <Controller
        control={control}
        name="details"
        render={({ field }) => {
          return (
            <div className="col-span-12 block">
              <Editor
                label={<Text fontWeight="medium">Details</Text>}
                placeholder="Format Details"
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          );
        }}
      />

      {/* Submit */}
      {/* <div className="col-span-3"></div> */}
      <div className="col-span-9 ">
        <div className="flex justify-start">
          <Button
            color="dark"
            size="size-2"
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            loading={isLoading}
            disabled={!isValid}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default DoctorFormatForm;
