export interface COMPLETED_DOCTOR {
  _id: string;
  email: string;
  id: string;
}

export interface COMPLETED_PATIENT_MODEL {
  _id: string;
  agent_id: string;
  completed_dr: COMPLETED_DOCTOR[];
  ignore_dr: string[];
  patient_id: string;
  name: string;
  age: string;
  gender: string;
  history: string;
  ref_doctor: string;
  image_type: string;
  xray_name: string;
  rtype: string;
  status: string;
  soft_delete: string;
  month_year: string;
  completed_time: string;
  is_checked: boolean | null;
  logged: string | null;
  printstatus: string | null;
  study_for: string;
  viewed: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface COMPLETED_PATIENT_TRANSFORM_MODEL {
  _id: string;
  id: string;
  completed_dr: COMPLETED_DOCTOR[];
  createdAt: string;
  patient_id: string;
  name: string;
  gender: string;
  age: string;
  xray_name: string;
  rtype: string; 
  printstatus: string | null;
  completed_time: string;
  viewed: boolean;
  is_checked: boolean | null;
}

export interface CompletedPatientApiResponse {
  message: string;
  success: boolean;
  total: number;
  data: COMPLETED_PATIENT_MODEL[];
}

export const transformCompletedPatientResponse = (
  data: COMPLETED_PATIENT_MODEL[]
): COMPLETED_PATIENT_TRANSFORM_MODEL[] => {
  return data.map((item) => ({
    _id: item._id,
    id: item.id,
    completed_dr: item.completed_dr || [],
    createdAt: item.createdAt,
    patient_id: item.patient_id,
    name: item.name,
    gender: item.gender,
    age: item.age,
    xray_name: item.xray_name,
    rtype: item.rtype,
    completed_time: item.completed_time,
    printstatus: item.printstatus,
    viewed: item.viewed,
    is_checked: item.is_checked,
  }));
};
