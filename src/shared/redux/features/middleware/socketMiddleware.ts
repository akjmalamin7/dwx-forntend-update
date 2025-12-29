import type { BackOnlineDoctorPayload, NewXrayReportPayload, ViewOnlineDoctorPayload, WSMessage } from "@/shared/hooks/use-web-socket/model/schema";
import { AdminPendingPatientListApi } from "@/shared/redux/features/admin/pending-patient-list/pendingPatientListApi";
import type { Middleware } from "@reduxjs/toolkit";
import { connected, disconnected, socketMessageReceived } from "../socket-slice/socketSlice";

let socket: WebSocket | null = null;

export const socketMiddleware: Middleware = (store) => (next) => (action: any) => {
  const { dispatch, getState } = store;

  if (action.type === "socket/connect") {
    if (socket) socket.close();

    socket = new WebSocket(import.meta.env.VITE_WS_URL);

    socket.onopen = () => dispatch(connected());
    socket.onclose = () => dispatch(disconnected());

    socket.onmessage = (event) => {
      const msg: WSMessage = JSON.parse(event.data);
      dispatch(socketMessageReceived(msg));

      handleWSMessage(msg, dispatch, getState);
    };
  }

  return next(action);
};


// ===============================
// WS MESSAGE HANDLER
// ===============================
function handleWSMessage(msg: WSMessage, dispatch: any, getState: any) {
  const state = getState();
  const page = state.adminPendingPatients.query.page || 1;
  const limit = state.adminPendingPatients.query.limit || 10;
  const search = state.adminPendingPatients.query.search || "";

  switch (msg.type) {
    case "new_xray_report": {
      const payload = msg.payload as NewXrayReportPayload;
      const patient = payload.savedPatient;

      dispatch(
        AdminPendingPatientListApi.util.updateQueryData(
          "getPendingPatientList",
          { page, limit, search },
          (draft) => {
            const exists = draft.data.some((p) => p._id === patient._id);
            if (!exists) draft.data.unshift(patient);
          }
        )
      );
      break;
    }

    case "view_online_doctor": {
      const payload = msg.payload as ViewOnlineDoctorPayload;
      const { patient_id, doctor } = payload;

      dispatch(
        AdminPendingPatientListApi.util.updateQueryData(
          "getPendingPatientList",
          { page, limit, search },
          (draft) => {
            const patient = draft.data.find((p) => p._id === patient_id);
            if (patient) patient.online_dr = doctor;
          }
        )
      );
      break;
    }

    case "back_view_patient": {
      const payload = msg.payload as BackOnlineDoctorPayload;
      const { patient_id } = payload;

      dispatch(
        AdminPendingPatientListApi.util.updateQueryData(
          "getPendingPatientList",
          { page, limit, search },
          (draft) => {
            const patient = draft.data.find((p) => p._id === patient_id);
            if (patient) patient.online_dr = { _id: "", email: "", id: "" };
          }
        )
      );
      break;
    }

    case "submit_patient": {
      const payload = msg.payload as { patient_id: string };
      const { patient_id } = payload;

      dispatch(
        AdminPendingPatientListApi.util.updateQueryData(
          "getPendingPatientList",
          { page, limit, search },
          (draft) => {
            draft.data = draft.data.filter((p) => p._id !== patient_id);
          }
        )
      );
      break;
    }

    default:
      break;
  }
}
