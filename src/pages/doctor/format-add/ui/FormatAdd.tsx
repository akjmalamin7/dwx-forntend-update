import { Button, ControlInput, Panel, PanelHeading } from "@/shared/ui";
import { FormatFormschema,   type FormatFormValues } from "./formatAdd.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";  
import { useAddFormatMutation } from "@/shared/redux/features/doctor/format-add/addFormatApi";
import { Editor } from "@/features";

const FormatAdd = () => {
    const {
      control,
      handleSubmit,
      reset,
      formState: {isValid },
    } = useForm<FormatFormValues>({
      mode: "onChange",
      resolver: yupResolver(FormatFormschema),
      defaultValues: { 
        title: "",
        details: "",
        type: "DoctorFormat",
      },
    });

    const [createFormat, { isLoading }] = useAddFormatMutation();
  
    const onSubmit: SubmitHandler<FormatFormValues> = async (data) => {
     
      try {
        await createFormat(data).unwrap();
        reset(); 
      } catch (err: unknown) {
        if (err && typeof err === "object" && "data" in err) {
          const e = err as { data?: { message?: string }; message?: string };
          console.error("Error creating patient:", e.data?.message || e.message);
        } else {
          console.error("Error creating patient:", String(err));
        }
      }
    };
  return (
    <Panel 
    header={
            <PanelHeading
              title="Add Format"
              button="Format List"
              path="/doctor/format"
            />
          } 
          >
      <form className="grid grid-cols-12 gap-y-4 items-center pt-5 pb-5"
        onSubmit={handleSubmit(onSubmit, (errros) => console.log(errros))}>
        
       
          <ControlInput
                    control={control}
                    size="sm"
                    label="Format Title"
                    placeholder="Format Title"
                    name="title"
                  /> 
          <ControlInput
                    control={control}
                    size="sm"
                    label="details"
                    placeholder="details"
                    name="details"
                  /> 
                    <div className="col-span-12 block">
        <Editor 
          placeholder="Format Details" 
        />
      </div>

        {/* Submit */}
        <div className="col-span-3"></div>
        <div className="col-span-9">
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
      </form>
    </Panel>
  );
};

export default FormatAdd;
