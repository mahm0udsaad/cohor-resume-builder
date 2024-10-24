export function formatDate(dateInput, lng) {
  // If the input is already in the desired format, return it as is
  if (dateInput === "present" || dateInput === "Present") {
    if (lng === "ar") return "الحاضر";
    if (lng === "en") return "Present";
  }
  if (!dateInput) return "N/A";
  if (typeof dateInput === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    return dateInput;
  }

  // Try to parse the input as a date
  const date = new Date(dateInput);

  // Format the date as YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

export const parseDate = (dateString) => {
  if (!dateString || dateString === "Present") return null;
  if (
    typeof dateString === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(dateString)
  ) {
    return dateString;
  }
  const date = new Date(`${dateString}T00:00:00.000Z`);
  return date.toISOString();
};
