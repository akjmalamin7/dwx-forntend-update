export interface DOCTOR_MODEL {
  _id: string; 
  name: string;
  email: string;
  mobile: string;
  address: string; 
  id: string;
}

export interface DOCTOR_TRANSFORM_MODEL {
  _id: string; 
  name: string;
  email: string;
  mobile: string;
  address: string; 
  role: string; 
  id: string;
}

export interface DoctorListApiResponse {
  message: string;
  success: boolean;
  total: number;
  data: DOCTOR_TRANSFORM_MODEL[];
}

export const transformDoctorListResponse = (
  data: DOCTOR_TRANSFORM_MODEL[]
): DOCTOR_TRANSFORM_MODEL[] => {
  return data.map((item) => ({
    _id: item._id,
    id: item.id, 
    name: item.name,
    email: item.email,
    mobile: item.mobile,
    address: item.address,
    role: item.role
  }));
};
