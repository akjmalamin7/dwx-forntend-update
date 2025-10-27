import { Text } from "@/shared/ui";
import { Fragment } from "react/jsx-runtime";
interface IProps {
  children?: React.ReactNode;
}
const BillingInformation = ({ children }: IProps) => {
  return (
    <Fragment>
      <div className="mb-2">
        <Text
          element="h2"
          fontWeight="semiBold"
          textDecoration="underline"
          className="mb-2 mt-5"
        >
          Payment Information
        </Text>
        {children}
      </div>
      <div className="border-t pt-4 mb-6  p-2">
        <Text
          element="p"
          fontWeight="medium"
          size="sm"
          className="text-red-600"
        >
          {" "}
          প্রত্যেক মাসের ১০ তারিখের মধ্যে পূর্ববর্তী মাসের বিল পরিশোধের জন্য
          বিনীত অনুরোধ করা যাচ্ছে।
        </Text>
        <Text
          element="p"
          fontWeight="medium"
          size="sm"
          className="text-red-600"
        >
          বিঃদ্রঃ টাকা পাঠানোর পর ফোন করে আপনার বিল নিশ্চিত / বিল পরিশোধ (Paid)
          করুন।
        </Text>
      </div>
    </Fragment>
  );
};
export default BillingInformation;
