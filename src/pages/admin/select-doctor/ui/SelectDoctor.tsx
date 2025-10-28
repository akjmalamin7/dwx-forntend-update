import { useGetAdminPatientViewQuery } from "@/shared/redux/features/admin/patient-view/patientViewApi";
import { Button, Panel, PanelHeading } from "@/shared/ui";
import { useParams } from "react-router-dom";

const SelectDoctor = () => {
  const { patient_id } = useParams<{ patient_id: string }>();
  const {
    data: patient_view,
    isLoading: patientLoading,
    error,
  } = useGetAdminPatientViewQuery(patient_id!, { skip: !patient_id });

  const patient = patient_view?.patient;

  if (!patient_id) {
    return <div>Patient ID not found</div>;
  }

  if (error) {
    return <div>Error loading patient data</div>;
  }

  if (!patient && !patientLoading) {
    return <div>No patient data found</div>;
  }

  return (
    <Panel
      header={<PanelHeading title="Select Doctor" button="" path="/" />}
      size="md"
    >
      <form className="md:container w-full mx-auto p-5">
        <div className="mb-5">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Selected Doctor List */}
            <div className="md:w-1/2 w-full">
              <div className="border border-gray-300 rounded-md p-4">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">
                  Selected Doctor List
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-2">
                  <label className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      name="selected_drs_id"
                      value="10"
                      className="form-checkbox"
                    />
                    Dr. Manik
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      name="selected_drs_id"
                      value="10"
                      className="form-checkbox"
                    />
                    Dr. Manik
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      name="selected_drs_id"
                      value="10"
                      className="form-checkbox"
                    />
                    Dr. Manik
                  </label>
                </div>
              </div>
            </div>

            {/* Ignored Doctor List */}
            <div className="md:w-1/2 w-full">
              <div className="border border-gray-300 rounded-md p-4">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">
                  Ignored Doctor List
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-2">
                  <label className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      name="ignored_drs_id"
                      className="form-checkbox"
                    />
                    Dr. Mahfuj
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      name="selected_drs_id"
                      value="10"
                      className="form-checkbox"
                    />
                    Dr. Manik
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      name="selected_drs_id"
                      value="10"
                      className="form-checkbox"
                    />
                    Dr. Manik
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className=" text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </Button>
      </form>
    </Panel>
  );
};

export default SelectDoctor;
