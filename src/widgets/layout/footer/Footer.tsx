import type { RootState } from "@/shared/redux/stores/stores";
import { Text } from "@/shared/ui";
import LOGO from "@/assets/images/payment-method.jpg";
import { useSelector } from "react-redux"; 
 
const Footer = () => { 
    const auth = useSelector((state: RootState) => state.auth);
    const userRole = auth?.user?.role || null; 

  return (
    
      <footer className="bg-gray-100 p-4 border-t text-center border-indigo-200 mt-6 print:hidden ">
        <div className="mx-auto max-w-screen-lg">
        <Text
          element="p"
          className="text-xs sm:text-sm text-gray-600  mb-3"
        >
          © {new Date().getFullYear()} Digital Web Xray. All Rights Reserved.
        </Text>
        {userRole === "user" && (
          <div className="text-left mb-6">
            <img src={LOGO} alt="Digital Web X-ray" className=" h-10 mx-auto  mb-2 " />
          </div>
        )}
      </div>
      </footer>

  );
};

export default Footer;
