

export interface CHECKEDUSER_MODEL {
    _id: string;
  id: string;
  user_id: string;
  name: string; 
  details: string; 
  createdAt: string; 
  updatedAt: string;
}

export interface CHECKEDUSER_TRANSFORM_MODEL { 
  _id: string;
  id: string; 
  name: string; 
  details: string;  
} 
export interface CheckedUserListApiResponse {
  message: string;
  success: boolean;
  total: number;
  data: CHECKEDUSER_MODEL[];
}

export const transformCheckedUserListResponse = (
  data: CHECKEDUSER_MODEL[]
): CHECKEDUSER_TRANSFORM_MODEL[] => {
  return data.map((item) => ({
    _id: item._id,
    id: item.id, 
    name: item.name,
    details: item.details 
  }));
};

