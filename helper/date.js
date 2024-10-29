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
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Handle invalid date formats
      return null;
    }
    return date.toISOString();
  } catch (error) {
    console.error("Error parsing date:", dateString, error);
    return null;
  }
};
