import BoldTemplate from "@/components/pdf-view/bold";
import Classic from "@/components/pdf-view/classic";
import modern from "@/components/pdf-view/modern";
import minimal from "./pdf-view/minimal";
import elegant from "./pdf-view/elegant";
import professional from "./pdf-view/professional";
import CreativeResumeTemplate from "./pdf-view/creative";
import ElegantModernResumeTemplatePDF from "./pdf-view/elegant-modern";
import MinimalistTwoColorResumeTemplate from "./pdf-view/glow";
import creativeTimeline from "./pdf-view/creative-timeline";

export const templateViewComponents = {
  modern: modern,
  classic: Classic,
  bold: BoldTemplate,
  minimal: minimal,
  elegant: elegant,
  formal: professional,
  creative: CreativeResumeTemplate,
  elegantModern: ElegantModernResumeTemplatePDF,
  glow: MinimalistTwoColorResumeTemplate,
  creativeTimeLine: creativeTimeline,
};
