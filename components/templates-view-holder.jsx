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
import ProfessionalResume from "./pdf-view/formal";
import GridLayout from "./pdf-view/gridLayout";
import ProfessionalSidebarPDF from "./pdf-view/professional-sidebar";
import BlueHorizonPDF from "./pdf-view/blueHorizon";
import ModernFormalResumeTemplatePDF from "./pdf-view/moder-formal";
import MinimalistModernResume from "./pdf-view/minimalist";
import DynamicModernResume from "./pdf-view/dynamic-modern";
import InfographicResume from "./pdf-view/infographic";
import FormalOneColumnResume from "./pdf-view/one-col-formal";
import ElegantFormalTemplate from "./pdf-view/elegant-formal";
import SimpleFormalTemplatePDF from "./pdf-view/simple-formal";
import CompactElegancePDF from "./pdf-view/compact-elegance";
import DotedTemplatePDF from "./pdf-view/dotes";

export const templateViewComponents = {
  modern: modern,
  classic: Classic,
  bold: BoldTemplate,
  minimal: minimal,
  elegant: elegant,
  formal: professional,
  creative: CreativeResumeTemplate,
  elegantModern: ElegantModernResumeTemplatePDF,
  elegantmodern: ElegantModernResumeTemplatePDF,
  glow: MinimalistTwoColorResumeTemplate,
  creativeTimeLine: creativeTimeline,
  professional: ProfessionalResume,
  gridLayout: GridLayout,
  ProfessionalSidebar: ProfessionalSidebarPDF,
  BlueHorizon: BlueHorizonPDF,
  modernFormal: ModernFormalResumeTemplatePDF,
  minimalist: MinimalistModernResume,
  dynamicModern: DynamicModernResume,
  infografic: InfographicResume,
  infographic: InfographicResume,
  onColFormal: FormalOneColumnResume,
  elegantformal: ElegantFormalTemplate,
  elegantFormal: ElegantFormalTemplate,
  simpleFormal: SimpleFormalTemplatePDF,
  simpleformal: SimpleFormalTemplatePDF,
  compactelegance: CompactElegancePDF,
  dotes: DotedTemplatePDF,
};
