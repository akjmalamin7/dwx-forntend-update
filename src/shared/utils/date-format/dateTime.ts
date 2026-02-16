export const formatDate = (iso: string | number, isTime?: boolean) => {
  const d = new Date(iso);

  const hours = d.getHours() % 12 || 12;
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = d.getHours() >= 12 ? "PM" : "AM";

  const day = d.getDate().toString().padStart(2, "0");
  const monthShort = d.toLocaleDateString("en-GB", { month: "short" });
  const year = d.getFullYear();
  
  const time = `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  
  return isTime 
    ? `${day}-${monthShort}-${year}, ${time}` 
    : `${day}-${monthShort}-${year}`;
};