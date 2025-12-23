import type {
  AdmincompletedBack,
  AdminMrDeleteBack,
  NewXrayReportPayload,
} from "@/shared/hooks/use-web-socket/model/schema";
import { useCallback } from "react";

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
  const transformDeleteBackValue = useCallback((payload: AdminMrDeleteBack) => {
    if (!payload || !payload.patient) {
      throw new Error("Invalid WS patient payload");
    }
    return {
      ...payload.patient,
      key: payload.patient._id,
      completed_time: payload.patient.completed_time ?? "",
      completed_dr: payload.patient.completed_dr
        ? [payload.patient.completed_dr]
        : [],
      online_dr: { _id: "", email: "", id: "" },
    };
  }, []);

  return {
    transformWsPatient,
    extractPatientPayload,
    addPatientGetFromArchive,
    transformDeleteBackValue,
  };
};
