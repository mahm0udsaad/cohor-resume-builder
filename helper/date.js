export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? "N/A"
    : date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
};
