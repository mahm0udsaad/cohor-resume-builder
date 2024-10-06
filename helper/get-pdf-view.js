import { templateViewComponents } from "@/components/templates-view-holder";

export const getResumeTemplateView = (templateName) => {
  const Template = templateViewComponents[templateName];
  if (!Template) {
    throw new Error(`Template ${templateName} not found`);
  }
  return Template;
};
