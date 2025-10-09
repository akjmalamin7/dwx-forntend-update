import { Button, Input, Text } from "@/shared/ui";
import { useState } from "react";
import { useForm } from "react-hook-form";

 
interface FormValues {
  patientId: string;
  patientName: string;
  patientAge: string;
  patientSex: string;
  patientHistory: string;
  xrayName: string;
  referenceDoctor: string;
  imageCategory: string;
}


const QuickAddPatient = () => {
   
   const { 
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    console.log("Form Data:", data); 
    setTimeout(() => setIsLoading(false), 1000);
  };



  return  (
      <div className="max-w-4xl mx-auto border border-indigo-200 rounded-md shadow-md">
      {/* Header */}
      <div className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-t-md">
        Quick Add Report
      </div>

     

      {/* Form Body */}
      <div className="p-4">
        <form 
         onSubmit={handleSubmit(onSubmit)}
         className="grid grid-cols-12 gap-y-4 items-center">

             {/* Patient ID */}
          <div className="col-span-3">
            <Text element="label" className="font-semibold">
              Upload Image
            </Text>
          </div>
          <div className="col-span-9">
            <Text element="p" className="text-red-600 text-center text-sm font-medium">
              Note: Please upload image first then type patient information, please wait
              sometime for showing the preview image
            </Text>

            <Input type="file" className="border rounded w-full"></Input>
          </div> 


           {/* Patient ID */}
          <div className="col-span-3">
            <Text element="label" className="font-semibold">
              Patient Information File [.txt file only]
            </Text>
          </div>
          <div className="col-span-9"> 
            <Input type="file" className="border rounded w-full"></Input>
          </div> 

          {/* Patient History */}
          <div className="col-span-3">
            <Text element="label" className="font-semibold">
              Patient History
            </Text>
          </div>
          <div className="col-span-9 grid grid-cols-2 gap-2">
            <Input size="sm" placeholder="Patient History" />
            <select className="border border-neutral-400 rounded w-full p-2">
              <option>Choose patient history</option>
              <option value="Back Pain">Back Pain</option>
              <option value="Injured">Injured</option>
            </select>
          </div>
 
          {/* Reference Doctor */}
          <div className="col-span-3">
            <Text element="label" className="font-semibold">
              Reference Doctor
            </Text>
          </div>
          <div className="col-span-9 grid grid-cols-2 gap-2">
            <Input size="sm" placeholder="Reference Doctor" />
            <select className="border border-neutral-400 rounded w-full p-2">
              <option>Choose Reference Dr.</option>
              <option value="Dr Mahfuj">Dr Mahfuj</option>
              <option value="Dr. Manik">Dr. Manik</option>
            </select>
          </div>

          {/* Image Category */}
          <div className="col-span-3">
            <Text element="label" className="font-semibold">
              Image Category
            </Text>
          </div>
          <div className="col-span-9">
            <select className="border rounded border-neutral-400 w-full p-2">
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Multiple">Multiple</option> 
            </select>
          </div>

          {/* Select Doctor */}
          <div className="col-span-3">
            <Text element="label" className="font-semibold">
              Select Doctor
            </Text> 
          </div>
          <div className="col-span-9"> 
            <select className="border border-neutral-400 rounded w-full p-2">
              <option>Choose Reference Dr.</option>
              <option value="Dr Mahfuj">Dr Mahfuj</option>
              <option value="Dr. Manik">Dr. Manik</option>
            </select>
          </div>

          {/* Ignore Doctor */}
          <div className="col-span-3">
            <Text element="label" className="font-semibold">
              Ignore Doctor
            </Text>

          </div>
          <div className="col-span-9"> 
            <select className="border rounded border-neutral-400 w-full p-2">
              <option>Choose Reference Dr.</option>
              <option value="Dr Mahfuj">Dr Mahfuj</option>
              <option value="Dr. Manik">Dr. Manik</option>
            </select>
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
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickAddPatient;
