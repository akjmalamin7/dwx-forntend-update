import { ImageUpload } from "@/features";
import { Button, Panel, PanelHeading } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
 import { useNavigate,  useParams } from "react-router-dom";
import { useAddNewImageMutation } from "../api/mutation";
import { ADD_NEW_IMAGE_SCHEMA } from "../model/schema";

const AddNewImageForm = () => {
  const navigate = useNavigate();
  const { patient_id } = useParams<{ patient_id: string }>();
  const [resetCount, setResetCount] = useState<number>(0);
  const [addNewImage, { isLoading: isUploading }] = useAddNewImageMutation();
  const { control, handleSubmit, watch, reset, setValue } = useForm({
    resolver: yupResolver(ADD_NEW_IMAGE_SCHEMA),
    defaultValues: {
      _id: patient_id ?? "",
      attachment: [],
      small_url: [],
    },
    mode: "onChange",
  });
  const attachments = watch("attachment");
 
  const hasImages = Array.isArray(attachments) && attachments.length > 0;
  const handleOnSubmit = handleSubmit(async (values) => {
    try {
      await addNewImage({
        _id: values._id,
        attachment: values.attachment,
        small_url: values.small_url,
      }).unwrap();
      //navigate("/admin/patient");
      navigate(0);
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

          <div className="flex flex-col-reverse lg:flex-row w-full mt-2 gap-6">
              <div className="flex-1/4">
                  <ImageUpload
                    control={control}
                    name="attachment"
                    key={resetCount}
                    isNote={false}
                    setValue={setValue}
                  />
              </div>
              <div className="flex-1/4"> 
                  <Button
                    type="submit"
                    className=" text-white mt-5 bg-blue-600 hover:bg-blue-700 "
                    loading={isUploading}
                    disabled={!hasImages}
                  >
                    Submit
                  </Button>
              </div>
                
            </div>

          
          
        </form>
      </Panel>
    </div>
  );
};

export default AddNewImageForm;
