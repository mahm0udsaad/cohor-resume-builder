import { Font } from "@react-pdf/renderer";

// In src/utils/fontManager.js
export const registerFonts = async () => {
  if (fontsLoaded) return true;

  console.log(fontsLoaded);
  try {
    Font.register({
      family: "IBM Plex Sans Arabic",
      src: "https://fonts.gstatic.com/s/cairo/v17/SLXgc-Blk.ttf",
    });
    console.log(fontsLoaded);

    fontsLoaded = true;
    return true;
  } catch (error) {
    console.error("Failed to register fonts:", error);
    return false;
  }
};
