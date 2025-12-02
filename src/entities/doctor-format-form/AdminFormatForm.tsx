import { Editor } from "@/features";

import { Button, ControlInput, Text } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddFormatMutation,
  useUpdateFormatMutation,
} from "../formates/api/mutation";
import { useGetAdminFormatQuery } from "../formates/api/query";
import {
  ADMIN_FORAMTE_SCHEMA,
  type ADMIN_FORMATE_FORM_VALUES,
} from "../formates/model/schema";

interface Iprops {
  isUpdate?: boolean;
}
const AdminFormatForm = ({ isUpdate = false }: Iprops) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ADMIN_FORMATE_FORM_VALUES>({
    mode: "onChange",
    resolver: yupResolver(ADMIN_FORAMTE_SCHEMA),
    defaultValues: {
      title: "",
      details: "",
      type: "AdminFormat",
    },
  });
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [createFormat, { isLoading: isCreating }] = useAddFormatMutation();
  const [updateFormat, { isLoading: isUpdating }] = useUpdateFormatMutation();
  const { data: formatData, isLoading: isViewLoading } = useGetAdminFormatQuery(
    id!,
    {
      skip: !isUpdate || !id,
    }
  );
  useEffect(() => {
    if (isUpdate && formatData) {
      const data = Array.isArray(formatData) ? formatData[0] : formatData;

      reset({
        title: data.title ?? "",
        details: data.details ?? "",
        type: data.type ?? "AdminFormat",
      });
    }
  }, [isUpdate, formatData, reset]);

  const onSubmit: SubmitHandler<ADMIN_FORMATE_FORM_VALUES> = async (data) => {
    try {
      if (isUpdate && id) {
        await updateFormat({ id, ...data }).unwrap();
        navigate("/admin/all-formates");
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

export default AdminFormatForm;
