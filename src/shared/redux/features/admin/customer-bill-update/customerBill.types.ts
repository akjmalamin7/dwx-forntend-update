export interface AGENT_MODEL {
  _id: string;
  email: string;
  id: string;
}

export interface AGENT_XRAY_MODEL {
  _id: string;
  id: string; 
  agent_id: AGENT_MODEL;
  image_type: "single" | "double" | "multiple" | "ecg" | string;
  month_year: string;
  xray_name: string; 
}


export interface AGENT_XRAY_RESPONSE {
  message: string;
  success: boolean;
  data: AGENT_XRAY_MODEL[];
}

export interface AGENT_XRAY_TRANSFORM_MODEL {
  id: string;
  _id: string;
  agent_id: AGENT_MODEL; 
  month_year: string;
  xray_name: string;
  image_type: string; 
}

export const transformAgentXrayResponse = (
  data: AGENT_XRAY_MODEL[]
): AGENT_XRAY_TRANSFORM_MODEL[] => {
  return data.map((item) => ({
    id: item.id,
    _id: item._id,
    agent_id: item.agent_id, 
    month_year: item.month_year,
    xray_name: item.xray_name,
    image_type: item.image_type, 
  }));
};