import path from "path";
import { dummyData } from "@/data/data";

export async function generateTemplateImage(templateName) {
  try {
    // Create a temporary div to render the component
    const tempDiv = document.createElement("div");
    tempDiv.style.width = "1200px"; // Set fixed width for consistent quality
    tempDiv.style.height = "1600px"; // Aspect ratio 3:4
    document.body.appendChild(tempDiv);
    const TemplateComponent = getResumeTemplate(templateName);

    // Render the component into the temporary div
    const root = ReactDOM.createRoot(tempDiv);
    root.render(
      <div style={{ width: "100%", height: "100%", background: "white" }}>
        <TemplateComponent resumeData={dummyData} />
      </div>,
    );

    // Wait for any fonts to load
    await document.fonts.ready;

    // Add a small delay to ensure complete rendering
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Generate the image
    const dataUrl = await htmlToImag.toPng(tempDiv, {
      quality: 1.0,
      pixelRatio: 2, // Higher resolution
      skipAutoScale: true,
    });

    // Convert base64 to buffer
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const blob = new Blob([buffer], { type: "image/png" });

    // Cleanup
    root.unmount();
    document.body.removeChild(tempDiv);

    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error generating template image:", error);
    throw error;
  }
}

// Helper function to generate images for all templates
export async function generateAllTemplateImages(templates, dummyData) {
  const results = [];

  for (const template of templates) {
    try {
      const imagePath = await generateTemplateImage(
        template.Component,
        dummyData,
        template.name,
      );
      results.push({ name: template.name, path: imagePath, success: true });
    } catch (error) {
      results.push({ name: template.name, error, success: false });
    }
  }

  return results;
}
