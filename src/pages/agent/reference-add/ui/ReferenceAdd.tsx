import { Button, Input, Panel, Text } from "@/shared/ui";


const ReferenceAdd = () => {
  return (
    <Panel header="Add Reference">
      <form className="grid grid-cols-12 gap-y-4 items-center pt-5 pb-5">
        
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Reference Doctor Name
          </Text>
        </div>
        <div className="col-span-9 ">
          <Input size="sm" placeholder="Refer Name" /> 
        </div>

       
        {/* Submit */}
        <div className="col-span-3"></div>
        <div className="col-span-9">
          <Button
            color="dark"
            size="size-2"
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {/* {isLoading ? "Submitting..." : "Submit"} */}
            Submit
          </Button>
        </div>
      </form>
    </Panel>
  );
};

export default ReferenceAdd;
