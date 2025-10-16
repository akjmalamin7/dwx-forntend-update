import { Button, ControlInput, Panel, PanelHeading } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form"; 
import { CheckedUserFormschema, type CheckedUserFormValues } from "@/shared/redux/features/agent/checked-user-add/AddCheckedUser.types";
import { useAddCheckedUserMutation } from "@/shared/redux/features/agent/checked-user-add/AddCheckedUserApi";
 

const CheckedUserAdd = () => {
    const {
      control,
      handleSubmit,
      reset,
      formState: { isValid },
    } = useForm<CheckedUserFormValues>({
      mode: "onChange",
      resolver: yupResolver(CheckedUserFormschema),
      defaultValues: { 
        name: "",
        details: "",
      },
    });
 
    const [createCheckedUser, { isLoading }] = useAddCheckedUserMutation();
  
    const onSubmit: SubmitHandler<CheckedUserFormValues> = async (data) => {
     
      try {
        await createCheckedUser(data).unwrap();
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
              title="Add New Checked User"
              button="Checked User List"
              path="/agent/checked-user-list"
            />
          }  >

      <form className="grid grid-cols-12 gap-y-4 items-center pt-5 pb-5"
        onSubmit={handleSubmit(onSubmit, (errros) => console.log(errros))}
         > 
          <ControlInput
                    control={control}
                    size="sm"
                    label="Name"
                    placeholder="Name"
                    name="name"
                  /> 
          <ControlInput
                    control={control}
                    size="sm"
                    label="User Designation"
                    placeholder="User Designation"
                    name="details"
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

export default CheckedUserAdd;
