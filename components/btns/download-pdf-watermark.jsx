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

      // Create PDF first to get dimensions
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
      clonedElement.style.height = `${pageHeight}px`;
      clonedElement.style.transform = "scale(1)"; // Remove scaling issues
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
      `;

      watermark.innerHTML = `
        <img 
          src="/ar-logo.png" 
          alt="Watermark" 
          style="
            width: 400px;
            height: auto;
            opacity: 0.2;
          "
        />
      `;

      clonedElement.appendChild(watermark);

      await new Promise((resolve) => setTimeout(resolve, 500));

      // Capture with `html2canvas` using specific width and height
      const canvas = await html2canvas(clonedElement, {
        scale: 2, // Adjust scale if needed
        useCORS: true,
        allowTaint: true,
        width: pageWidth,
        height: pageHeight,
        backgroundColor: "#ffffff",
      });

      // Clean up cloned element from the DOM
      document.body.removeChild(clonedElement);

      // Add image to PDF
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight);

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
