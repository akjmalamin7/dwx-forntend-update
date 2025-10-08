import { LOGIN_SCHEMA } from "@/shared/redux/features/auth/auth.schema";
import type { LoginData } from "@/shared/redux/features/auth/auth.types";
import { useLoginMutation } from "@/shared/redux/features/auth/authApi";
import { Button, Input, Text } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import LOGO from "@/assets/logo.png";
import DEFAULT_BG from "@/assets/xray-bg.jpg";


const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    resolver: yupResolver(LOGIN_SCHEMA),
    defaultValues: { email: "", password: "" },
  });

  const [login, { isLoading }] = useLoginMutation();
  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      await login(data).unwrap();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      
       <div className="w-screen h-screen flex bg-gray-100">
      {/* Left Side: Login Section */}
      <div className="w-full md:w-1/4 bg-white flex flex-col justify-center px-8 py-10 shadow-xl relative z-10">
        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src={LOGO} 
            alt="Digital Web X-ray"
            className="mx-auto mb-2 w-100"
          /> 
        </div>

        {/* Login Form */}
        <div className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] rounded-xl p-6 mb-8">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off"  className="space-y-4">
          <div className="flex flex-col gap-4">
            <div>
              <Text element="label" className="block text-gray-700 mb-1">Username</Text>
              <Input
                size="sm"
                {...register("email")}
                type="text"
                placeholder="Username"
                error={{
                  status: !!errors.email,
                  message: errors.email?.message,
                }}
                readonly={isLoading}
              />
            </div>
            <div>
              <Text element="label" className="block text-gray-700 mb-1">Password</Text> 
              <Input
                size="sm"
                {...register("password")}
                type="password"
                placeholder="Your password"
                readonly={isLoading}
                error={{
                  status: !!errors.password,
                  message: errors.password?.message,
                }}
              />
            </div>
            <Button
              loading={isLoading}
              disabled={!isValid}
              color="dark"
              size="size-2"
              width="w-16"
              type="submit"
            >
              {isLoading ? "Submitting..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
       

        {/* Contact Info */}
        <div className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] rounded-xl p-6 text-sm text-gray-700">
          <Text element="h3" className="font-semibold mb-2">Contact Us</Text>
          <Text element="p" > If you need any help please call Digital Web X-ray help line or send
            us an email.</Text>
        
          <ul className="mt-2 space-y-1">
            <li>
              <Text element="span" className="font-medium">Hotline: </Text>
              
              <a
                href="tel:+8801759497773"
                className="text-blue-600 hover:underline"
              >
                +880 1759497773
              </a>
            </li>
            <li>
              <Text element="span" className="font-medium">Any IT Support: </Text> 
              <a
                href="tel:+8801867074078"
                className="text-blue-600 hover:underline"
              >
                +880 1867074078
              </a>
            </li>
            <li>
               <Text element="span" className="font-medium">Email: </Text>  
              <a
                href="mailto:digitalwebxray@gmail.com"
                className="text-blue-600 hover:underline"
              >
                digitalwebxray@gmail.com
              </a>
            </li>
          </ul>

          <div className="mt-3 space-x-3 text-blue-600">
            <a href="#" className="hover:underline">
              About us
            </a>
            <a href="#" className="hover:underline">
              Contact us
            </a>
            <a href="#" className="hover:underline">
              Privacy policy
            </a>
          </div>
        </div>
      </div>

      {/* Right Side: Background Image */}
      <div className="relative w-full md:w-3/4 bg-cover bg-left-top shadow-2xl hidden md:flex"

      style={{
          backgroundImage: `url(${DEFAULT_BG})`,
        }}> 

        {/* Marquee Section */}
        <div className="absolute bottom-0 w-full bg-blue-900 text-white py-2 overflow-hidden">
          <marquee
            behavior="scroll"
            direction="left"
            scrollamount="6"
            className="text-sm md:text-base font-medium"
          >
            Digital Web X-ray এর সকল User দের সুবিধার্থে জানানো যাচ্ছে যে এখন
            X-ray Report এর পাশাপাশি ECG Report দেওয়া হবে।
          </marquee>
        </div>
      </div>
    </div> 
    </div>
  );
};

export default Login;
