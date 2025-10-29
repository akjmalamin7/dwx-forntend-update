export interface DOCTOR_MODEL {
  _id: string;
  id: string;
  name: string;
  email: string;
  role: string;
  mobile: string;
  address: string;
  image: string[][]; 
}

export interface DOCTOR_TRANSFORM_MODEL {
  _id: string;
  id: string; 
  email: string; 
  address: string; 
}

export interface UpdateDoctorApiResponse {
  message: string;
  success: boolean;
  total?: number;
  data: DOCTOR_MODEL[];
}

export const transformUpdateDoctorResponse = (
  data: DOCTOR_MODEL[]
): DOCTOR_TRANSFORM_MODEL[] => {
  return data.map((item) => ({
    _id: item._id,
    id: item.id, 
    email: item.email, 
    address: item.address, 
  }));
};

