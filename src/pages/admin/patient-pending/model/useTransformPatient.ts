import type {
  AdmincompletedBack,
  NewXrayReportPayload,
} from "@/shared/hooks/use-web-socket/model/schema";

export const useTransformPatient = () => {
  const transformWsPatient = (payload: NewXrayReportPayload) => {
    if (!payload || !payload.savedPatient._id) {
      throw new Error("Invalid WS patient payload");
    }
    return {
      key: payload.savedPatient._id,
      ...payload.savedPatient,
    };
  };

  const extractPatientPayload = (payload: NewXrayReportPayload) => {
    if (!payload) return null;
    if (payload.savedPatient._id) return payload;
    return null;
  };
  const addPatientGetFromArchive = (payload: AdmincompletedBack) => {
    if (!payload || !payload.patient) {
      throw new Error("Invalid WS patient payload");
    }
    return {
      key: payload.patient._id,
      ...payload.patient,
    };
  };

  return {
    transformWsPatient,
    extractPatientPayload,
    addPatientGetFromArchive,
  };
};
