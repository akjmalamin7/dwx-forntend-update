import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";
import ScrollToTop from "./ScrollToTop";
import { useGetProfile } from "@/shared/hooks/use-get-profile/useGetProfile";
import { Loader } from "@/shared/ui";
import { AgentFormError } from "@/features/agent/agent-form-error"; 
import { WSProvider } from "@/shared/hooks/use-socket/WSContext";

const LayoutContent = () => {
  const { status, isProfileLoading } = useGetProfile();

  if (isProfileLoading) return <Loader />;

  if (status === "inactive") {
    return (
      <AgentFormError title="Access Denied! Please contact support." />
    );
  }

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

const Layout = () => {
  return (
    <WSProvider>
      <LayoutContent />
    </WSProvider>
  );
};

export default Layout;