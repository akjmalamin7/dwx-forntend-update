export interface PENDING_DOCTOR {
  _id: string;
  email: string;
  id: string;
}

export interface AGENT_PENDING_PATIENT_MODEL {
  _id: string;
  agent_id: PENDING_DOCTOR;
  completed_dr: PENDING_DOCTOR[];
  doctor_id: PENDING_DOCTOR[];
  ignore_dr: PENDING_DOCTOR[];
  online_dr: PENDING_DOCTOR;
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
  completed_time: string | null;
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

export interface PENDING_PATIENT_TRANSFORM_MODEL {
  _id: string;
  id: string;
  doctor_id: PENDING_DOCTOR[];
  ignore_dr: PENDING_DOCTOR[];
  online_dr: PENDING_DOCTOR;
  createdAt: string;
  patient_id: string;
  name: string;
  gender: string;
  age: string;
  xray_name: string;
  rtype: string;
  printstatus: string | null;
  viewed: boolean;
  is_checked: boolean | null;
}

export interface PendingPatientApiResponse {
  message: string;
  success: boolean;
  total: number;
  data: AGENT_PENDING_PATIENT_MODEL[];
}

export const transformPendingPatientResponse = (
  data: AGENT_PENDING_PATIENT_MODEL[]
): AGENT_PENDING_PATIENT_MODEL[] => {
  return data.map((item) => ({
    _id: item._id,
    id: item.id,
    completed_dr: item.completed_dr || [],
    doctor_id: item.doctor_id || [],
    ignore_dr: item.ignore_dr || [],
    online_dr: item.online_dr,
    createdAt: item.createdAt,
    patient_id: item.patient_id,
    name: item.name,
    gender: item.gender,
    age: item.age,
    xray_name: item.xray_name,
    rtype: item.rtype,
    printstatus: item.printstatus,
    viewed: item.viewed,
    is_checked: item.is_checked,
    agent_id: item.agent_id,
    completed_time: item.completed_time,
    history: item.history,
    image_type: item.image_type,
    logged: item.logged,
    month_year: item.month_year,
    ref_doctor: item.ref_doctor,
    study_for: item.study_for,
    soft_delete: item.soft_delete,
    status: item.status,
    updatedAt: item.updatedAt,
    __v: item.__v,
  }));
};
