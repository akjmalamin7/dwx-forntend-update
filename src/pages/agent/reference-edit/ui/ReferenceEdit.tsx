import { ReferenceForm } from "@/entities";
import { useEditReferenceMutation } from "@/shared/redux/features/agent/reference-add/addPatientApi";
import { useGetReferenceListQuery } from "@/shared/redux/features/agent/reference-list/referenceListApi";
import { Panel, PanelHeading } from "@/shared/ui";
import { useEffect, useMemo, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import type { ReferenceFormValues } from "../../reference-add/ui/referenceAdd.types";
import { usePageTitle } from "@/shared/hooks";

interface ReferenceListType {
  _id: string;
  name: string;
}

const ReferenceEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [references, setReferences] = useState<ReferenceListType[]>([]);
  const [defaultValues, setDefaultValues] = useState<
    Partial<ReferenceFormValues>
  >({});

  const { data: referenceList } = useGetReferenceListQuery();
  const [resetCount, setResetCount] = useState<number>(0);
  const [editReference, { isLoading }] = useEditReferenceMutation();

  const transformReference = useMemo(() => {
    if (referenceList) {
      return referenceList.map((item) => ({
        _id: item.id,
        name: item.name,
      }));
    }
    return [];
  }, [referenceList]);

  useEffect(() => {
    setReferences(transformReference);
  }, [transformReference]);

  useEffect(() => {
    if (id && references.length > 0) {
      const matchedReference = references.find((ref) => ref._id === id);

      if (matchedReference) {
        setDefaultValues({
          name: matchedReference.name,
        });
      }
    }
  }, [id, references]);

  const onSubmit: SubmitHandler<ReferenceFormValues> = async (data) => {
    try {
      if (!id) {
        console.error("No ID found for editing");
        return;
      }

      await editReference({ id, data }).unwrap();
      setResetCount((prev) => prev + 1);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "data" in err) {
        const e = err as { data?: { message?: string }; message?: string };
        console.error("Error editing reference:", e.data?.message || e.message);
      } else {
        console.error("Error editing reference:", String(err));
      }
    }
  };

  usePageTitle("Edit Reference", {
        prefix: "DWX - ",
        defaultTitle: "DWX",
        restoreOnUnmount: true,
      });

  return (
    <Panel
      header={
        <PanelHeading
          title="Edit Reference"
          button="Reference List"
          path="/agent/reference-list"
        />
      }
    >
      <ReferenceForm
        onSubmit={onSubmit}
        resetCount={resetCount}
        isLoading={isLoading}
        isEdit={true}
        defaultValues={defaultValues}
        key={resetCount}
      />
    </Panel>
  );
};

export default ReferenceEdit;
