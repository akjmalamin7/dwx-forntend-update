import { RoleEnum, type MenuType } from "@/shared/utils/types/types";
import { IoIosSend } from "react-icons/io";
import { MdFileUpload } from "react-icons/md";
export const MENU_DATA: MenuType[] = [
  {
    id: "user-1",
    role: [RoleEnum.user],
    title: "Send Report",
    icon: <IoIosSend />,
    path: "/agent/patient/add",
  },
  {
    id: "user-1",
    role: [RoleEnum.user],
    title: "Quick Send Report",
    icon: <IoIosSend />,
    path: "/agent/patient/quick-add",
  },
  {
    id: "user-1",
    role: [RoleEnum.user],
    title: "Waiting Report",
    icon: <IoIosSend />,
    path: "/",
  },
  {
    id: "user-2",
    role: [RoleEnum.user],
    title: "DCM File Uploader",
    icon: <MdFileUpload />,
    path: "/upload",
  },
  {
    id: "user-3",
    role: [RoleEnum.user],
    title: "Completed Report",
    icon: <IoIosSend />,
    path: "/agent/patient/completed",
  },
  {
    id: "user-4",
    role: [RoleEnum.user],
    title: "All Report",
    icon: <IoIosSend />,
    path: "",
    children: [
      {
        id: "user-all-report-1",
        title: "This Month Report",
        path: "/agent/patient/all-completed",
        role: [RoleEnum.user],
      },
      {
        id: "user-all-report-2",
        title: "Previous Month",
        path: "/agent/patient/previous-month",
        role: [RoleEnum.user],
      },
    ],
  },
  {
    id: "user-5",
    role: [RoleEnum.user],
    title: "Doctor List",
    icon: <IoIosSend />,
    path: "/agent/doctor",
  },
  {
    id: "user-6",
    role: [RoleEnum.user],
    title: "Reference List",
    icon: <IoIosSend />,
    path: "/agent/reference-list",
  },
  {
    id: "user-7",
    role: [RoleEnum.user],
    title: "Bill",
    icon: <IoIosSend />,
    path: "",
    children: [
      {
        id: "user-bill-report-1",
        title: "Manage Bill",
        path: "/agent/manage-bill",
        role: [RoleEnum.user],
      },
      {
        id: "user-bill-report-2",
        title: "Transaction History",
        path: "/agent/transaction-history",
        role: [RoleEnum.user],
      },
    ],
  },
  {
    id: "user-8",
    role: [RoleEnum.user],
    title: "Checked User",
    icon: <IoIosSend />,
    path: "/agent/checked-user-list",
  },
  {
    id: "user-9",
    role: [RoleEnum.user],
    title: "Software",
    icon: <IoIosSend />,
    path: "",
    children: [
      {
        id: "software-list-1",
        title: "Software list",
        path: "/agent/software",
        role: [RoleEnum.user],
      },
      {
        id: "software-list-2",
        title: "Add software",
        path: "/agent/software/add",
        role: [RoleEnum.user],
      },
    ],
  },
  {
    id: "doctor-1",
    role: [RoleEnum.ecg_dr, RoleEnum.xray_dr],
    title: "Pending List",
    icon: <IoIosSend />,
    path: "/doctor/patient",
  },
];
