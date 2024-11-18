"use client";
import { useTranslation } from "@/app/i18n/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import DatePicker from "../component/datePicker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function EducationForm({ educations, updateData, lng }) {
  const { t } = useTranslation(lng, "forms");

  const handleEducationChange = (index, field, value) => {
    // When changing GPA type
    if (field === "gpaType") {
      // Clear both GPA fields when changing type
      updateData({
        type: "UPDATE",
        path: ["educations", index, "numericGpa"],
        value: "",
      });
      updateData({
        type: "UPDATE",
        path: ["educations", index, "descriptiveGpa"],
        value: "",
      });
      // Update the GPA type
      updateData({
        type: "UPDATE",
        path: ["educations", index, field],
        value: value,
      });
    } else {
      // For all other fields, update normally
      updateData({
        type: "UPDATE",
        path: ["educations", index, field],
        value: value,
      });
    }
  };
  const addEducation = () => {
    updateData({
      type: "ADD",
      path: ["educations"],
      value: {
        degree: "",
        institution: "",
        graduationDate: "",
        gpaType: "none",
        numericGpa: "",
        descriptiveGpa: "",
      },
    });
  };

  const deleteEducation = (index) => {
    updateData({
      type: "REMOVE",
      path: ["educations"],
      index: index,
    });
  };

  const renderGpaInput = (edu, index) => {
    if (edu.gpaType === "percentage") {
      return (
        <div className="space-y-2 mt-2">
          <Label htmlFor={`numericGpa-${index}`}>
            {t("education.gpaPercentage")}
          </Label>
          <div className="relative">
            <Input
              id={`numericGpa-${index}`}
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder={t("education.gpaPercentagePlaceholder")}
              value={edu.numericGpa}
              onChange={(e) =>
                handleEducationChange(index, "numericGpa", e.target.value)
              }
              className="border-[#3B51A3] focus:ring-[#3B51A3] pr-8"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              %
            </span>
          </div>
        </div>
      );
    } else if (edu.gpaType === "outOf4" || edu.gpaType === "outOf5") {
      const maxValue = edu.gpaType === "outOf4" ? 4 : 5;
      return (
        <div className="space-y-2 mt-2">
          <Label htmlFor={`numericGpa-${index}`}>
            {t(`education.${edu.gpaType}`)}
          </Label>
          <div className="relative">
            <Input
              id={`numericGpa-${index}`}
              type="number"
              step="0.1"
              min="0"
              max={maxValue}
              placeholder={t("education.numericGpaPlaceholder", { maxValue })}
              value={edu.numericGpa}
              onChange={(e) =>
                handleEducationChange(index, "numericGpa", e.target.value)
              }
              className="border-[#3B51A3] focus:ring-[#3B51A3] pr-12"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {maxValue}/
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-main pb-2 border-b">
          {t("education.title")}
        </h2>
        {educations.map((edu, index) => (
          <div
            style={{ direction: lng === "ar" ? "rtl" : "ltr" }}
            key={index}
            className="mb-4 p-4 rounded relative"
          >
            <div className="absolute top-0 right-0 mt-2 mr-2">
              <Button
                onClick={() => deleteEducation(index)}
                size="icon"
                variant="ghost"
                className="ml-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2 mt-8">
              <div>
                <Label htmlFor={`degree-${index}`} className="text-main">
                  {t("degree")}
                </Label>
                <Input
                  id={`degree-${index}`}
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(index, "degree", e.target.value)
                  }
                  placeholder={t("degreePlaceholder")}
                  className="border-[#3B51A3] focus:ring-[#3B51A3]"
                />
              </div>
              <div>
                <Label htmlFor={`institution-${index}`} className="text-main">
                  {t("institution")}
                </Label>
                <Input
                  id={`institution-${index}`}
                  value={edu.institution}
                  onChange={(e) =>
                    handleEducationChange(index, "institution", e.target.value)
                  }
                  placeholder={t("institutionPlaceholder")}
                  className="border-[#3B51A3] focus:ring-[#3B51A3]"
                />
              </div>
            </div>
            <div className="mb-4">
              <DatePicker
                value={edu.graduationDate}
                onChange={(value) =>
                  handleEducationChange(index, "graduationDate", value)
                }
                label={t("graduationDate")}
              />
            </div>
            <div className="space-y-2">
              <Label>
                {t("education.selectGpa")} ({t("education.optional")})
              </Label>
              <RadioGroup
                style={{ direction: lng === "ar" ? "rtl" : "ltr" }}
                className="flex gap-4 flex-wrap"
                value={edu.gpaType}
                onValueChange={(value) =>
                  handleEducationChange(index, "gpaType", value)
                }
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="none" id={`gpa-none-${index}`} />
                  <Label htmlFor={`gpa-none-${index}`}>
                    {t("education.noGpa")}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="percentage"
                    id={`gpa-percentage-${index}`}
                  />
                  <Label htmlFor={`gpa-percentage-${index}`}>
                    {t("education.gpaPercentage")}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="outOf4" id={`gpa-outOf4-${index}`} />
                  <Label htmlFor={`gpa-outOf4-${index}`}>
                    {t("education.gpaOutOf4")}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="outOf5" id={`gpa-outOf5-${index}`} />
                  <Label htmlFor={`gpa-outOf5-${index}`}>
                    {t("education.gpaOutOf5")}
                  </Label>
                </div>
              </RadioGroup>
            </div>
            {renderGpaInput(edu, index)}
          </div>
        ))}
        <Button
          onClick={addEducation}
          className="mt-2 bg-[#3B51A3] hover:bg-white hover:text-black"
        >
          <Plus className="h-4 w-4 mr-2" /> {t("addEducation")}
        </Button>
      </CardContent>
    </Card>
  );
}
