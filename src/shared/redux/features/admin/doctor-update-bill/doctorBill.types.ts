export interface DOCTOR_XRAY_MODEL {
  _id: string;
  id: string;
  patient_id: string;
  username: string;
  image_type: "single" | "double" | "multiple" | "ecg" | string; 
  month: string; 
  xray_name: string; 
}


export interface DOCTOR_XRAY_RESPONSE {
  message: string;
  success: boolean;
  data: DOCTOR_XRAY_MODEL[];
}

export interface DOCTOR_XRAY_TRANSFORM_MODEL {
  id: string;
  _id: string; 
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
    month: item.month,
    xray_name: item.xray_name,
    image_type: item.image_type,
    username: item.username,
  }));
};