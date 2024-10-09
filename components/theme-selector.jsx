"use client";

import { useState, useRef, useEffect } from "react";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

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
    backgroundColor: "#F4F4F9",
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
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button
        variant="outline"
        className={` border shadow-lg hover:shadow-none flex h-fit items-center rounded-md px-2 hover:bg-[#3B51A3] hover:text-white`}
      >
        <Palette className="size-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-full ml-2 top-0 flex space-x-2 bg-background p-1.5 z-50 rounded-md shadow-md"
          >
            {themes.map((theme) => (
              <TooltipProvider key={theme.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedTheme(theme)}
                      className={`size-6 rounded-full ${
                        selectedTheme?.id === theme.id
                          ? "ring-2 ring-primary ring-offset-2"
                          : ""
                      }`}
                      style={{ backgroundColor: theme.primaryColor }}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{theme.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedTheme(null)}
                    className={`size-6 rounded-full border border-input ${
                      selectedTheme === null
                        ? "ring-2 ring-primary ring-offset-2"
                        : ""
                    }`}
                    style={{ backgroundColor: "white" }}
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Default</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
