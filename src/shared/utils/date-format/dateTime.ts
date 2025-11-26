export const formatDate = (iso: string | number, isTime?: boolean) => {
  const d = new Date(iso);

  const hours = d.getHours() % 12 || 12;
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = d.getHours() >= 12 ? "PM" : "AM";

  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();
  const time = `${hours}:${minutes} ${ampm}, `;
  return ` ${isTime ? time : ""} ${day}/${month}/${year}`;
};
