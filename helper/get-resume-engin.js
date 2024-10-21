import dynamic from "next/dynamic";

const ModernFormalResumeTemplate = dynamic(
  () => import("@/components/templates/modern-formal"),
  { ssr: false },
);
const ProfessionalResume = dynamic(
  () => import("@/components/templates/formal"),
  { ssr: false },
);
const BlueHorizon = dynamic(
  () => import("@/components/templates/blueHorizon"),
  { ssr: false },
);
const ProfessionalSidebar = dynamic(
  () => import("@/components/templates/professional-sidebar"),
  { ssr: false },
);
const GridLayoutResume = dynamic(
  () => import("@/components/templates/gridLayout"),
  { ssr: false },
);
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
  professional: ProfessionalResume,
  gridLayout: GridLayoutResume,
  ProfessionalSidebar: ProfessionalSidebar,
  BlueHorizon: BlueHorizon,
  modernFormal: ModernFormalResumeTemplate,
};
export const templates = [
  { name: "modernFormal", Component: ModernFormalResumeTemplate },
  { name: "bold", Component: BoldTemplate },
  { name: "elegant", Component: ElegantTemplate },
  { category: "modern", name: "modern", Component: ModernTemplate },
  { category: "classic", name: "classic", Component: ClassicTemplate },
  { name: "elegantModern", Component: ElegantModernResumeTemplate },
  { name: "bold", Component: BoldTemplate },
  { name: "professional", Component: ProfessionalResume },
  { category: "gridLayout", name: "gridLayout", Component: GridLayoutResume },
  { name: "formal", Component: FormalTemplate },
  { category: "modern", name: "modern", Component: ModernTemplate },
  { name: "creative", Component: CreativeResumeTemplate },
  { name: "minimal", Component: MinimalTemplate },
  { name: "glow", Component: GlowResumeTemplate },
  { name: "creativeTimeLine", Component: CreativeTimelineResumeTemplate },
  { name: "elegant", Component: ElegantTemplate },
  { name: "classic", Component: ClassicTemplate },
  { name: "ProfessionalSidebar", Component: ProfessionalSidebar },
  { name: "BlueHorizon", Component: BlueHorizon },
];

export const getResumeTemplate = (templateName) => {
  return templateComponents[templateName];
};
