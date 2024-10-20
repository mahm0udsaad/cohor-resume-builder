import dynamic from "next/dynamic";

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
};
export const templates = [
  {
    name: "elegantModern",
    image: "/templates/elegantModern.png",
  },
  {
    name: "bold",
    image: "/templates/bold.png",
  },
  {
    name: "professional",
    image: "/templates/professional.png",
  },
  {
    category: "gridLayout",
    name: "gridLayout",
    image: "/templates/gridLayout.png",
  },
  {
    name: "formal",
    image: "/templates/formal.png",
  },
  {
    category: "modern",
    name: "modern",
    image: "/templates/modern.png",
  },
  {
    name: "creative",
    image: "/templates/creative.png",
  },
  {
    name: "minimal",
    image: "/templates/minimal.png",
  },
  {
    category: "glow",
    name: "glow",
    image: "/templates/glow.png",
  },
  {
    category: "creativeTimeLine",
    name: "creativeTimeLine",
    image: "/templates/creativeTimeLine.png",
  },
  {
    name: "elegant",
    Component: ElegantTemplate,
    image: "/templates/elegant.png",
  },
  {
    category: "classic",
    name: "classic",
    Component: ClassicTemplate,
    image: "/templates/classic.png",
  },
  {
    category: "ProfessionalSidebar",
    name: "ProfessionalSidebar",
    Component: ProfessionalSidebar,
    image: "/templates/ProfessionalSidebar.png",
  },
  {
    category: "BlueHorizon",
    name: "BlueHorizon",
    Component: BlueHorizon,
    image: "/templates/BlueHorizon.png",
  },
];
export const getResumeTemplate = (templateName) => {
  return templateComponents[templateName];
};
