import { XrayImages } from "@/entities";
import { useGetAdminPatientViewQuery } from "@/shared/redux/features/admin/patient-view/patientViewApi";
import { Button, Input, Panel, PanelHeading } from "@/shared/ui";
import { Table } from "@/shared/ui/table";
import type { DataSource } from "@/shared/ui/table/table.model";
import { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
import { PATIENT_VIEW_DAT_COL } from "./patientView.data.col";

const PatientView = () => {
  const { patient_id } = useParams<{ patient_id: string }>();
  const {
    data: patient_view,
    isLoading: patientLoading,
    error,
  } = useGetAdminPatientViewQuery(patient_id!, { skip: !patient_id });

  const patient = patient_view?.data.patient;
  const attachments = patient_view?.data.attachments;

  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstance = useRef<Viewer | null>(null);

  useEffect(() => {
    if (viewerRef.current) {
      viewerInstance.current = new Viewer(viewerRef.current, {
        inline: false,
        navbar: false,
        toolbar: {
          zoomIn: 1,
          zoomOut: 1,
          reset: 1,
          oneToOne: 1,
          prev: 1,
          play: 0,
          next: 1,
          rotateLeft: 1,
          rotateRight: 1,
          flipHorizontal: 1,
          flipVertical: 1,
        },
        title: false,
      });
    }

    return () => {
      viewerInstance.current?.destroy();
    };
  }, []);

  const DATA_TABLE: DataSource[] = useMemo(() => {
    if (!patient) return [];

    return [
      {
        key: patient._id || `patient-${Date.now()}`,
        patient_id: patient.patient_id || "N/A",
        patient_name: patient.name || "N/A",
        age: patient.age || "N/A",
        history: patient.history || "N/A",
        sex: patient.gender || "N/A",
        agent_name: patient.agent_id?.email,
      },
    ];
  }, [patient]);

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
      header={
        <PanelHeading
          title="Patient View"
          button="Back to Patient List"
          path="/agent/patient-completed"
        />
      }
      size="lg"
    >
      <div className="flex">
        <div className="w-1/2">
          {patient && (
            <div className="p-4 responsive">
              <Table
                columns={PATIENT_VIEW_DAT_COL}
                dataSource={DATA_TABLE}
                loading={patientLoading}
                border="bordered"
                size="xs"
              />
            </div>
          )}

          {/* Image Viewer Section */}
          <XrayImages attachments={attachments || []} />
        </div>
        <div className="w-1/2">
          <Panel
            header={<PanelHeading title="Select Doctor" button=" " path=" " />}
            size="lg"
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
        </div>
      </div>

      <div className="flex mt-5 mmb-5 gap-5">
        <div className="w-1/2">
          <Panel
            header={<PanelHeading title="Add New Image" button=" " path=" " />}
            size="lg"
          >
            <form>
              {/* Patient Image */}
              <Input
                size="sm"
                type="file"
                label="File"
                placeholder="Patient Id"
                name="image"
              />

              <Button
                type="submit"
                className=" text-white mt-5 bg-blue-600 hover:bg-blue-700 "
              >
                Submit
              </Button>
            </form>
          </Panel>
        </div>
        <div className="w-1/2">
          <Panel
            header={
              <PanelHeading
                title="Update Image [Convert DCM TO Image]"
                button=" "
                path=" "
              />
            }
            size="lg"
          >
            <form>
              {/* Upload Image */}
              <Input
                size="sm"
                type="file"
                label="File"
                placeholder="Patient Id"
                name="image"
              />
              {/* Patient History*/}
              <Input
                size="sm"
                label="Patient History"
                placeholder="Patient History"
                name="history"
              />
              {/* X-ray Name*/}
              <Input
                size="sm"
                label="X-ray Name"
                placeholder="X-ray Name"
                name="X-ray Name"
              />
              {/* X-ray Name*/}
              <Input
                size="sm"
                label="X-ray Name"
                placeholder="X-ray Name"
                name="X-ray Name"
              />

              <select className="block border p-2 mt-3">
                <option>Xray</option>
                <option>ECG</option>
                <option>DCM</option>
                <option>CTSCAN</option>
              </select>

              <Button
                type="submit"
                className=" text-white mt-5 bg-blue-600 hover:bg-blue-700  block"
              >
                Submit
              </Button>
            </form>
          </Panel>
        </div>
      </div>

      <div className="w-full mt-5">
        <Panel
          header={<PanelHeading title="Clone Report" button=" " path=" " />}
          size="lg"
        >
          <form className="md:container w-full mx-auto p-5">
            <div className="mb-5">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                  <label
                    htmlFor="files"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Upload Image
                  </label>
                </div>
                <div className="md:w-3/4"></div>
              </div>
            </div>

            <div className="mb-5">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                  <label
                    htmlFor="patient_id"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Patient ID
                  </label>
                </div>
                <div className="md:w-3/4">
                  <input
                    type="hidden"
                    id="_id"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="_id"
                    required
                  />
                  <input
                    type="text"
                    id="patient_id"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Patient ID"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Patient Name
                  </label>
                </div>
                <div className="md:w-3/4">
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Patient Name"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                  <label
                    htmlFor="age"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Patient Age
                  </label>
                </div>
                <div className="md:w-3/4">
                  <input
                    type="text"
                    id="age"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Patient Age"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Patient Sex
                  </label>
                </div>
                <div className="md:w-3/4">
                  <select
                    id="gender"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <div className="md:flex md:items-center">
                <div className="md:w-1/4">
                  <label
                    htmlFor="history"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Patient History
                  </label>
                </div>
                <div className="md:w-3/4">
                  <div className="md:flex md:items-center ">
                    <div className="md:w-2/4 mr-2">
                      <input
                        type="text"
                        id="historyInput"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                    <div className="md:w-2/4 ml-2"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <div className="md:flex md:items-center">
                <div className="md:w-1/4">
                  <label
                    htmlFor="xray_name"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    X-ray Name
                  </label>
                </div>
                <div className="md:w-3/4">
                  <div className="md:flex md:items-center">
                    <div className="md:w-2/4 mr-2">
                      <input
                        type="text"
                        id="xray_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        required
                      />
                    </div>
                    <div className="md:w-2/4 ml-2"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <div className="md:flex md:items-center">
                <div className="md:w-1/4">
                  <label
                    htmlFor="ref_doctor"
                    className="block  text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Reference Doctor
                  </label>
                </div>
                <div className="md:w-3/4">
                  <div className="md:flex md:items-center">
                    <div className="md:w-2/4 mr-2">
                      <input
                        type="text"
                        id="ref_doctor"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="md:w-2/4 ml-2"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="image_type"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Image Category
              </label>
              <select
                id="image_type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Multiple">Multiple</option>
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor="selected_dr"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Doctor
              </label>
            </div>

            <div className="mb-5">
              <label
                htmlFor="ignored_dr"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ignored Doctor
              </label>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </Panel>
      </div>
    </Panel>
  );
};

export default PatientView;
