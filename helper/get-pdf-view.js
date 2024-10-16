import { templateViewComponents } from "@/components/templates-view-holder";

export const getResumeTemplateView = (templateName) => {
  const Template = templateViewComponents[templateName];
  if (!Template) {
    console.error(`Template ${templateName} not found`);
  }
  return Template;
};
