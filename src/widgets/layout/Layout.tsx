import { AgentFormError } from "@/features/agent/agent-form-error";
import { useGetProfile } from "@/shared/hooks/use-get-profile/useGetProfile";
import { WSProvider } from "@/shared/hooks/use-socket/WSContext";
import { Loader } from "@/shared/ui";
import { Outlet } from "react-router-dom";
import { Footer } from "./footer";
import { Header } from "./header";
import ScrollToTop from "./ScrollToTop";
import { useAuth } from "@/shared/hooks";

const LayoutContent = () => {
  const { status, isProfileLoading} = useGetProfile();
  const { user } = useAuth(); 

  if (isProfileLoading) return <Loader />;

  if (status === "inactive") {
      if (user?.role === "user") {
    return (
      <AgentFormError
        title={
          <>
            <p className="font-bold">Your Connection Is Temporarily Suspended.</p>
            <p>Please clear your dues to reactivate your ID. Thank you for your cooperation.</p>
          </>
        }
      />
    );
  }
  return <AgentFormError title="Access Denied! Please contact support." />;
    
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
