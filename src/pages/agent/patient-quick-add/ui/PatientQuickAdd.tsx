import { Button, Input, Panel, Select, Text } from "@/shared/ui";
// interface FormValues {
//   patientId: string;
//   patientName: string;
//   patientAge: string;
//   patientSex: string;
//   patientHistory: string;
//   xrayName: string;
//   referenceDoctor: string;
//   imageCategory: string;
// }

const PatientQuickAdd = () => {
  return (
    <Panel header="Quick Add Report">
      <form className="grid grid-cols-12 gap-y-4 items-center">
        {/* Patient ID */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Upload Image
          </Text>
        </div>
        <div className="col-span-9">
          <Text
            element="p"
            className="text-red-600 text-center text-sm font-medium"
          >
            Note: Please upload image first then type patient information,
            please wait sometime for showing the preview image
          </Text>

          <Input type="file" className="border rounded w-full" />
        </div>

        {/* Patient ID */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Patient Information File [.txt file only]
          </Text>
        </div>
        <div className="col-span-9">
          <Input type="file" className="border rounded w-full" />
        </div>

        {/* Patient History */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Patient History
          </Text>
        </div>
        <div className="col-span-9 grid grid-cols-2 gap-2">
          <Input size="sm" placeholder="Patient History" />
          <Select
            options={[
              { name: "Choose one", value: "" },
              { name: "Back Pain", value: "back_pain" },
              { name: "Injured", value: "injured" },
            ]}
            size="sm"
          />
        </div>

        {/* Reference Doctor */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Reference Doctor
          </Text>
        </div>
        <div className="col-span-9 grid grid-cols-2 gap-2">
          <Input size="sm" placeholder="Reference Doctor" />
          <Select
            options={[
              { name: "Choose one", value: "" },
              { name: "Dr Mahfuj", value: "dr_mahfuj" },
              { name: "Dr Manik", value: "dr_manik" },
            ]}
            size="sm"
          />
        </div>

        {/* Image Category */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Image Category
          </Text>
        </div>
        <div className="col-span-9">
          <Select
            options={[
              { name: "Choose one", value: "" },
              { name: "Single", value: "single" },
              { name: "Double", value: "double" },
              { name: "Multiple", value: "multiple" },
            ]}
            size="sm"
          />
        </div>

        {/* Select Doctor */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Select Doctor
          </Text>
        </div>
        <div className="col-span-9">
          <Select
            options={[
              { name: "Choose one", value: "" },
              { name: "Dr Mahfuj", value: "dr_mahfuz" },
              { name: "Dr. Manik", value: "dr_manik" },
            ]}
            size="sm"
          />
        </div>

        {/* Ignore Doctor */}
        <div className="col-span-3">
          <Text element="label" className="font-semibold">
            Ignore Doctor
          </Text>
        </div>
        <div className="col-span-9">
          <Select
            options={[
              { name: "Choose one", value: "" },
              { name: "Dr Mahfuj", value: "dr_mahfuz" },
              { name: "Dr. Manik", value: "dr_manik" },
            ]}
            size="sm"
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
          >
            {/* {isLoading ? "Submitting..." : "Submit"} */}
            Submit
          </Button>
        </div>
      </form>
    </Panel>
  );
};

export default PatientQuickAdd;
