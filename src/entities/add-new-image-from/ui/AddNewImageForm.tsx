import { ImageUpload } from "@/features";
import { ADD_NEW_IMAGE_SCHEMA } from "@/shared/redux/features/admin/add-new-image/addNewImage.type";
import { useAddNewImageMutation } from "@/shared/redux/features/admin/add-new-image/addNewImageApi";
import { Button, Panel, PanelHeading } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const AddNewImageForm = () => {
  const { patient_id } = useParams<{ patient_id: string }>();
  const [resetCount, setResetCount] = useState<number>(0);
  const [addNewImage, { isLoading: isUploading }] = useAddNewImageMutation();
  const { control, handleSubmit, watch, reset } = useForm({
    resolver: yupResolver(ADD_NEW_IMAGE_SCHEMA),
    defaultValues: {
      _id: patient_id ?? "",
      attachment: [],
    },
    mode: "onChange",
  });
  const attachments = watch("attachment");
  const hasImages = Array.isArray(attachments) && attachments.length > 0;
  const handleOnSubmit = handleSubmit(async (values) => {
    try {
      await addNewImage(values).unwrap();
      reset();
      setResetCount((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <div className="w-full">
      <Panel
        header={<PanelHeading title="Add New Image" button=" " path=" " />}
        size="lg"
      >
        <form onSubmit={handleOnSubmit}>
          {/* Patient Image */}

          <ImageUpload
            control={control}
            name="attachment"
            key={resetCount}
            isNote={false}
          />
          <Button
            type="submit"
            className=" text-white mt-5 bg-blue-600 hover:bg-blue-700 "
            loading={isUploading}
            disabled={!hasImages}
          >
            Submit
          </Button>
        </form>
      </Panel>
    </div>
  );
};

export default AddNewImageForm;
