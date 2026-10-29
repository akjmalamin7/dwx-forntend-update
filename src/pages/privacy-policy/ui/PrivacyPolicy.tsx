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
  "Digital Web Expert provides online X-ray, ECG, and CT scan reporting services. Our services are digital in nature and are provided to customers based on an agreed service and billing arrangement."
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
    "id": "no-advance-payment",
    "title": "No Advance Payment / No Standard Refund",
    "content": [
      "Digital Web Expert's standard business model is based on service first and payment afterward.",
      "Customers generally receive the agreed reporting service before making the applicable payment.",
      "Therefore, Digital Web Expert does not normally collect advance payments for its reporting services, and a standard advance-payment refund or return process does not apply to our regular services.",
      "As no physical products are sold through our website, physical product return or exchange is not applicable."
    ]
  },
  {
    "id": "payment-after-service",
    "title": "Payment After Service",
    "content": [
      "After the requested reporting service has been completed and delivered, the applicable service charge becomes payable according to the customer's agreed billing arrangement.",
      "Once a service has been successfully completed and delivered, the service charge is generally non-refundable, except where Digital Web Expert determines that an exceptional refund is appropriate."
    ]
  },
  {
    "id": "cancellation",
    "title": "Cancellation and Service Discontinuation",
    "content": [
      "Customers may discontinue their service arrangement by contacting Digital Web Expert.",
      "For customers using a monthly billing arrangement, failure to settle outstanding payments within the agreed payment period may result in temporary suspension or discontinuation of the service.",
      "Cancellation of an already completed and delivered reporting service does not normally cancel the customer's payment obligation for that completed service."
    ]
  },
  {
    "id": "exceptional-refund",
    "title": "Exceptional Refund",
    "content": [
      "Although refunds are not normally applicable under our standard service-first, payment-after-service model, Digital Web Expert may review a refund request in exceptional circumstances, such as:",
      [
        "Duplicate payment",
        "Payment made in error",
        "Payment collected for a service that Digital Web Expert was unable to provide",
        "Any other circumstance specifically approved by Digital Web Expert"
      ],
      "If a refund is approved, it will generally be processed within 7–10 working days from the date of refund approval.",
      "The time required for the refunded amount to appear in the customer's account may additionally depend on the relevant bank, payment gateway, card issuer, or financial institution."
    ]
  },
  {
    "id": "contact",
    "title": "How to Contact Us",
    "content": [
      "For any payment-related question or refund request, customers may contact us with the relevant transaction or billing information."
    ],
    "businessCard": true
  },
  {
    "id": "policy-updates",
    "title": "Policy Updates",
    "content": [
      "Digital Web Expert reserves the right to update this Return & Refund Policy when necessary.",
      "Any changes will be published on this page with the applicable revision date."
    ]
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

const RefundPolicy = () => {
  usePageTitle("Return & Refund Policy", {
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
            {"Return & Refund Policy"}
          </h1>
          <p className="mt-4 max-w-2xl text-blue-100">{"How payments, cancellations and refunds work for our digital reporting services."}</p>
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

export default RefundPolicy;