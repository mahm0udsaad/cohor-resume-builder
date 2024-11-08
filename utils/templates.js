import { templates } from "@/data/data";

export const getAvailableTemplates = (userPlan) => {
  switch (userPlan) {
    case "proPlus":
      return templates; // All templates
    case "pro":
      return templates.slice(0, 10); // First 10 templates
    case "free":
    default:
      return templates.slice(0, 2); // First 2 templates
  }
};
