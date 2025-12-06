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
}

export interface PATIENT_VIEW_TRANSFORM_MODEL {
  _id: string;
  createdAt: string;
  id: string;
  attachment: string[];
  rtype: string;
  study_for: string;
  doctor_id: string[];
  ignore_dr: string[];
  patient_id: string;
  name: string;
  age: string;
  history: string;
  gender: "male" | "female";
  xray_name: string;
  ref_doctor: string;
  image_type: "multiple" | "double" | "single";
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

export interface PATIENT_VIEW_RESPONSE {
  message: string;
  success: boolean;
  data: {
    patient: PATIENT_VIEW_MODEL;
    attachments: PATIENT_IMAGE_MODEL[];
  };
}
// Transform function for patient view response
export const TRANSFORM_PATIENT_VIEW_RESPONSE = (
  response: PATIENT_VIEW_RESPONSE
): {
  patient: PATIENT_VIEW_TRANSFORM_MODEL;
  attachments: PATIENT_IMAGE_MODEL[];
} => {
  if (!response.success) {
    throw new Error(response.message);
  }

  const { patient, attachments } = response.data;
  const getGender = (gender: string): "male" | "female" => {
    return gender === "male" || gender === "female" ? gender : "male";
  };
  const getImageType = (
    imageType: string
  ): "multiple" | "double" | "single" => {
    return imageType === "multiple" ||
      imageType === "double" ||
      imageType === "single"
      ? imageType
      : "single";
  };
  const transformedPatient: PATIENT_VIEW_TRANSFORM_MODEL = {
    _id: patient._id,
    name: patient.name,
    patient_id: patient.patient_id,
    age: patient.age,
    createdAt: patient.createdAt,
    history: patient.history,
    id: patient.id,
    gender: getGender(patient.gender),
    xray_name: patient.xray_name,
    ref_doctor: patient.ref_doctor,
    image_type: getImageType(patient.image_type),
    doctor_id: patient.doctor_id || [],
    ignore_dr: patient.ignore_dr || [],
    attachment: [],
    rtype: patient.rtype || "xray",
    study_for: patient.study_for || "xray_dr",
  };

  return {
    patient: transformedPatient,
    attachments: attachments ?? [],
  };
};
