/* Static content for the About Us page — edit freely */

export const services = [
  {
    title: "X-ray Reporting",
    description:
      "Upload X-ray images from your diagnostic center and receive accurate, structured reports prepared by experienced radiologists.",
    icon: <path d="M4 4h16v16H4zM12 7v10M8 9h8M8 12h8M8 15h8" />,
  },
  {
    title: "ECG Reporting",
    description:
      "Newly added: send ECG tracings alongside your X-ray cases and get clear, timely ECG interpretations from qualified specialists.",
    icon: <path d="M3 12h4l2-5 4 10 2-5h6" />,
  },
  {
    title: "Online Report Delivery",
    description:
      "Track every case from your dashboard and download or print finished reports anytime — no couriers, no waiting.",
    icon: <path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v3h16v-3" />,
  },
];

export const steps = [
  { title: "Upload", text: "Submit the patient's X-ray or ECG with basic details." },
  { title: "Review", text: "A specialist doctor examines the case remotely." },
  { title: "Report", text: "The signed report appears in your dashboard." },
  { title: "Deliver", text: "Download, print and hand it to the patient." },
];

export const reasons = [
  "Experienced, qualified reporting doctors",
  "Fast turnaround, including urgent cases",
  "Secure handling of patient data",
  "Works from any computer with internet",
  "Simple, affordable per-report pricing",
  "Friendly support whenever you need it",
];

// TODO: replace with your real figures
export const stats = [
  { value: "500+", label: "Partner centers" },
  { value: "1M+", label: "Reports delivered" },
  { value: "24/7", label: "Service availability" },
  { value: "2", label: "Report types: X-ray & ECG" },
];

// Footer menu — update paths to match your routes
export const footerLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];
