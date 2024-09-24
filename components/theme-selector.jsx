"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const themes = [
  {
    id: "original",
    name: "Original",
    primaryColor: "#3B51A3",
    backgroundColor: "#EBF8FF",
  },
  {
    id: "dark",
    name: "Dark",
    primaryColor: "#1E293B",
    backgroundColor: "#aac0f5",
  },
  {
    id: "nature",
    name: "Nature",
    primaryColor: "#2F855A",
    backgroundColor: "#F0FFF4",
  },
  {
    id: "ocean",
    name: "Ocean",
    primaryColor: "#2B6CB0",
    backgroundColor: "#EBF8FF",
  },
  {
    id: "sunset",
    name: "Sunset",
    primaryColor: "#C05621",
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setSelectedTheme(null)}
              className={`w-6 h-6 rounded-full border border-black ${
                selectedTheme === null ? "ring-2 ring-offset-2" : ""
              }`}
              style={{ backgroundColor: "white" }}
            ></button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Default</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
