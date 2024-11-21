export const formatGPA = (gpaType, numericGpa, t, isArabic) => {
  switch (gpaType) {
    case "outOf4":
      return `${t.gpa}: ${numericGpa}/4`;
    case "outOf5":
      return `${t.gpa}: ${numericGpa}/5`;
    case "percentage":
      return `${t.gpa}: ${isArabic ? `%${numericGpa}` : `${numericGpa}%`}`;
    default:
      return "";
  }
};
