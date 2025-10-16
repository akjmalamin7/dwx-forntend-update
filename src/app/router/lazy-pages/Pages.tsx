import { lazy } from "react";

export const Pages = {
  Login: lazy(() => import("@/pages/login")),
  Unauthorized: lazy(() => import("@/pages/unauthorized")),
  Patients: lazy(() => import("@/pages/patients")),
  AddPatient: lazy(() => import("@/pages/agent/patient-add")),
  QuickAddPatient: lazy(() => import("@/pages/agent/patient-quick-add")),
  AgentCompleted: lazy(() => import("@/pages/agent/patient-completed")),
  AgentAllCompleted: lazy(() => import("@/pages/agent/patient-all-completed")),
  AgentPatientPrint: lazy(() => import("@/pages/agent/patient-print")),
  AgentDoctor: lazy(() => import("@/pages/agent/doctor-list")),
  AgentCheckedUserAdd: lazy(() => import("@/pages/agent/checked-user-add")),
  AgentCheckedUserList: lazy(() => import("@/pages/agent/checked-user-list")),
  AgentReferenceAdd: lazy(() => import("@/pages/agent/reference-add")),
  AgentReferenceList: lazy(() => import("@/pages/agent/reference-list")),
};
