import { useGetCheckedUserListQuery } from "@/shared/redux/features/agent/checked-user-list/checkedUserListApi";
import { Loader, Select } from "@/shared/ui";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useState } from "react";
const PrintPreparedBy = () => {
  const [preparedBy, setPreparedBy] = useState("");
  const { data: prepared, isLoading, isError } = useGetCheckedUserListQuery();
  const transForm = prepared
    ?.filter((pb) => pb.name && pb.details)
    ?.map((pb) => ({
      name: pb.name,
      value: pb.details,
    }));

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading prepared by list</div>;

  return (
    <div className="max-w-[250px] w-full">
      <p className="font-semibold">Prepared by:</p>

      <Select size="sm" options={transForm || []} onSelect={setPreparedBy} />

      <div className="checkuserDetails">
        {parse(DOMPurify.sanitize(String(preparedBy)))}
      </div>
    </div>
  );
};

export default PrintPreparedBy;
