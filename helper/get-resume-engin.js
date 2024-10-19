import dynamic from "next/dynamic";
const CreativeResumeTemplate = dynamic(
  () => import("@/components/templates/creative"),
  { ssr: false },
);
const GlowResumeTemplate = dynamic(
  () => import("@/components/templates/glow"),
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
const CreativeTimelineResumeTemplate = dynamic(
  () => import("@/components/templates/creative-timeline"),
  {
    ssr: false,
  },
);
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
  glow: GlowResumeTemplate,
  creativeTimeLine: CreativeTimelineResumeTemplate,
};
export const templates = [
  { name: "elegantModern", Component: ElegantModernResumeTemplate },
  { name: "bold", Component: BoldTemplate },
  { name: "elegant", Component: ElegantTemplate },
  { name: "formal", Component: FormalTemplate },
  { category: "modern", name: "modern", Component: ModernTemplate },
  { name: "creative", Component: CreativeResumeTemplate },
  { name: "minimal", Component: MinimalTemplate },
  { category: "classic", name: "classic", Component: ClassicTemplate },
  { category: "glow", name: "glow", Component: GlowResumeTemplate },
  {
    category: "creativeTimeLine",
    name: "creativeTimeLine",
    Component: CreativeTimelineResumeTemplate,
  },
];
export const getResumeTemplate = (templateName) => {
  return templateComponents[templateName];
};
