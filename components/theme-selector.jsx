"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const themes = [
  {
    id: "default",
    name: "Default",
    primaryColor: "#3B51A3",
    secondaryColor: "#542B72",
    textColor: "#20133E",
    backgroundColor: "#FFFFFF",
  },
  {
    id: "dark",
    name: "Dark",
    primaryColor: "#1E293B",
    secondaryColor: "#334155",
    textColor: "#E2E8F0",
    backgroundColor: "#0F172A",
  },
  {
    id: "nature",
    name: "Nature",
    primaryColor: "#2F855A",
    secondaryColor: "#276749",
    textColor: "#1A202C",
    backgroundColor: "#F0FFF4",
  },
  {
    id: "ocean",
    name: "Ocean",
    primaryColor: "#2B6CB0",
    secondaryColor: "#2C5282",
    textColor: "#1A202C",
    backgroundColor: "#EBF8FF",
  },
  {
    id: "sunset",
    name: "Sunset",
    primaryColor: "#C05621",
    secondaryColor: "#9C4221",
    textColor: "#1A202C",
    backgroundColor: "#FFFAF0",
  },
];

export function ThemeSelector({ selectedTheme, setSelectedTheme }) {
  return (
    <div className="flex space-x-2">
      {themes.map((theme) => (
        <TooltipProvider key={theme.id}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setSelectedTheme(theme)}
                className={`w-6 h-6 rounded-full ${
                  selectedTheme?.id === theme.id ? "ring-2 ring-offset-2" : ""
                }`}
                style={{ backgroundColor: theme.primaryColor }}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{theme.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
