"use client"
import { useEffect, useState } from "react";

export function useTheme() {
  const [selectedTheme, setSelectedTheme] = useState(
    JSON.parse(sessionStorage.getItem("selectedTheme")) || null,
  );

  useEffect(() => {
    sessionStorage.setItem("selectedTheme", JSON.stringify(selectedTheme));
  }, [selectedTheme]);

  return { selectedTheme, setSelectedTheme };
}
