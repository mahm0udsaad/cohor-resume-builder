import Resume from "@/components/templates/classic"; // Direct import for Classic template
import ModifiedResumeTemplate from "@/components/templates/modern"; // Direct import for Modern template
import BoldTemplate from "@/components/templates/bold";
import MinimalTemplate from "./templates/minmal";

export const templates = [
  { category: "classic", name: "classic", Component: Resume },
  { category: "modern", name: "modern", Component: ModifiedResumeTemplate },
  { name: "bold", Component: BoldTemplate },
  { name: "minimal", Component: MinimalTemplate },
];
