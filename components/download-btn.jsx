"use client";

import { Button } from "./ui/button";

export const DownloadBtn = () => (
  <Button
    variant="ghost"
    className="bg-main sticky top-12 text-white"
    onClick={() => {
      const beforePrint = () => {
        const { body } = document;
        body.style.width = "257mm";
        body.style.height = "364mm";
        body.style.margin = "0";
        body.style.overflow = "hidden";
      };

      const afterPrint = () => {
        const { body } = document;
        body.style.width = "";
        body.style.height = "";
        body.style.margin = "";
        body.style.overflow = "";
      };

      window.addEventListener("beforeprint", beforePrint);
      window.addEventListener("afterprint", afterPrint);

      window.print();

      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
    }}
  >
    Download PDF
  </Button>
);
