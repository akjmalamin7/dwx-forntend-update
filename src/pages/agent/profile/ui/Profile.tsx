import { usePageTitle } from "@/shared/hooks";
import { Panel, PanelHeading } from "@/shared/ui";
import { useGetProfile } from "@/shared/hooks/use-get-profile/useGetProfile";
import { useState, useEffect } from "react";
import { useUpdateProfileMutation } from "@/shared/redux/features/profile/profileApi";
import toast, { Toaster } from "react-hot-toast";
const Profile = () => {
  const { profileData, isProfileLoading } = useGetProfile();

  // ✅ Hook called at top level, not inside a handler
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [marginTop, setMarginTop] = useState<string>("2");

  // ✅ Sync state once profileData loads (it's async, so useState initial value won't catch it)
  useEffect(() => {
    if (profileData?.top_margin !== undefined) {
      setMarginTop(String(profileData.top_margin));
    }
  }, [profileData?.top_margin]);

  usePageTitle("Profile", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  const handleSubmit = async () => {
    if (!profileData?._id) return;
    try {
      await updateProfile({
        id: profileData._id,
        data: { top_margin: marginTop },
      }).unwrap();
       
      toast.success("Profile updated successfully!", {
        duration: 2000,
        position: "top-right",
      });

    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update profile. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Diagnostic Name",    value: profileData?.name     ?? "—" },
    { label: "Diagnostic Address", value: profileData?.address  ?? "—" },
    { label: "Username",           value: profileData?.email    ?? "—" },
    { label: "Phone",              value: profileData?.mobile   ?? "—" },
    { label: "Single Image",       value: profileData?.single   ?? "—" },
    { label: "Double Image",       value: profileData?.double   ?? "—" },
    { label: "Multiple Image",     value: profileData?.multiple ?? "—" },
    { label: "Eqc Image",          value: profileData?.ecg      ?? "—" },
  ];

  return (
    <>
     <Toaster />
     
    <Panel
      header={
        <PanelHeading
          title="Profile Information"
          button=""
          path=" "
        />
      }
    >
      {isProfileLoading ? (
        <div className="p-4">Loading…</div>
      ) : (
        <div className="p-4">
          <table className="w-full border-collapse text-sm">
            <tbody>
              {rows.map(({ label, value }, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="py-2 pr-4 font-semibold text-gray-700 w-48 align-top">
                    {label}
                  </td>
                  <td className="py-2 text-gray-600">{value}</td>
                </tr>
              ))}

              {/* Editable row */}
              <tr className="border-b border-gray-200">
                <td className="py-2 pr-4 font-semibold text-gray-700 w-48 align-top">
                  Patient Print page margin top
                </td>
                <td className="py-2">
                  <input
                    type="number"
                    value={marginTop}
                    onChange={(e) => setMarginTop(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-32 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button
            onClick={handleSubmit}
            disabled={isUpdating}
            className="mt-4 bg-green-500 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded"
          >
            {isUpdating ? "Saving…" : "Submit"}
          </button>
        </div>
      )}
    </Panel>
    </>
  );
};

export default Profile;