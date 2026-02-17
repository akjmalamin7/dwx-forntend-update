import { useGetCheckedUserListQuery } from "@/shared/redux/features/agent/checked-user-list/checkedUserListApi";
import { Loader, Select } from "@/shared/ui";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useState, useEffect } from "react";

const PrintPreparedBy = () => {
  const [preparedBy, setPreparedBy] = useState("");
  const { data: prepared, isLoading, isError } = useGetCheckedUserListQuery();
  
  const transForm = prepared
    ?.filter((pb) => pb.name && pb.details)
    ?.map((pb) => ({
      name: pb.name,
      value: pb.details,
    }));

  // Set first item as default when data loads
  useEffect(() => {
    if (transForm && transForm.length > 0 && !preparedBy) {
      setPreparedBy(transForm[0].value);
    }
  }, [transForm, preparedBy]);

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading prepared by list</div>;

  return (
    <>
      <style>
        {`
          @media print {
          .no-print {
            display: none !important;
          }
        `}
      </style>

      <div className="max-w-[250px] w-full" contentEditable>
        <p className="font-semibold" >Prepared by:</p>

        <div className="no-print">
          <Select
            size="sm"
            options={transForm || []}
            onSelect={setPreparedBy}
            value={preparedBy}
            className="no-print"
          />
        </div>

        <div className="checkuserDetails text-xl">
          {parse(DOMPurify.sanitize(String(preparedBy)))}
        </div>
      </div>
    </>
  );
};

export default PrintPreparedBy;