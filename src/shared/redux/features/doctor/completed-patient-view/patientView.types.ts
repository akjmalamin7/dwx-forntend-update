export interface PATIENT_VIEW_MODEL {
  _id: string;
  agent_id: string;
  doctor_id: string[];
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
  is_checked: string | null;
  logged: string | null;
  printstatus: string | null;
  study_for: string;
  viewed: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  online_dr: string | null;
  completed_dr: string;
  id: string;
 attachments?: string[][];
  comments?: PATIENT_COMMENT_MODEL;
}

export interface PATIENT_VIEW_TRANSFORM_MODEL {
  _id: string;
  name: string;
  patient_id: string;
  age: string;
  createdAt: string;
  history: string;
  id: string;
  gender: string;
  xray_name: string;
  ref_doctor: string;
}

// Image/Attachment Types
export interface PATIENT_IMAGE_MODEL {
  _id: string;
  patient_id: string;
  attachment: string[][];
  __v: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface PATIENT_COMMENT_MODEL {
  _id: string;
  patient_id: string;
  doctor_id: string;
  passault: string;
  comments: string;
  image_type: string;
  month: string;
  xray_name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface PATIENT_VIEW_RESPONSE {
  message: string;
  success: boolean;
   data: PATIENT_VIEW_MODEL & {
    attachments?: PATIENT_IMAGE_MODEL[];
    doctorcomments?: PATIENT_COMMENT_MODEL | null;
  };
} 
// Transform function for patient view response
export const TRANSFORM_PATIENT_VIEW_RESPONSE = (
  response: PATIENT_VIEW_RESPONSE
): {
  patient: PATIENT_VIEW_TRANSFORM_MODEL;
  attachments: PATIENT_IMAGE_MODEL[];
  comments: PATIENT_COMMENT_MODEL | null;
} => {
  if (!response.success) {
    throw new Error(response.message);
  }

  // The backend returns patient data directly under `data`
  const patient = response.data;
  const attachments = response.data.attachments ?? [];
  const doctorcomments = response.data.doctorcomments ?? null;

  if (!patient || !patient._id) {
    console.error("Invalid patient response:", response);
    throw new Error("Invalid response structure: missing patient data");
  }

  const transformedPatient: PATIENT_VIEW_TRANSFORM_MODEL = {
    _id: patient._id,
    name: patient.name,
    patient_id: patient.patient_id,
    age: patient.age,
    createdAt: patient.createdAt,
    history: patient.history,
    id: patient.id,
    gender: patient.gender,
    xray_name: patient.xray_name,
    ref_doctor: patient.ref_doctor,
  };

  return {
    patient: transformedPatient,
    attachments,
    comments: doctorcomments,
  };
};