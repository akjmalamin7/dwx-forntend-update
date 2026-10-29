import DEFAULT_BG from "@/assets/images/xray-bg.jpg";
import { Text } from "@/shared/ui";
import { usePageTitle } from "@/shared/hooks";
import { LogoSection } from "./logo-section";
import paymentLogo from "@/assets/images/payment-method.jpg";

/* ---------- Content ---------- */

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

const quickFacts = [
  { value: "X-ray · ECG · CT", label: "Online reporting" },
  { value: "24/7", label: "Customer helpline" },
  { value: "9 AM – 9 PM", label: "Remote technical support" },
  { value: "2", label: "Healthcare software products" },
];

const services = [
  {
    title: "Online X-ray Reporting",
    text: "Reviewed and reported by experienced reporting doctors.",
    icon: <path d="M4 4h16v16H4zM12 7v10M8 9h8M8 12h8M8 15h8" />,
  },
  {
    title: "Online ECG Reporting",
    text: "Interpreted by qualified doctors with relevant clinical experience.",
    icon: <path d="M3 12h4l2-5 4 10 2-5h6" />,
  },
  {
    title: "Online CT Scan Reporting",
    text: "Reviewed and reported by experienced doctors with expertise in CT imaging.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    title: "Diagnostic Management Software",
    text: "A centralized platform to run your diagnostic center's daily operations.",
    icon: <path d="M3 5h18v11H3zM8 20h8M12 16v4" />,
  },
  {
    title: "Rx Management Software",
    text: "Fast, clear computer-based digital prescriptions for doctors.",
    icon: <path d="M6 3h9l3 3v15H6zM9 9h6M9 13h6M9 17h3" />,
  },
];

const rxBenefits = [
  "Faster computer-based prescription writing",
  "Easy selection and entry of medicine names",
  "Clear and readable prescription information",
  "Reduced difficulty in reading handwritten medicine names",
  "More organized prescription formatting",
  "Helps doctors save time during patient consultations",
  "Supports a more efficient digital prescription workflow",
];

const qualityPoints = [
  "Experienced and qualified reporting doctors",
  "Professional digital reporting workflow",
  "Quality-focused report preparation",
  "Secure handling of diagnostic information",
  "Timely report delivery",
  "Continuous improvement of our digital healthcare services",
];

const turnaround = [
  { service: "X-ray", time: "10–15 min", note: "Approximately" },
  { service: "ECG", time: "40 min – 1 hr", note: "Approximately" },
  { service: "CT Scan", time: "24 hours", note: "Within" },
];

const management = [
  { name: "Sadman Sakib", role: "Co-founder & CEO" },
  { name: "Mahfurjar Rahman", role: "Director & Software Engineer" },
  { name: "Sakhawat Hossen", role: "Co-founder & Technical Director" },
];

/* ---------- Small helpers ---------- */

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const Check = ({ className = "text-blue-700" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={`mt-0.5 h-5 w-5 shrink-0 ${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  inverted = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  inverted?: boolean;
}) => (
  <div className="mx-auto mb-10 max-w-2xl text-center">
    <p
      className={`text-sm font-semibold uppercase tracking-wider ${
        inverted ? "text-blue-200" : "text-blue-700"
      }`}
    >
      {eyebrow}
    </p>
    <h2
      className={`mt-2 text-3xl font-bold ${
        inverted ? "text-white" : "text-gray-900"
      }`}
    >
      {title}
    </h2>
    {subtitle && (
      <p className={`mt-3 ${inverted ? "text-blue-100" : "text-gray-600"}`}>
        {subtitle}
      </p>
    )}
  </div>
);

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

/* ---------- Page ---------- */

const AboutUs = () => {
  usePageTitle("About Us", {
    prefix: "Digital Web Expert - ",
    defaultTitle: "",
    restoreOnUnmount: true,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section
        className="relative bg-cover bg-left-top"
        style={{ backgroundImage: `url(${DEFAULT_BG})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/75 to-blue-900/30" />
        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <div className="max-w-2xl text-white">
            <p className="mb-3 inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium">
              About Digital Web Expert
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Fast, reliable online medical reporting.
            </h1>
            <p className="mt-5 text-lg text-blue-100">
              Professional online X-ray, ECG and CT scan reporting, plus
              software that helps diagnostic centers and doctors work more
              efficiently.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-lg bg-white px-5 py-2.5 font-semibold text-blue-900 transition hover:bg-blue-50"
              >
                Contact us
              </a>
              <a
                href="#services"
                className="rounded-lg border border-white/40 px-5 py-2.5 font-semibold text-white transition hover:bg-white/10"
              >
                Our services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Notice bar */}
      <div className="overflow-hidden bg-blue-900 py-2 text-white">
        <style>{`@keyframes aboutMarquee { from { transform: translateX(100%); } to { transform: translateX(-100%); } }`}</style>
        <div className="animate-[aboutMarquee_25s_linear_infinite] whitespace-nowrap">
          <Text element="h4">
            Digital Web X-ray এর সকল User দের সুবিধার্থে জানানো যাচ্ছে যে এখন
            X-ray Report এর পাশাপাশি ECG Report দেওয়া হবে।
          </Text>
        </div>
      </div>

      {/* Who we are */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              Who we are
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Digital Web Expert
            </h2>
            <p className="mt-4 text-gray-600">
              Digital Web Expert is a technology-driven online medical
              reporting service provider dedicated to delivering fast,
              reliable, and convenient digital reporting solutions for
              healthcare and diagnostic service providers.
            </p>
            <p className="mt-3 text-gray-600">
              We provide professional online X-ray, ECG, and CT scan reporting
              services, helping diagnostic centers and healthcare professionals
              receive reports remotely through our digital platform.
            </p>
            <p className="mt-3 text-gray-600">
              Our goal is to make diagnostic reporting faster, more accessible,
              and more efficient by connecting healthcare service providers
              with experienced and qualified reporting professionals through a
              secure digital workflow.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {quickFacts.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-100"
              >
                <p className="text-2xl font-bold text-blue-800">{f.value}</p>
                <p className="mt-1 text-sm text-gray-600">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-6 bg-white py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="What we offer"
            title="Our services"
            subtitle="Digital Web Expert currently provides online reporting and healthcare software."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-800">
                  <Icon>{s.icon}</Icon>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Software */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeading eyebrow="Software" title="Healthcare software" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
            <h3 className="text-xl font-bold text-gray-900">
              Diagnostic Management Software
            </h3>
            <p className="mt-3 text-gray-600">
              Our Diagnostic Management Software is designed to help diagnostic
              centers manage their daily operations through a centralized
              digital platform.
            </p>
            <p className="mt-3 text-gray-600">
              The software can help streamline patient management, diagnostic
              service management, report processing, billing, and other
              administrative workflows, helping diagnostic centers reduce
              manual work and operate more efficiently.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
            <h3 className="text-xl font-bold text-gray-900">
              Rx Management Software
            </h3>
            <p className="mt-3 text-gray-600">
              Our Rx Management Software is designed specifically to help
              doctors create computer-based digital prescriptions more quickly
              and efficiently.
            </p>
            <p className="mt-3 text-gray-600">
              The software provides a structured prescription-writing
              environment where commonly used medicine names and prescription
              information can be entered easily. This helps doctors save time
              during consultations and makes prescription information clearer
              and easier to read compared with handwritten prescriptions.
            </p>

            <h4 className="mt-6 font-semibold text-gray-900">Key benefits</h4>
            <ul className="mt-3 space-y-2">
              {rxBenefits.map((b) => (
                <li key={b} className="flex gap-3 text-sm text-gray-600">
                  <Check />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
              The software is intended as a prescription-writing and management
              tool for healthcare professionals. Doctors remain responsible for
              reviewing and approving all prescription information before
              providing it to patients.
            </p>
          </div>
        </div>
      </section>

      {/* Reporting doctors */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <SectionHeading eyebrow="Our team" title="Our reporting doctors" />
          <div className="mx-auto max-w-3xl space-y-3 text-center text-gray-600">
            <p>
              Digital Web Expert works with a team of experienced and qualified
              doctors and reporting professionals who provide diagnostic
              reporting support for X-ray, ECG, and CT scan studies.
            </p>
            <p>
              Our reporting network includes doctors with relevant experience
              in diagnostic interpretation and reporting. We focus on
              maintaining quality, accuracy, consistency, and timely report
              delivery for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="bg-blue-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            eyebrow="Our commitment"
            title="Commitment to quality"
            subtitle="At Digital Web Expert, we continuously work to maintain a high standard of reporting quality through:"
            inverted
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {qualityPoints.map((q) => (
              <li
                key={q}
                className="flex items-start gap-3 rounded-xl bg-white/10 p-4"
              >
                <Check className="text-green-300" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-2xl text-center text-blue-100">
            Our goal is to support diagnostic centers and healthcare
            professionals with reliable, efficient, and quality-focused online
            reporting services.
          </p>
        </div>
      </section>

      {/* Delivery time + support */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              Turnaround
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Service delivery time
            </h2>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {turnaround.map((t) => (
                <div
                  key={t.service}
                  className="rounded-xl bg-blue-50 p-4 text-center"
                >
                  <p className="text-sm font-semibold text-gray-900">
                    {t.service}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{t.note}</p>
                  <p className="text-lg font-bold text-blue-800">{t.time}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-600">
              Actual reporting time may vary depending on case complexity,
              image quality, workload, technical issues, and other operational
              circumstances.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              Support
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              Customer support
            </h2>
            <p className="mt-3 text-gray-600">
              Digital Web Expert provides a 24-hour customer helpline, so you
              can contact us at any time about our services, reporting,
              account-related matters, or urgent assistance.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-sm font-semibold text-gray-900">
                  24-Hour Helpline
                </p>
                <p className="text-lg font-bold text-blue-800">
                  Available 24/7
                </p>
              </div>
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-sm font-semibold text-gray-900">
                  Remote Technical Support
                </p>
                <p className="text-lg font-bold text-blue-800">
                  9:00 AM – 9:00 PM
                </p>
                <p className="text-xs text-gray-500">Daily</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-gray-600">
              Remote technical assistance may be provided through authorized
              remote-support tools when required and with appropriate customer
              authorization.
            </p>
          </div>
        </div>
      </section>

      {/* Management */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <SectionHeading eyebrow="Leadership" title="Our management" />
          <div className="grid gap-6 sm:grid-cols-3">
            {management.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-800 text-xl font-bold text-white">
                  {initials(m.name)}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {m.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us + Business information */}
      <section id="contact" className="container mx-auto scroll-mt-6 px-4 py-16">
        <div className="grid gap-8 rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-100 md:grid-cols-2 md:p-12">
          <div>
            <LogoSection />
            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Contact us
            </h2>
            <p className="mt-2 text-gray-600">
              Questions about reporting, software or your account? Our helpline
              is open 24/7.
            </p>

            <dl className="mt-6 space-y-4">
              <div>
                <dt className="text-sm font-semibold text-gray-900">
                  24/7 Helpline
                </dt>
                <dd>
                  <a
                    href={`tel:${BUSINESS.helpline.replace(/\s/g, "")}`}
                    className="text-lg font-bold text-blue-800 hover:underline"
                  >
                    {BUSINESS.helpline}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-900">Email</dt>
                <dd>
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="text-blue-800 hover:underline"
                  >
                    {BUSINESS.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-900">Website</dt>
                <dd>
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

          <div className="rounded-2xl bg-blue-50 p-6">
            <h3 className="text-lg font-bold text-gray-900">
              Business information
            </h3>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-gray-900">Business name</dt>
                <dd className="mt-1 text-gray-600">{BUSINESS.name}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900">
                  Trade License No.
                </dt>
                <dd className="mt-1 text-gray-600">{BUSINESS.tradeLicense}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900">
                  Registered address
                </dt>
                <dd className="mt-1 text-gray-600">
                  {BUSINESS.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900">Support hours</dt>
                <dd className="mt-1 text-gray-600">
                  Helpline: 24/7
                  <br />
                  Remote technical support: 9:00 AM – 9:00 PM (Daily)
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

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

export default AboutUs;