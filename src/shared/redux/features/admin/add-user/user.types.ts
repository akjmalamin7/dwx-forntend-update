export interface USER_MODEL {
  _id: string; 
  name: string;
  email: string;
  mobile: string;
  address: string; 
  role: string; 
  id: string;
}

export interface USER_TRANSFORM_MODEL {
  _id: string; 
  name: string;
  email: string;
  mobile: string;
  address: string; 
  role: string; 
  id: string;
}

export interface UserListApiResponse {
  message: string;
  success: boolean;
  total: number;
  data: USER_TRANSFORM_MODEL[];
}

export const transformUserListResponse = (
  data: USER_TRANSFORM_MODEL[]
): USER_TRANSFORM_MODEL[] => {
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
