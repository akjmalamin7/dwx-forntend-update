// AppSettings.tsx (page)
import { Panel, PanelHeading } from "@/shared/ui";
import { type SubmitHandler } from "react-hook-form"; 
import { usePageTitle } from "@/shared/hooks";
import { useGetSettingsQuery, useUpsertSettingsMutation } from "@/shared/redux/features/admin/settings/settingsApi";
 
import { SettingForm } from "@/entities/setting-form";
import type { SettingsFormValues } from "./setting";
import toast, { Toaster } from "react-hot-toast";

const AppSettings = () => {
  const [upsertSettings, { isLoading }] = useUpsertSettingsMutation();
  const { data: settingsData } = useGetSettingsQuery(undefined);

  const onSubmit: SubmitHandler<SettingsFormValues> = async (data) => {
    try {
      await upsertSettings(data).unwrap();

      // Success toast
      toast.success("Settings saved successfully!", {
        duration: 2000,
        position: "top-right",
      });
      
    } catch (err: unknown) {
      if (err && typeof err === "object" && "data" in err) {
        const e = err as { data?: { message?: string }; message?: string };
        console.error("Error saving settings:", e.data?.message || e.message);
      } else {
        console.error("Error saving settings:", String(err));
      }

      // Error toast
      toast.error("Failed to save settings. Please try again.", {
        duration: 2000,
        position: "top-right",
      });
    }
  };

  usePageTitle("Settings", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
    <>
    <Toaster />
    <Panel
      header={
        <PanelHeading
          title="Settings"
          button=""
          path=""
        />
      }
    >
      <SettingForm
        onSubmit={onSubmit}
        defaultValues={settingsData?.data}
        isLoading={isLoading}
        isEdit={true}
      />
    </Panel>
    </>
  );
};

export default AppSettings;