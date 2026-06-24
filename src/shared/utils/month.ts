// "2026-06" -> "2026-6"  
export const normalizeMonth = (month: string) => {
  if (!month) return "";
  const [year, m] = month.split("-");
  return `${year}-${Number(m)}`;
};

// "2026-6" -> "2026-06"  
export const padMonth = (month: string) => {
  if (!month) return "";
  const [year, m] = month.split("-");
  return `${year}-${String(m).padStart(2, "0")}`;
};