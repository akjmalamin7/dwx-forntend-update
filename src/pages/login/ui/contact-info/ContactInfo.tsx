import { Text } from "@/shared/ui";
import { Link } from "react-router-dom";

const ContactInfo = () => {
  return (
    <div className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] rounded-xl p-6 text-sm text-gray-700">
      <Text element="h3" className="font-semibold mb-2">
        Contact Us
      </Text>
      <Text element="p">
        {" "}
        If you need any help please call Digital Web X-ray help line or send us
        an email.
      </Text>

      <ul className="mt-2 space-y-1">
        <li>
          <Text element="span" className="font-medium">
            Hotline:{" "}
          </Text>

          <Link
            to="tel:+8801759497773"
            className="text-blue-600 hover:underline"
          >
            +880 1759497773
          </Link>
        </li>
        <li>
          <Text element="span" className="font-medium">
            Any IT Support:{" "}
          </Text>
        </li>
        <li>
          <Text element="span" className="font-medium">
            Any IT Support:
          </Text>
          <Link
            to="tel:+8801867074078"
            className="text-blue-600 hover:underline"
          >
            +880 1867074078
          </Link>
        </li>
        <li>
          <Text element="span" className="font-medium">
            Email:{" "}
          </Text>
        </li>
        <li>
          <span className="font-medium">Email:</span>{" "}
          <Link
            to="mailto:digitalwebxray@gmail.com"
            className="text-blue-600 hover:underline"
          >
            digitalwebxray@gmail.com
          </Link>
        </li>
      </ul>

      <div className="mt-3 space-x-3 text-blue-600">
        <Link to="#" className="hover:underline">
          About us
        </Link>
        <Link to="#" className="hover:underline">
          Contact us
        </Link>
        <Link to="#" className="hover:underline">
          Privacy policy
        </Link>
      </div>
    </div>
  );
};

export default ContactInfo;
