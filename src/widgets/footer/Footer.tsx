import { Text } from "@/shared/ui";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center p-4 border-t  border-indigo-200 mt-6">
      <Text element="p" className="text-sm text-gray-600  ">
        © {new Date().getFullYear()} Digital Web Xray. All Rights Reserved.
      </Text>
    </footer>
  );
};

export default Footer;
