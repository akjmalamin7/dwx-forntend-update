import DEFAULT_BG from "@/assets/images/xray-bg.jpg";
import { Text } from "@/shared/ui";
import { ContactInfo } from "./contact-info";
import { LoginForm } from "./login-form";
import { LogoSection } from "./logo-section";
import { usePageTitle } from "@/shared/hooks";

const Login = () => {

  usePageTitle("Login Digital Web Xray", {
        prefix: "DWX - ",
        defaultTitle: "DWX",
        restoreOnUnmount: true,
      });

  return (
    <div>
      <div className="w-screen h-screen flex bg-gray-100">
        {/* Left Side: Login Section */}
        <div className="w-full md:w-1/4 bg-white flex flex-col justify-center px-8 py-10 shadow-xl relative z-10">
          {/* Logo */}
          <LogoSection />
          {/* Login Form */}
          <LoginForm />

          {/* Contact Info */}
          <ContactInfo />
        </div>

        {/* Right Side: Background Image */}
        <div
          className="relative w-full md:w-3/4 bg-cover bg-left-top shadow-2xl hidden md:flex"
          style={{
            backgroundImage: `url(${DEFAULT_BG})`,
          }}
        >
          {/* Marquee Section */}
          <div className="absolute bottom-0 w-full bg-blue-900 text-white py-2 overflow-hidden">
            <Text element="h4">
              Digital Web X-ray এর সকল User দের সুবিধার্থে জানানো যাচ্ছে যে এখন
              X-ray Report এর পাশাপাশি ECG Report দেওয়া হবে।
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
