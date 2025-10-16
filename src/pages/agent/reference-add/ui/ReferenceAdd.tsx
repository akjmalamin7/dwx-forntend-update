import { Button, ControlInput, Input, Panel, PanelHeading, Text } from "@/shared/ui";
import { ReferenceFormschema, type ReferenceFormValues } from "./referenceAdd.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form"; 
import { useAddReferenceMutation } from "@/shared/redux/features/agent/reference-add/addPatientApi";


const ReferenceAdd = () => {
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors, isValid },
    } = useForm<ReferenceFormValues>({
      mode: "onChange",
      resolver: yupResolver(ReferenceFormschema),
      defaultValues: { 
        name: ""
      },
    });

    const [createReference, { isLoading }] = useAddReferenceMutation();
  
    const onSubmit: SubmitHandler<ReferenceFormValues> = async (data) => {
     
      try {
        await createReference(data).unwrap();
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
              title="Add Reference"
              button="Reference List"
              path="/agent/reference-list"
            />
          } 
          >
      <form className="grid grid-cols-12 gap-y-4 items-center pt-5 pb-5"
        onSubmit={handleSubmit(onSubmit, (errros) => console.log(errros))}>
        
       
          <ControlInput
                    control={control}
                    size="sm"
                    label="Reference Doctor Name"
                    placeholder="Reference Doctor Name"
                    name="name"
                  /> 
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

export default ReferenceAdd;
