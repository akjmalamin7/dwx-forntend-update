export interface DOCTOR_XRAY_MODEL {
  _id: string;
  id: string;
  patient_id: string;
  agent_id: string;
  image_type: "single" | "double" | "multiple" | "ecg" | string; // restrict known values, allow fallback
  month: string; // e.g. "2025-10"
  xray_name: string;
  username: string;
}


export interface DOCTOR_XRAY_RESPONSE {
  message: string;
  success: boolean;
  data: DOCTOR_XRAY_MODEL[];
}

export interface DOCTOR_XRAY_TRANSFORM_MODEL {
  id: string;
  _id: string;
  agent_id: string;
  patient_id: string;
  month: string;
  xray_name: string;
  image_type: string;
  username: string;
}

export const transformDoctorXrayResponse = (
  data: DOCTOR_XRAY_MODEL[]
): DOCTOR_XRAY_TRANSFORM_MODEL[] => {
  return data.map((item) => ({
    id: item.id,
    _id: item._id,
    agent_id: item.agent_id,
    patient_id: item.patient_id,
    month: item.month,
    xray_name: item.xray_name,
    image_type: item.image_type,
    username: item.username,
  }));
};