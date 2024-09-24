import React from "react";
import ThemeSelector, { themes } from "@/components/theme-selector";

const withTheme = (WrappedComponent) => {
  return function ThemedComponent(props) {
    const [selectedTheme, setSelectedTheme] = React.useState(
      themes.find((theme) => theme.id === "original"),
    );

    const themeStyles = {
      "--primary-color": selectedTheme.primaryColor || "#3B51A3",
      "--secondary-color": selectedTheme.secondaryColor || "#542B72",
      "--text-color": selectedTheme.textColor || "#20133E",
      "--background-color": selectedTheme.backgroundColor || "#FFFFFF",
      "--accent-color": selectedTheme.accentColor || "#3B51A3",
      "--sidebar-color": selectedTheme.sidebarColor || "#FFFFFF",
    };
    const getThemeClasses = (baseClasses) => {
      if (selectedTheme.id === "original") {
        return baseClasses;
      }
      // Remove color classes for non-original themes
      return baseClasses
        .split(" ")
        .filter((cls) => !cls.startsWith("text-") && !cls.startsWith("bg-"))
        .join(" ");
    };

    return (
      <div style={themeStyles}>
        <ThemeSelector
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
        />
        <WrappedComponent
          {...props}
          theme={selectedTheme}
          getThemeClasses={getThemeClasses}
        />
      </div>
    );
  };
};

export default withTheme;
