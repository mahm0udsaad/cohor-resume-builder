const { default: dynamic } = require("next/dynamic");

const ClassicTemplate = dynamic(
  () => import("@/components/templates/classic"),
  { ssr: false },
);
const ModernTemplate = dynamic(() => import("@/components/templates/modern"), {
  ssr: false,
});
const BoldTemplate = dynamic(() => import("@/components/templates/bold"), {
  ssr: false,
});

const templateComponents = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  bold: BoldTemplate,
};

export const getResumeTemplate = (templateName) => {
  return templateComponents[templateName];
};
