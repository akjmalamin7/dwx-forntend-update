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
  name: string;
  email: string;
  role: string;
  mobile: string;
  address: string;
  image: string | null;  
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
    name: item.name,
    email: item.email,
    role: item.role,
    mobile: item.mobile,
    address: item.address,
    image:
      item.image && item.image.length > 0 && item.image[0].length > 0
        ? item.image[0][0]
        : null,  
  }));
};

