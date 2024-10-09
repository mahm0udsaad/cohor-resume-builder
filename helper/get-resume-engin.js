import dynamic from "next/dynamic";

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
const MinimalTemplate = dynamic(() => import("@/components/templates/minmal"), {
  ssr: false,
});
const ElegantTemplate = dynamic(
  () => import("@/components/templates/elegant"),
  {
    ssr: false,
  },
);
export const templateComponents = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  bold: BoldTemplate,
  minimal: MinimalTemplate,
  elegant: ElegantTemplate,
};
export const templates = [
  { category: "classic", name: "classic", Component: ClassicTemplate },
  { name: "elegant", Component: ElegantTemplate },
  { category: "modern", name: "modern", Component: ModernTemplate },
  { name: "bold", Component: BoldTemplate },
  { name: "minimal", Component: MinimalTemplate },
];
export const getResumeTemplate = (templateName) => {
  return templateComponents[templateName];
};
