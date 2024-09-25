"use client";
import { useEffect, useState } from "react";

export function useTheme() {
  const [selectedTheme, setSelectedTheme] = useState(
    (typeof window !== "undefined" &&
      JSON.parse(sessionStorage.getItem("selectedTheme"))) ||
      null,
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedTheme", JSON.stringify(selectedTheme));
    }
  }, [selectedTheme]);

  return { selectedTheme, setSelectedTheme };
}
