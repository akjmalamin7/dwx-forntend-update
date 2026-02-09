import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";
import ScrollToTop from "./ScrollToTop";
 
const Layout = () => {
  return (
    <div>
      <Header />
       <ScrollToTop />
      <div className="m-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
