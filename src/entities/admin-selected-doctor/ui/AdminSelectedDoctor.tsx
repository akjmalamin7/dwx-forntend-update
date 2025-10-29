import { useAllDoctorListQuery } from "@/shared/redux/features/admin/all-doctor-list/allDcotorListApi.ts";
import { useGetAdminPatientViewQuery } from "@/shared/redux/features/admin/patient-view/patientViewApi";
import { DOCTOR_SELECTED_SCHEMA } from "@/shared/redux/features/admin/selected-doctor/selectedDoctor.type";
import { useSelectdDoctorMutation } from "@/shared/redux/features/admin/selected-doctor/selectedDoctorApi";
import { Button } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useMemo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import DoctorList from "./DoctorList";

const AdminSelectedDoctor = () => {
  const refArr = useRef([]);
  const { patient_id } = useParams<{ patient_id: string }>();
  const [selectdDoctor, { isLoading: isUpdating }] = useSelectdDoctorMutation();

  const { data: allDoctor, isLoading: isDoctorLoading } =
    useAllDoctorListQuery();
  const {
    data: patient_view,
    isLoading: patientLoading,
    error,
  } = useGetAdminPatientViewQuery(patient_id!, { skip: !patient_id });

  const patient = patient_view?.data.patient;
  const transformDoctorList = allDoctor?.data;
  const doctors = useMemo(
    () =>
      transformDoctorList?.map((dr) => ({ _id: dr._id, email: dr.email })) ??
      refArr.current,
    [transformDoctorList]
  );

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(DOCTOR_SELECTED_SCHEMA),
    defaultValues: {
      selected_drs_id: [],
      ignored_drs_id: [],
    },
  });

  useEffect(() => {
    if (patient) {
      reset({
        selected_drs_id: patient.doctor_id ?? [],
        ignored_drs_id: patient.ignore_dr ?? [],
      });
    }
  }, [patient, reset]);

  const onSubmit = handleSubmit(async (data) => {
    if (!patient_id) return;
    try {
      await selectdDoctor({ id: patient_id, data });
    } catch (err) {
      console.error(err);
    }
  });

  if (!patient_id) return <div>Patient ID not found</div>;
  if (error) return <div>Error loading patient data</div>;
  if (!patient && !patientLoading) return <div>No patient data found</div>;

  return (
    <form className="md:container w-full mx-auto p-5" onSubmit={onSubmit}>
      <div className="mb-5">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="md:w-1/2 w-full">
            <Controller
              name="selected_drs_id"
              control={control}
              render={({ field }) => (
                <DoctorList
                  title="Selected Doctor"
                  doctor={doctors}
                  isLoading={isDoctorLoading}
                  email="selected_drs_id"
                  selected={(field.value ?? []).filter(Boolean) as string[]}
                  onChangeDoctor={field.onChange}
                />
              )}
            />
          </div>

          <div className="md:w-1/2 w-full">
            <Controller
              name="ignored_drs_id"
              control={control}
              render={({ field }) => (
                <DoctorList
                  title="Ignored Doctor"
                  doctor={doctors}
                  isLoading={isDoctorLoading}
                  email="ignored_drs_id"
                  selected={(field.value ?? []).filter(Boolean) as string[]}
                  onChangeDoctor={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </div>

      <Button type="submit" loading={isUpdating}>
        {isUpdating ? "Updating..." : "Submit"}
      </Button>
    </form>
  );
};

export default AdminSelectedDoctor;
