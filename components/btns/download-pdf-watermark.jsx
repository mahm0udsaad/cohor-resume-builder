import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const DownloadWithWatermarkBtn = ({ resumeData, templateName }) => {
  const [loading, setLoading] = useState(false);

  const loadArabicFonts = async () => {
    const googleFontsLink = document.createElement("link");
    googleFontsLink.rel = "stylesheet";
    googleFontsLink.href =
      "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&family=Tajawal:wght@400;500;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap";
    document.head.appendChild(googleFontsLink);

    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .arabic-text {
        font-family: 'Cairo', 'Tajawal', 'Noto Naskh Arabic', system-ui, -apple-system, sans-serif;
      }
    `;
    document.head.appendChild(styleSheet);

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

      let arabicFontsData;
      if (resumeData.lng === "ar") {
        arabicFontsData = await loadArabicFonts();
      }

      const element = document.getElementById("resume-template");
      if (!element) {
        throw new Error("Resume template element not found");
      }

      // Create PDF first to get dimensions
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "A3",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Clone and prepare the element with PDF dimensions
      const clonedElement = element.cloneNode(true);
      clonedElement.style.position = "absolute";
      clonedElement.style.left = "-9999px";
      // Set the exact dimensions to match PDF size
      clonedElement.style.width = `${pageWidth}px`;
      clonedElement.style.height = `${pageHeight}px`;

      // Add styles to make content stretch
      const styleSheet = document.createElement("style");
      document.head.appendChild(styleSheet);

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

      await new Promise((resolve) => setTimeout(resolve, 500));

      // Capture with exact PDF dimensions
      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: pageWidth,
        height: pageHeight,
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
      document.head.removeChild(styleSheet);
      if (arabicFontsData) {
        document.head.removeChild(arabicFontsData.styleSheet);
        document.head.removeChild(arabicFontsData.googleFontsLink);
      }

      // Convert to mm for PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      // Add image using full page dimensions
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

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
      onClick={downloadWithWatermark}
      disabled={loading}
      className="border shadow-lg hover:shadow-none flex h-fit items-center gap-2 rounded-md px-3 py-2 hover:bg-blue-600 hover:text-white"
    >
      {loading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <Download className="h-4 w-4" />
      )}
    </Button>
  );
};
