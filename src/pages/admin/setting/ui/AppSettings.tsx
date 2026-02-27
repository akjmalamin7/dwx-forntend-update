// AppSettings.tsx (page)
import { Panel, PanelHeading } from "@/shared/ui";
import { type SubmitHandler } from "react-hook-form"; 
import { usePageTitle } from "@/shared/hooks";
import { useGetSettingsQuery, useUpsertSettingsMutation } from "@/shared/redux/features/admin/settings/settingsApi";
 
import { SettingForm } from "@/entities/setting-form";
import type { SettingsFormValues } from "./setting";
 

const AppSettings = () => {
  const [upsertSettings, { isLoading }] = useUpsertSettingsMutation();
  const { data: settingsData } = useGetSettingsQuery(undefined);

  const onSubmit: SubmitHandler<SettingsFormValues> = async (data) => {
    try {
      await upsertSettings(data).unwrap();
    } catch (err: unknown) {
      if (err && typeof err === "object" && "data" in err) {
        const e = err as { data?: { message?: string }; message?: string };
        console.error("Error saving settings:", e.data?.message || e.message);
      } else {
        console.error("Error saving settings:", String(err));
      }
    }
  };

  usePageTitle("Settings", {
    prefix: "DWX - ",
    defaultTitle: "DWX",
    restoreOnUnmount: true,
  });

  return (
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
  );
};

export default AppSettings;