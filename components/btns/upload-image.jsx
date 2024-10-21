"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { useTranslation } from "@/app/i18n/client";
import { uploadToCloud } from "@/lib/cloud";
import { usePathname } from "next/navigation";

const allowedTemplates = [
  "elegantModern",
  "creativeTimeLine",
  "professional",
  "gridLayout",
  "creative",
  "glow",
  "formal",
  "ProfessionalSidebar",
];

export default function UploadBtn({ lng, updateImageUrl }) {
  const { t } = useTranslation(lng, "forms");
  const imageRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  if (!allowedTemplates.includes(pathname.split("/")[3])) return;

  const handleImageChange = async (e) => {
    setIsLoading(true);
    updateImageUrl("");
    const file = e.target.files?.[0];
    const localImageUrl = URL.createObjectURL(file);
    updateImageUrl(localImageUrl);
    const formData = new FormData();
    formData.append("file", file);
    const image = await uploadToCloud(formData);
    setTimeout(() => {
      updateImageUrl(image?.adImage || localImageUrl);
    }, 10000);
    setIsLoading(false);
  };
  const addImage = () => {
    imageRef.current.click();
  };

  return (
    <>
      <Button
        disabled={isLoading}
        onClick={addImage}
        variant="outline"
        className="main-border"
      >
        <Image className="h-4 w-4 mx-2" />
        {isLoading ? "uploading..." : t("personalInfo.addImage")}
      </Button>
      <Input
        ref={imageRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden border-[#3B51A3] focus:ring-[#3B51A3] rounded px-2 py-1"
      />
    </>
  );
}
