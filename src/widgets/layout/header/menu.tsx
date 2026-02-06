import { RoleEnum, type MenuType } from "@/shared/utils/types/types";
import { IoIosSend } from "react-icons/io";
import { MdFileUpload } from "react-icons/md";
export const MENU_DATA: MenuType[] = [
  {
    id: "user-1",
    role: [RoleEnum.user],
    title: "Send Report",
    icon: <IoIosSend />,
    path: "",
    children: [
      {
        id: "user-1-send-xray-report",
        title: "Send Xray Report",
        path: "/agent/patient/send-xray-report",
        role: [RoleEnum.user],
      },
      {
        id: "user-1-send-ecg-report",
        title: "Send ECG Report",
        path: "/agent/patient/send-ecg-report",
        role: [RoleEnum.user],
      },
    ],
  },
  {
    id: "user-2",
    role: [RoleEnum.user],
    title: "Quick Send Report",
    icon: <IoIosSend />,
    path: "/agent/patient/quick-add",
  },
  {
    id: "user-3",
    role: [RoleEnum.user],
    title: "Waiting Report",
    icon: <IoIosSend />,
    path: "/",
  },
  {
    id: "user-4",
    role: [RoleEnum.user],
    title: "DCM File Uploader",
    icon: <MdFileUpload />,
    path: "https://www.dwxviewer.site/upload",
  },
  {
    id: "user-5",
    role: [RoleEnum.user],
    title: "Completed Report",
    icon: <IoIosSend />,
    path: "/agent/patient/completed",
  },
  {
    id: "user-6",
    role: [RoleEnum.user],
    title: "All Report",
    icon: <IoIosSend />,
    path: "",
    children: [
      {
        id: "user-all-report-1",
        title: "This Month Report",
        path: "/agent/patient/this-month-reports",
        role: [RoleEnum.user],
      },
      {
        id: "user-all-report-2",
        title: "Previous Month",
        path: "/agent/patient/previous-month-reports",
        role: [RoleEnum.user],
      },
    ],
  },
  {
    id: "user-7",
    role: [RoleEnum.user],
    title: "Doctor List",
    icon: <IoIosSend />,
    path: "/agent/doctor",
  },
  {
    id: "user-8",
    role: [RoleEnum.user],
    title: "Reference List",
    icon: <IoIosSend />,
    path: "/agent/reference-list",
  },
  {
    id: "user-9",
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
    ],
  },
  {
    id: "user-0",
    role: [RoleEnum.user],
    title: "Checked User",
    icon: <IoIosSend />,
    path: "/agent/checked-user-list",
  },
   {
    id: "user-10",
    role: [RoleEnum.user ],
    title: "Software Download",
    icon: <IoIosSend />,
    path: "/agent/software-list",
  },

 
  {
    id: "doctor-1",
    role: [RoleEnum.ecg_dr, RoleEnum.xray_dr],
    title: "Pending List",
    icon: <IoIosSend />,
    path: "/doctor/patient",
  },
  {
    id: "doctor-2",
    role: [RoleEnum.ecg_dr, RoleEnum.xray_dr],
    title: "Completed Patient",
    icon: <IoIosSend />,
    path: "/doctor/patient-completed",
  },
  {
    id: "doctor-3",
    role: [RoleEnum.ecg_dr, RoleEnum.xray_dr],
    title: "All Completed Patient",
    icon: <IoIosSend />,
    path: "/doctor/patient-all-completed",
  },
  {
    id: "doctor-4",
    role: [RoleEnum.ecg_dr, RoleEnum.xray_dr],
    title: "Formats",
    icon: <IoIosSend />,
    path: "/doctor/format",
  },

    {
    id: "doctor-5",
    role: [RoleEnum.ecg_dr, RoleEnum.xray_dr],
    title: "Software Download",
    icon: <IoIosSend />,
    path: "/doctor/software-list",
  },

  {
    id: "admin-1",
    role: [RoleEnum.admin],
    title: "Pending Report",
    icon: <IoIosSend />,
    path: "/admin/patient",
  },
  {
    id: "admin-2",
    role: [RoleEnum.admin],
    title: "Completed Patients",
    icon: <IoIosSend />,
    path: "/admin/completed-patients",
  },

  {
    id: "admin-3",
    role: [RoleEnum.admin],
    title: "Manage Report",
    icon: <IoIosSend />,
    path: "",
    children: [
      {
        id: "today-completed-1",
        title: "Today Completed Report",
        path: "/admin/today-completed-patient",
        role: [RoleEnum.admin],
      },
      {
        id: "today-summary-2",
        title: "Today Summery",
        path: "/admin/today-summary",
        role: [RoleEnum.admin],
      },
      {
        id: "monthly-completed-3",
        title: "Monthly Completed",
        path: "/admin/monthly-completed",
        role: [RoleEnum.admin],
      },

      {
        id: "delete-report-5",
        title: "Deleted Patient",
        path: "/admin/deleted-patient",
        role: [RoleEnum.admin],
      },
    ],
  },
  {
    id: "admin-4",
    role: [RoleEnum.admin],
    title: "Manage Doctor Bill",
    icon: <IoIosSend />,
    path: "",
    children: [
      {
        id: "doctor-update-1",
        title: "Doctor List",
        path: "/admin/doctor-list",
        role: [RoleEnum.admin],
      },
    ],
  },
  {
    id: "admin-8",
    role: [RoleEnum.admin],
    title: "Manage Customer Bill",
    icon: <IoIosSend />,
    path: "",
    children: [
      {
        id: "customer-update-1",
        title: "Customer Update",
        path: "/admin/manage-customer-bill",
        role: [RoleEnum.admin],
      },
      {
        id: "transection-history-2",
        title: "Payment Request",
        path: "/admin/customer-payment-request",
        role: [RoleEnum.admin],
      },
      {
        id: "transection-history-3",
        title: "Transection History",
        path: "/admin/customer-transection-history",
        role: [RoleEnum.admin],
      },
      {
        id: "transection-history-4",
        title: "Bill Entry",
        path: "/admin/bill-add",
        role: [RoleEnum.admin],
      },
    ],
  },

  {
    id: "admin-5",
    role: [RoleEnum.admin],
    title: "User Management",
    icon: <IoIosSend />,
    path: "",
    children: [
      {
        id: "user-list-6",
        title: "Add User",
        path: "/admin/add-user",
        role: [RoleEnum.admin],
      },
      {
        id: "user-list-1",
        title: "User List",
        path: "/admin/user-list",
        role: [RoleEnum.admin],
      },

      {
        id: "xray-doctor-list-2",
        title: "Xray Doctor List",
        path: "/admin/xray-doctor-list",
        role: [RoleEnum.admin],
      },

      {
        id: "ecg-doctor-list-3",
        title: "Ecg Doctor List",
        path: "/admin/ecg-doctor-list",
        role: [RoleEnum.admin],
      },

      {
        id: "deleted-user-4",
        title: "Deleted Users",
        path: "/admin/deleted-users",
        role: [RoleEnum.admin],
      },
      {
        id: "deleted-doctor-5",
        title: "Deleted Doctors",
        path: "/admin/deleted-doctors",
        role: [RoleEnum.admin],
      },
    ],
  },

  {
    id: "admin-6",
    role: [RoleEnum.admin],
    title: "Others setting",
    icon: <IoIosSend />,
    path: "",
    children: [
      {
        id: "view-payment-1",
        title: "All Payment",
        path: "/admin/payment-list",
        role: [RoleEnum.admin],
      },

      {
        id: "all-formate-2",
        title: "All Formates",
        path: "/admin/all-formates",
        role: [RoleEnum.admin],
      },

      {
        id: "all-xray-name-3",
        title: "All x-ray name",
        path: "/admin/all-xray-name",
        role: [RoleEnum.admin],
      },

      {
        id: "all-history-4",
        title: "All History",
        path: "/admin/all-history",
        role: [RoleEnum.admin],
      },
    ],
  },
  {
    id: "admin-7",
    role: [RoleEnum.admin],
    title: "Settings",
    icon: <IoIosSend />,
    path: "",
    children: [
      {
        id: "message-settings-1",
        title: "Message Settings",
        path: "/admin/message-settings",
        role: [RoleEnum.admin],
      },

      {
        id: "all-software-2",
        title: "All Software",
        path: "/admin/software-list",
        role: [RoleEnum.admin],
      },
    ],
  },
  {
    id: "admin-9",
    role: [RoleEnum.admin],
    title: "Software",
    icon: <IoIosSend />,
    path: "/admin/software-list",
  },
];
