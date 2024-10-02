export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const is_valid = !isNaN(date.getTime());
  const is_valid_format =
    /^\d{1,2}\/\d{1,2}\/\d{2}$|^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/.test(
      dateString,
    );
  return is_valid && is_valid_format
    ? date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";
};
