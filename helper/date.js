export function formatDate(dateInput) {
  // If the input is already in the desired format, return it as is
  if (!dateInput) return "N/A";
  if (dateInput === "Present") return "Present";
  if (typeof dateInput === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    return dateInput;
  }

  // Try to parse the input as a date
  const date = new Date(dateInput);

  // Format the date as YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const parseDate = (dateString) => {
  const date = new Date(`${dateString}T00:00:00.000Z`);
  return date.toISOString();
};
