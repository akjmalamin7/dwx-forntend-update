import { RoleEnum, type MenuType } from "@/shared/utils/types/types";
import { IoIosSend } from "react-icons/io";
import { MdFileUpload } from "react-icons/md";
export const MENU_DATA: MenuType[] = [
  {
    id: "user-1",
    role: [RoleEnum.user],
    title: "Send Report",
    icon: <IoIosSend />,
    path: "/agent/patient/add"
  },
  {
    id: "user-1",
    role: [RoleEnum.user],
    title: "Quick Send Report",
    icon: <IoIosSend />,
    path: "/agent/patient/quick-add"
  },
  {
    id: "user-1",
    role: [RoleEnum.user],
    title: "Waiting Report",
    icon: <IoIosSend />,
    path: "/"
  },
  {
    id: "user-1",
    role: [RoleEnum.user],
    title: "DCM File Uploader",
    icon: <MdFileUpload />,
    path: "/upload"
  },
  {
    id: "user-1",
    role: [RoleEnum.user],
    title: "Completed Report",
    icon: <IoIosSend />,
    path: "/agent/patient/completed",
  },
  {
    id: "user-1",
    role: [RoleEnum.user],
    title: "All Report",
    icon: <IoIosSend />,
    path: "",
    children: [
      {
        id: "user-all-report-1",
        title: "This Month Report",
        path: "/agent/patient/all-completed"
      },
      {
        id: "user-all-report-2",
        title: "Previous Month",
        path: "/agent/patient/previous-month"
      },
    ]
  },
  {
    id: "user-1",
    role: [RoleEnum.user],
    title: "Doctor List",
    icon: <IoIosSend />,
    path: "/agent/doctor"
  },
  {
    id: "user-1",
    role: [RoleEnum.user],
    title: "Reference List",
    icon: <IoIosSend />,
    path: "/agent/reference-list"
  },
  {
    id: "user-1",
    role: [RoleEnum.user],
    title: "Bill",
    icon: <IoIosSend />,
    path: "",
    children: [
      {
        id: "user-all-report-1",
        title: "Manage Bill",
        path: "/agent/manage-bill"
      },
      {
        id: "user-all-report-2",
        title: "Transaction History",
        path: "/agent/transaction-history"
      },
    ]
  },
  {
    id: "user-1",
    role: [RoleEnum.user],
    title: "Checked User",
    icon: <IoIosSend />,
    path: "/agent/checked-user-list"
  },
  {
    id: "user-1",
    role: [RoleEnum.user],
    title: "Software",
    icon: <IoIosSend />,
    path: "/software"
  },
]