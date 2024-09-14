import { useState } from "react";

const defaultTheme = {
  id: "default",
  name: "Default",
  primaryColor: "#3B51A3",
  secondaryColor: "#542B72",
  textColor: "#20133E",
  backgroundColor: "#FFFFFF",
};

export function useTheme() {
  const [selectedTheme, setSelectedTheme] = useState(null);

  return { selectedTheme, setSelectedTheme };
}
