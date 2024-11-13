import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const DownloadWithWatermarkBtn = ({ resumeData, templateName }) => {
  const [loading, setLoading] = useState(false);

  const downloadWithWatermark = async () => {
    try {
      setLoading(true);

      const element = document.getElementById("resume-template");
      if (!element) {
        throw new Error("Resume template element not found");
      }

      // Create PDF with fixed dimensions
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [650, 800],
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Clone and prepare the element with exact PDF dimensions
      const clonedElement = element.cloneNode(true);
      clonedElement.style.position = "absolute";
      clonedElement.style.left = "-9999px";
      clonedElement.style.width = `${pageWidth}px`;
      clonedElement.style.minHeight = `${pageHeight}px`; // Set minimum height
      clonedElement.style.height = "auto"; // Allow content to expand beyond min height
      clonedElement.style.transform = "scale(1)";
      clonedElement.style.backgroundColor = "#ffffff";
      document.body.appendChild(clonedElement);

      // Add watermark
      const watermark = document.createElement("div");
      watermark.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 50px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.1);
        pointer-events: none;
        z-index: 1000;
      `;
      watermark.innerHTML = ``;
      clonedElement.appendChild(watermark);

      // Wait for any potential dynamic content to render
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Get actual height after content renders
      const actualHeight = Math.max(clonedElement.scrollHeight, pageHeight);

      // Update PDF height if content exceeds minimum height
      if (actualHeight > pageHeight) {
        pdf.internal.pageSize.setHeight(actualHeight);
        pdf.internal.pageSize.setWidth(pageWidth);
      }

      // Capture with html2canvas
      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: pageWidth,
        height: actualHeight,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById("resume-template");
          if (clonedElement) {
            clonedElement.style.minHeight = `${pageHeight}px`;
          }
        },
      });

      // Clean up cloned element
      document.body.removeChild(clonedElement);

      // Add image to PDF
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, actualHeight);

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
      onClick={downloadWithWatermark}
      variant="outline"
      className="w-full gap-2"
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <Download className="w-4 h-4" />
        </>
      )}
    </Button>
  );
};
