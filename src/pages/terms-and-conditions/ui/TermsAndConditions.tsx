import DEFAULT_BG from "@/assets/images/xray-bg.jpg";
import { usePageTitle } from "@/shared/hooks";
import paymentLogo from "@/assets/images/payment-method.jpg";
/* ---------- Content ---------- */

const LAST_UPDATED = "06 October 2026";

const BUSINESS = {
  name: "Digital Web Expert",
  helpline: "+880 1759497773",
  email: "digitalwebxray@gmail.com",
  website: "www.digitalwebexpert.com",
  tradeLicense: "TRAD/DNCC/003423/2025",
  address: [
    "H #1104, R #1/A, Baitul Aman Housing Society,",
    "Adabor, Mohammadpur, Dhaka – 1207, Bangladesh",
  ],
};

// Footer menu — update paths to match your routes
const footerLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/about-us#contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Return & Refund Policy", href: "/refund-policy" },
];

const intro: string[] = [
  "Welcome to Digital Web Expert. By accessing or using our website and services, you agree to comply with and be bound by these Terms & Conditions."
];

/* Each item in `content` is either:
   - a string   → paragraph
   - a string[] → bullet list
   Sections with `businessCard: true` also show the contact details card. */
type Section = {
  id: string;
  title: string;
  content: (string | string[])[];
  businessCard?: boolean;
};

const sections: Section[] = [
  {
    "id": "about-our-services",
    "title": "About Our Services",
    "content": [
      "Digital Web Expert provides online diagnostic reporting and digital healthcare support services, including:",
      [
        "X-ray reporting",
        "ECG reporting",
        "CT scan reporting",
        "Diagnostic Management Software",
        "Rx Management Software"
      ],
      "Our services are intended for diagnostic centers, healthcare professionals, and authorized service providers."
    ]
  },
  {
    "id": "service-request",
    "title": "Service Request",
    "content": [
      "Customers may submit relevant diagnostic images and information through our designated communication or reporting channels.",
      "Customers are responsible for providing accurate and complete information and ensuring that submitted diagnostic images are clear and suitable for reporting."
    ]
  },
  {
    "id": "reporting-time",
    "title": "Reporting Time",
    "content": [
      "Our standard turnaround time is:",
      [
        "X-ray: Approximately 10–15 minutes",
        "ECG: Approximately 40 minutes to 1 hour",
        "CT Scan: Within 24 hours"
      ],
      "Turnaround times may vary depending on case complexity, image quality, technical issues, workload, or other circumstances beyond our reasonable control."
    ]
  },
  {
    "id": "payment-terms",
    "title": "Payment Terms",
    "content": [
      "Digital Web Expert generally follows a service-first, payment-after-service business model.",
      "Customers generally receive the agreed reporting service before making the applicable payment.",
      "For customers using a monthly billing arrangement, payment should be completed within the agreed payment period.",
      "If an account remains unpaid beyond the agreed payment period, Digital Web Expert reserves the right to temporarily suspend or discontinue the relevant services until outstanding dues are settled."
    ]
  },
  {
    "id": "cancellation",
    "title": "Cancellation and Service Suspension",
    "content": [
      "Customers may request cancellation or discontinuation of their service arrangement.",
      "For customers using a monthly billing arrangement, failure to settle outstanding payments within the agreed payment period may result in temporary suspension or discontinuation of the service.",
      "Cancellation of an already completed and delivered reporting service does not normally cancel the customer's payment obligation for that completed service.",
      "Digital Web Expert may also suspend or terminate access where there is misuse of the service, violation of these Terms & Conditions, fraudulent activity, or other legitimate reasons."
    ]
  },
  {
    "id": "refund-policy",
    "title": "Refund Policy",
    "content": [
      "As our standard business model involves providing the agreed service before receiving payment, advance payment is normally not required.",
      "Therefore, a conventional advance-payment refund generally does not arise.",
      "If any payment is made in advance and a refund is approved by Digital Web Expert, the applicable refund will generally be processed within 7–10 working days from the date of approval."
    ]
  },
  {
    "id": "customer-responsibilities",
    "title": "Customer Responsibilities",
    "content": [
      "Customers must:",
      [
        "Provide accurate information.",
        "Submit appropriate and readable diagnostic images.",
        "Use the service only for lawful purposes.",
        "Keep account and access credentials secure.",
        "Make payments according to the agreed billing terms.",
        "Not misuse, copy, resell, or interfere with our platform or services."
      ]
    ]
  },
  {
    "id": "confidentiality",
    "title": "Confidentiality and Data Protection",
    "content": [
      "Digital Web Expert respects customer confidentiality and takes reasonable measures to protect information submitted through our services.",
      "Customer information is not intentionally shared with unrelated third parties except where required by law, necessary to provide the requested service, or otherwise authorized by the customer."
    ]
  },
  {
    "id": "data-retention",
    "title": "Customer Data Retention",
    "content": [
      "Digital Web Expert generally retains customer-related service data, including uploaded diagnostic images and generated reports, for a maximum period of 2 (two) months.",
      "After this period, the data may be permanently deleted from our servers and systems.",
      "Once deleted, the data may not be recoverable or available for subsequent retrieval.",
      "Customers are therefore advised to download and securely retain any reports or other information they may require before the applicable retention period expires.",
      "Data may be retained for a longer period only where required by applicable law, legal proceedings, regulatory requirements, or other legitimate legal obligations."
    ]
  },
  {
    "id": "customer-support",
    "title": "Customer Support and Remote Assistance",
    "content": [
      "Digital Web Expert maintains a 24-hour customer helpline for customer inquiries, service-related communication, and urgent assistance.",
      "Our Remote Technical Support service is available daily from 9:00 AM to 9:00 PM.",
      "Remote technical assistance may be provided through authorized remote-support software or tools, subject to customer authorization and applicable security procedures.",
      "Customers should never share passwords, OTPs, payment PINs, or other sensitive authentication information with support personnel."
    ]
  },
  {
    "id": "intellectual-property",
    "title": "Intellectual Property",
    "content": [
      "All website content, software, designs, logos, graphics, text, and other materials belonging to Digital Web Expert are protected by applicable intellectual property laws.",
      "No material may be copied, reproduced, modified, distributed, or commercially exploited without prior written permission."
    ]
  },
  {
    "id": "service-availability",
    "title": "Service Availability",
    "content": [
      "We make reasonable efforts to maintain continuous service availability.",
      "Temporary interruptions may occur due to maintenance, technical problems, internet connectivity, server issues, or circumstances beyond our reasonable control."
    ]
  },
  {
    "id": "changes",
    "title": "Changes to These Terms",
    "content": [
      "Digital Web Expert reserves the right to update or modify these Terms & Conditions when necessary.",
      "Any updated version will be published on this page with the relevant update date."
    ]
  },
  {
    "id": "contact",
    "title": "Contact Information",
    "content": [],
    "businessCard": true
  }
];

/* ---------- Page ---------- */

const BusinessCard = () => (
  <div className="mt-4 rounded-xl bg-blue-50 p-5 text-sm">
    <p className="font-bold text-gray-900">{BUSINESS.name}</p>
    <dl className="mt-3 grid gap-4 sm:grid-cols-2">
      <div>
        <dt className="font-semibold text-gray-900">24/7 Helpline</dt>
        <dd className="mt-1">
          <a
            href={`tel:${BUSINESS.helpline.replace(/\s/g, "")}`}
            className="text-blue-800 hover:underline"
          >
            {BUSINESS.helpline}
          </a>
        </dd>
      </div>
      <div>
        <dt className="font-semibold text-gray-900">Email</dt>
        <dd className="mt-1">
          <a
            href={`mailto:${BUSINESS.email}`}
            className="text-blue-800 hover:underline"
          >
            {BUSINESS.email}
          </a>
        </dd>
      </div>
      <div>
        <dt className="font-semibold text-gray-900">Registered address</dt>
        <dd className="mt-1 text-gray-600">
          {BUSINESS.address.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </dd>
      </div>
      <div>
        <dt className="font-semibold text-gray-900">Trade License No.</dt>
        <dd className="mt-1 text-gray-600">{BUSINESS.tradeLicense}</dd>
        <dt className="mt-3 font-semibold text-gray-900">Website</dt>
        <dd className="mt-1">
          <a
            href={`https://${BUSINESS.website}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-800 hover:underline"
          >
            {BUSINESS.website}
          </a>
        </dd>
      </div>
    </dl>
  </div>
);

const TermsAndConditions = () => {
  usePageTitle("Terms & Conditions", {
    prefix: "Digital Web Expert - ",
    defaultTitle: "",
    restoreOnUnmount: true,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header banner */}
      <section
        className="relative bg-cover bg-left-top"
        style={{ backgroundImage: `url(${DEFAULT_BG})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/85 to-blue-900/60" />
        <div className="container relative mx-auto px-4 py-14 md:py-20">
          <p className="mb-3 inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-white">
            Legal
          </p>
          <h1 className="text-3xl font-bold text-white md:text-5xl">
            {"Terms & Conditions"}
          </h1>
          <p className="mt-4 max-w-2xl text-blue-100">{"The terms for using Digital Web Expert's website, reporting services and software."}</p>
          <p className="mt-4 text-sm text-blue-200">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Table of contents */}
          <aside>
            <nav
              aria-label="On this page"
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 lg:sticky lg:top-6"
            >
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-700">
                On this page
              </p>
              <ol className="space-y-2 text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex gap-2 text-gray-600 transition hover:text-blue-800"
                    >
                      <span className="w-5 shrink-0 text-gray-400">
                        {i + 1}.
                      </span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* Policy text */}
          <article className="space-y-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:p-10">
            {intro.length > 0 && (
              <div className="space-y-3 border-b border-gray-100 pb-8">
                {intro.map((p) => (
                  <p key={p} className="leading-relaxed text-gray-700">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-6">
                <h2 className="flex items-baseline gap-3 text-xl font-bold text-gray-900 md:text-2xl">
                  <span className="text-blue-700">{i + 1}.</span>
                  {s.title}
                </h2>

                {s.content.map((item, j) =>
                  Array.isArray(item) ? (
                    <ul key={j} className="mt-3 space-y-2">
                      {item.map((b) => (
                        <li key={b} className="flex gap-3 text-gray-600">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-700" />
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p key={j} className="mt-3 leading-relaxed text-gray-600">
                      {item}
                    </p>
                  )
                )}

                {s.businessCard && <BusinessCard />}
              </section>
            ))}
          </article>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-950 text-blue-100">
        <div className="container mx-auto flex flex-col items-center gap-4 px-4 py-6 lg:flex-row lg:justify-between">
          <p className="text-sm">
            © {new Date().getFullYear()} Digital Web Expert. All rights
            reserved.
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition hover:text-white hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
       
      </footer>
       <div className="text-left mb-6">
            <img src={paymentLogo} alt="Digital Web X-ray" className=" h-10 mx-auto  mb-2 " />
        </div>
    </div>
  );
};

export default TermsAndConditions;