import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="m-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
