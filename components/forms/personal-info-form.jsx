import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useTranslation } from "@/app/i18n/client";
import { AiSuggestionTextarea } from "../ai-suggestion-textarea";
import UploadBtn from "../btns/upload-image";

export default function PersonalInfoForm({
  data,
  updateData,
  updateImageUrl,
  lng,
}) {
  const { t } = useTranslation(lng, "forms");

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({
      type: "UPDATE",
      path: ["personalInfo", name],
      value: value,
    });
  };

  const handleContactChange = (index, value) => {
    updateData({
      type: "UPDATE",
      path: ["personalInfo", "contact", index],
      value: value,
    });
  };

  const addContact = () => {
    updateData({
      type: "ADD",
      path: ["personalInfo", "contact"],
      value: "",
    });
  };

  const removeContact = (index) => {
    updateData({
      type: "REMOVE",
      path: ["personalInfo", "contact"],
      index: index,
    });
  };

  const handleSummaryChange = (value) => {
    updateData({
      type: "UPDATE",
      path: ["personalInfo", "summary"],
      value: value,
    });
  };
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-main pb-2 border-b">
          {t("personalInfo.title")}{" "}
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-main">
                {t("personalInfo.fullName")} {/* Translation for "Full Name" */}
              </Label>
              <Input
                id="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder={t("personalInfo.fullNamePlaceholder")}
                className="border-[#3B51A3] focus:ring-[#3B51A3]"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-main">
                {t("personalInfo.email")} {/* Translation for "Email" */}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={data.contact[0]}
                onChange={(e) => handleContactChange(0, e.target.value)}
                placeholder={t("personalInfo.emailPlaceholder")}
                className="border-[#3B51A3] focus:ring-[#3B51A3]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="jobTitle" className="text-main">
                {t("personalInfo.jobTitle")} {/* Translation for "Job Title" */}
              </Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                value={data.jobTitle}
                onChange={handleChange}
                placeholder={t("personalInfo.jobTitlePlaceholder")}
                className="border-[#3B51A3] focus:ring-[#3B51A3]"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-main">
                {t("personalInfo.phone")}
              </Label>
              <Input
                id="phone"
                name="phone"
                value={data.contact[1]}
                onChange={(e) => handleContactChange(1, e.target.value)}
                placeholder={t("personalInfo.phonePlaceholder")}
                className="border-[#3B51A3] focus:ring-[#3B51A3]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <UploadBtn lng={lng} updateImageUrl={updateImageUrl} />
            {data.contact.slice(2).map((contact, index) => (
              <div key={index + 2} className="flex items-center mb-2">
                <Input
                  value={contact}
                  onChange={(e) =>
                    handleContactChange(index + 2, e.target.value)
                  }
                  placeholder={t("personalInfo.contactPlaceholder")}
                  className="border-[#3B51A3] focus:ring-[#3B51A3] flex-grow"
                />
                <Button
                  onClick={() => removeContact(index + 2)}
                  size="icon"
                  variant="ghost"
                  className="ml-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">
                    {t("personalInfo.removeContact")}
                  </span>{" "}
                  {/* Translation for "Remove contact" */}
                </Button>
              </div>
            ))}
            <Button
              onClick={addContact}
              variant="outline"
              className="main-border"
            >
              <Plus className="h-4 w-4 mx-2" />
              {t("personalInfo.addContact")}{" "}
            </Button>
          </div>

          <div>
            <AiSuggestionTextarea
              lng={lng}
              data={data.summary}
              jobTitle={data.jobTitle}
              onChange={handleSummaryChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
