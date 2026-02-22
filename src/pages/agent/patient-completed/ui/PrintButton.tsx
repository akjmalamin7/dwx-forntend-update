import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface PrintButtonProps {
  completedTime: string;
  recordKey: string;
  delaySeconds?: number;
}

const PrintButton = ({
  completedTime,
  recordKey,
  delaySeconds = 180,
}: PrintButtonProps) => {
  const isUnlocked = () =>
    Date.now() >= new Date(completedTime).getTime() + delaySeconds * 1000;

  const [canPrint, setCanPrint] = useState(isUnlocked);

  useEffect(() => {
    if (canPrint) return;

    const msLeft =
      new Date(completedTime).getTime() + delaySeconds * 1000 - Date.now();

    const timeout = setTimeout(() => setCanPrint(true), msLeft);
    return () => clearTimeout(timeout);
  }, [completedTime, delaySeconds, canPrint]);

  if (!canPrint) return null;

  return (
    <Link
      to={`/agent/patient-print/${recordKey}`}
      className="bg-yellow-500 ml-2 text-white px-2 py-1 rounded text-sm"
    >
      Print
    </Link>
  );
};

export default PrintButton;