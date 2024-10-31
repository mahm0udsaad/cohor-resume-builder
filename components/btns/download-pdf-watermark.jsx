import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const DownloadWithWatermarkBtn = ({ resumeData, templateName }) => {
  const [loading, setLoading] = useState(false);

  const loadArabicFonts = async () => {
    // Add Google Fonts stylesheet
    const googleFontsLink = document.createElement("link");
    googleFontsLink.rel = "stylesheet";
    googleFontsLink.href =
      "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Tajawal:wght@400;500;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap";
    document.head.appendChild(googleFontsLink);

    // Add custom styles for Arabic text
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .arabic-text {
        font-family: 'Cairo', 'Tajawal', 'Noto Naskh Arabic', system-ui, -apple-system, sans-serif;
      }
    `;
    document.head.appendChild(styleSheet);

    // Wait for fonts to load
    await document.fonts.ready;

    return { googleFontsLink, styleSheet };
  };

  const downloadWithWatermark = async () => {
    try {
      setLoading(true);

      const [html2canvasModule, jsPDFModule] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const html2canvas = html2canvasModule.default;
      const jsPDF = jsPDFModule.default;

      // Only load Arabic fonts if the language is Arabic
      let arabicFontsData;
      if (resumeData.lng === "ar") {
        arabicFontsData = await loadArabicFonts();
      }

      const element = document.getElementById("resume-template");
      if (!element) {
        throw new Error("Resume template element not found");
      }

      // Create a clone of the element
      const clonedElement = element.cloneNode(true);
      clonedElement.style.position = "absolute";
      clonedElement.style.left = "-9999px";

      // Apply Arabic fonts if needed
      if (resumeData.lng === "ar") {
        const applyArabicStyles = (element) => {
          element.classList.add("arabic-text");
          Array.from(element.children).forEach((child) =>
            applyArabicStyles(child),
          );
        };
        applyArabicStyles(clonedElement);
      }

      document.body.appendChild(clonedElement);

      // Add watermark
      const watermark = document.createElement("div");
      watermark.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        z-index: 1000;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
      `;

      watermark.innerHTML = `
        <img 
          src="/ar-logo.png" 
          alt="Watermark" 
          style="
            width: 500px;
            height: auto;
            opacity: 0.3;
          "
        />
      `;

      clonedElement.appendChild(watermark);

      // Wait an additional moment for fonts to load
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Capture with better quality and font settings
      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (clonedDoc) => {
          if (resumeData.lng === "ar") {
            const style = clonedDoc.createElement("style");
            style.textContent = `
              * {
                font-family: 'Cairo', 'Tajawal', 'Noto Naskh Arabic', system-ui, -apple-system, sans-serif !important;
                direction: rtl;
              }
            `;
            clonedDoc.head.appendChild(style);
          }
        },
      });

      // Clean up
      document.body.removeChild(clonedElement);
      if (arabicFontsData) {
        document.head.removeChild(arabicFontsData.styleSheet);
        document.head.removeChild(arabicFontsData.googleFontsLink);
      }

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const aspectRatio = canvas.width / canvas.height;
      const imgWidth = pageWidth;
      const imgHeight = pageWidth / aspectRatio;

      // Add image to PDF
      if (imgHeight > pageHeight) {
        const scale = pageHeight / imgHeight;
        pdf.addImage(imgData, "JPEG", 0, 0, pageWidth * scale, pageHeight);
      } else {
        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      }

      const filename = `${resumeData.personalInfo?.name || "resume"}_free.pdf`;
      pdf.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      s
      onClick={downloadWithWatermark}
      disabled={loading}
      className="border shadow-lg hover:shadow-none flex h-fit items-center gap-2 rounded-md px-3 py-2 hover:bg-blue-600 hover:text-white"
    >
      {loading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <>
          <Download className="h-4 w-4" />
        </>
      )}
    </Button>
  );
};
