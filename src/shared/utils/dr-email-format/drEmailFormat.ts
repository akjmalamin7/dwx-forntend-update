// drEmailFormat.ts

interface DoctorEmail {
  email?: string | null;
}

interface DoctorWrapper {
  doctor?: DoctorEmail | null;
}

type EmailSource = DoctorEmail | DoctorWrapper | string | null | undefined;

export const formatEmails = (list?: EmailSource[] | null): string => {
  if (!Array.isArray(list) || list.length === 0) return "";

  const emails: string[] = [];

  for (const item of list) {
    if (!item) continue;

    // case: "email@example.com"
    if (typeof item === "string") {
      emails.push(item);
      continue;
    }

    // case: { email: "email@example.com" }
    if ("email" in item && typeof item.email === "string") {
      emails.push(item.email);
      continue;
    }

    // case: { doctor: { email: "email@example.com" } }
    if (
      "doctor" in item &&
      item.doctor &&
      typeof item.doctor.email === "string"
    ) {
      emails.push(item.doctor.email);
    }
  }

  if (emails.length === 0) return "";

  // 🔥 IMPORTANT CHANGE HERE
  if (emails.length > 2) {
    return "Multiple";
  }

   return emails.join(",");
};
