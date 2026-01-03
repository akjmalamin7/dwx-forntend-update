export interface CUSTOMER_MODEL {
  _id: string;
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: "user" | string;
  address: string;
  image: string[] | null;
}
