import { withSuspense } from "@/shared/ui";
import { Pages } from "@/widgets"; 

export const adminRoutes = [
  {
    path: "/admin/patient",
    element: withSuspense(<Pages.AdminPendingPatient />),
  },
  {
    path: "/doctor/patient-view/:patient_id",
    element: withSuspense(<Pages.DoctorViewPatient />),
  },
  {
    path: "/admin/completed-patients",
    element: withSuspense(<Pages.AdminCompletedPatients />),
  },
  {
    path: "/admin/today-completed-patient",
    element: withSuspense(<Pages.AdminTodayCompletedPatient />),
  },
  {
    path: "/admin/today-summary",
    element: withSuspense(<Pages.AdminTodaySummery />),
  },
  {
    path: "/admin/monthly-completed",
    element: withSuspense(<Pages.AdminMonthlyCompleted />),
  },
  {
    path: "/admin/deleted-patient",
    element: withSuspense(<Pages.AdminDeletedPatient />),
  },
  {
    path: "/admin/patient-filter",
    element: withSuspense(<Pages.AdminPatientFilter />),
  },

  {
    path: "/admin/doctor-list",
    element: withSuspense(<Pages.AdminDoctorList />),
  },

  {
    path: "/admin/patient-view/:patient_id",
    element: withSuspense(<Pages.AdminViewPatient />),
  },
  {
    path: "/admin/completed-patient-view/:patient_id",
    element: withSuspense(<Pages.AdminCompletedPatientView />),
  },
  {
    path: "/admin/patient-archive/:month",
    element: withSuspense(<Pages.AdminPatientArchive />),
  },
  {
    path: "/admin/patient-revision/:patient_id",
    element: withSuspense(<Pages.AdminPatientRevisoin />),
  },
  {
    path: "/admin/doctor-bill-month/:doctor_id",
    element: withSuspense(<Pages.AdminDoctorBill />),
  },
  {
    path: "/admin/select-doctor/:patient_id",
    element: withSuspense(<Pages.AdminSelectDoctor />),
  },
  {
    path: "/admin/doctor-print-bill/:bill_id",
    element: withSuspense(<Pages.AdminDoctorPrintBill />),
  },
  {
    path: "/admin/doctor-pay-bill/:bill_id",
    element: withSuspense(<Pages.AdminDoctorPayBill />),
  },

  {
    path: "/admin/doctor-update-bill/:doctorId/:month",
    element: withSuspense(<Pages.AdminDoctorUpdateBill />),
  },

  {
    path: "/admin/manage-customer-bill",
    element: withSuspense(<Pages.AdminManageCustomerBill />),
  },
  {
    path: "/admin/manage-customer-bill-month/:user_id",
    element: withSuspense(<Pages.AdminManageCustomerBillMonth />),
  },
  {
    path: "/admin/customer-print-bill/:bill_id",
    element: withSuspense(<Pages.AdminCustomerPrintBill />),
  },
  {
    path: "/admin/customer-print-bill-with-update/:bill_id",
    element: withSuspense(<Pages.AdminCustomerPrintBillWithUpdate />),
  },
  {
    path: "/admin/customer-pay-bill/:bill_id",
    element: withSuspense(<Pages.AdminCustomerPayBill />),
  },
  {
    path: "/admin/customer-update-bill",
    element: withSuspense(<Pages.AdminCustomerUpdateBill />),
  },
  {
    path: "/admin/customer-payment-request",
    element: withSuspense(<Pages.AdminCustomerBillMonth />),
  },
  {
    path: "/admin/customer-bill-request/:month",
    element: withSuspense(<Pages.AdminCustomerBillRequest />),
  },
  {
    path: "/admin/customer-bill-list/:month",
    element: withSuspense(<Pages.AdminCustomerBillList />),
  },
  {
    path: "/admin/customer-bill-paid/:month",
    element: withSuspense(<Pages.AdminCustomerBillPaid />),
  },
  {
    path: "/admin/customer-transection-history",
    element: withSuspense(<Pages.AdminCustomerTransactionHistory />),
  },
  {
    path: "/admin/customer-transection-history/:month",
    element: withSuspense(<Pages.AdminCustomerTransactionHistoryList />),
  },
  {
    path: "/admin/add-user",
    element: withSuspense(<Pages.AdminAddUser />),
  },
  {
    path: "/admin/user/:id",
    element: withSuspense(<Pages.AdminEditUser />),
  },
  {
    path: "/admin/user-list",
    element: withSuspense(<Pages.AdminCustomerList />),
  },
  {
    path: "/admin/admin-list",
    element: withSuspense(<Pages.AdminUserList />),
  },
  {
    path: "/admin/change-password/:id",
    element: withSuspense(<Pages.AdminChangePassword />),
  },

  {
    path: "/admin/xray-doctor-list",
    element: withSuspense(<Pages.AdminXrayDoctorList />),
  },
  {
    path: "/admin/ecg-doctor-list",
    element: withSuspense(<Pages.AdminEcgDoctorList />),
  },
  {
    path: "/admin/deleted-doctors",
    element: withSuspense(<Pages.AdminDeletedDoctorList />),
  },
  {
    path: "/admin/deleted-users",
    element: withSuspense(<Pages.AdminDeletedUserList />),
  },
  {
    path: "/admin/all-formates",
    element: withSuspense(<Pages.AdminAllFormates />),
  },
  {
    path: "/admin/format-add",
    element: withSuspense(<Pages.AdminFormatAdd />),
  },
  {
    path: "/admin/format/:id",
    element: withSuspense(<Pages.AdminFormatUpdate />),
  },

  {
    path: "/admin/all-xray-name",
    element: withSuspense(<Pages.AdminAllXrayName />),
  },
  {
    path: "/admin/xraytype-add",
    element: withSuspense(<Pages.AdminXraytypeAdd />),
  },

  {
    path: "/admin/all-history",
    element: withSuspense(<Pages.AdminAllHistory />),
  },
  {
    path: "/admin/history-add",
    element: withSuspense(<Pages.AdminHistoryAdd />),
  },

  {
    path: "/admin/payment-list",
    element: withSuspense(<Pages.AdminPaymentList />),
  },
  {
    path: "/admin/payment-add",
    element: withSuspense(<Pages.AdminPaymentAdd />),
  },
  {
    path: "/admin/software-add",
    element: withSuspense(<Pages.AdminSoftwareAdd />),
  },
  {
    path: "/admin/software-list",
    element: withSuspense(<Pages.AdminSoftwareList />),
  },
  {
    path: "/admin/bill-add",
    element: withSuspense(<Pages.BillAdd />),
  },
  {
    path: "/admin/settings",
    element: withSuspense(<Pages.AdminSetting />),
  },
  {
    path: "/admin/expence-list",
    element: withSuspense(<Pages.ExpenceList />),
  },
  {
    path: "/admin/expence-summery",
    element: withSuspense(<Pages.ExpenseSummary />),
  },
  {
    path: "/admin/expence-category",
    element: withSuspense(<Pages.ExpenseCategory />),
  },
  {
    path: "/admin/expence-add",
    element: withSuspense(<Pages.AddExpense />),
  },
  {
    path: "/admin/expence-list/:id",
    element: withSuspense(<Pages.UpdateExpense />),
  },
  {
    path: "/admin/loan",
    element: withSuspense(<Pages.LoanList />),
  },
   
  {
    path: "/admin/loan/add",
    element: withSuspense(<Pages.LoanAdd />),
  },
    {
    path: "/admin/loan/detail/:employeeId",
    element: withSuspense(<Pages.LoanDetail />),
  },
  {
    path: "admin/loan/repay/:loanId",
    element: withSuspense(<Pages.LoanRepay />),
  },

  {
    path: "admin/loan/repay/history/:loanId",
    element: withSuspense(<Pages.LoanRepaymentHistory />),
  },
  {
    path: "admin/income-list",
    element: withSuspense(<Pages.IncomeList />),
  },
  {
    path: "admin/income/add",
    element: withSuspense(<Pages.AddIncome />),
  },
  {
    path: "admin/income-list/:id",
    element: withSuspense(<Pages.UpdateIncome />),
  },
  {
    path: "admin/income/category",
    element: withSuspense(<Pages.IncomeCategoryList />),
  },
  {
    path: "admin/income/summary",
    element: withSuspense(<Pages.IncomeSummary />),
  },
  {
    path: "admin/dashboard/summary",
    element: withSuspense(<Pages.FinancialSummaryWidget />),
  },
  {
    path: "admin/cash-ledger/opening-balance",
    element: withSuspense(<Pages.OpeningBalance />),
  },
  
  {
    path: "admin/cash-ledger/manual-entry",
    element: withSuspense(<Pages.ManualEntry />),
  },
  {
    path: "admin/cash-ledger/balance",
    element: withSuspense(<Pages.CashBalanceDashboard />),
  },
  {
    path: "admin/cash-ledger/history",
    element: withSuspense(<Pages.CashLedgerHistory />),
  },
  
   
 
];
