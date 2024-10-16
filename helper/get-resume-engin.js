import dynamic from "next/dynamic";
const CreativeResumeTemplate = dynamic(
  () => import("@/components/templates/creative"),
  { ssr: false },
);
const ElegantModernResumeTemplate = dynamic(
  () => import("@/components/templates/elegant-modern"),
  { ssr: false },
);

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
const FormalTemplate = dynamic(
  () => import("@/components/templates/professional"),
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
  formal: FormalTemplate,
  creative: CreativeResumeTemplate,
  elegantModern: ElegantModernResumeTemplate,
};
export const templates = [
  { name: "bold", Component: BoldTemplate },
  { name: "elegant", Component: ElegantTemplate },
  { category: "modern", name: "modern", Component: ModernTemplate },
  { category: "classic", name: "classic", Component: ClassicTemplate },
  { name: "minimal", Component: MinimalTemplate },
  { name: "formal", Component: FormalTemplate },
  { name: "creative", Component: CreativeResumeTemplate },
  { name: "elegantModern", Component: ElegantModernResumeTemplate },
];
export const getResumeTemplate = (templateName) => {
  return templateComponents[templateName];
};
