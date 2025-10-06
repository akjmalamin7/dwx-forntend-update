import * as Yup from "yup";

export const REGISTRATION_SCHEMA = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  mobile: Yup.string().required("Mobile number is required"),
  photo: Yup.string().optional(), // photo ফিল্ডটি optional বা nullable
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const LOGIN_SCHEMA = Yup.object().shape({
  email: Yup.string().required("Email/Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 8 characters long"),
});
