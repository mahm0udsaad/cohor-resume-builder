"use client";

import * as React from "react";
import { Calendar as Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DatePicker from "../component/datePicker";
import { useTranslation } from "@/app/i18n/client";
import { AiSuggestionTextarea } from "../ai-suggestion-textarea";

export default function ExperienceForm({ experiences, updateData, lng }) {
  const { t } = useTranslation(lng, "forms"); // Initialize the translation hook

  const handleExperienceChange = (index, field, value) => {
    updateData({
      type: "UPDATE",
      path: ["experiences", index, field],
      value: value,
    });
  };

  const addExperience = () => {
    updateData({
      type: "ADD",
      path: ["experiences"],
      value: {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
      },
    });
  };

  const deleteExperience = (index) => {
    updateData({
      type: "REMOVE",
      path: ["experiences"],
      index: index,
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#20133E]">
          {t("workExperience.title")}
        </h2>
        {experiences.length > 0 &&
          experiences.map((exp, index) => (
            <div key={index} className="space-y-4 relative border-b">
              <div className="grid grid-cols-2 gap-4 mb-2 mt-8">
                <div>
                  <Label
                    htmlFor={`jobTitle-${index}`}
                    className="text-[#20133E]"
                  >
                    {t("workExperience.jobTitle")}
                  </Label>
                  <Input
                    id={`jobTitle-${index}`}
                    value={exp.jobTitle}
                    onChange={(e) =>
                      handleExperienceChange(index, "jobTitle", e.target.value)
                    }
                    placeholder={t("workExperience.jobTitlePlaceholder")}
                    className="border-[#3B51A3] focus:ring-[#3B51A3]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor={`company-${index}`}
                    className="text-[#20133E]"
                  >
                    {t("workExperience.company")}
                  </Label>
                  <Input
                    id={`company-${index}`}
                    value={exp.company}
                    onChange={(e) =>
                      handleExperienceChange(index, "company", e.target.value)
                    }
                    placeholder={t("workExperience.companyPlaceholder")}
                    className="border-[#3B51A3] focus:ring-[#3B51A3]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-2">
                <DatePicker
                  value={exp.startDate}
                  onChange={(value) =>
                    handleExperienceChange(index, "startDate", value)
                  }
                  label={t("workExperience.startDate")}
                />
                <DatePicker
                  value={exp.endDate}
                  onChange={(value) =>
                    handleExperienceChange(index, "endDate", value)
                  }
                  label={t("workExperience.endDate")}
                />
              </div>
              <div>
                <Label
                  htmlFor={`responsibilities-${index}`}
                  className="text-[#20133E]"
                >
                  {t("workExperience.responsibilities")}
                </Label>
                <AiSuggestionTextarea
                  isExperince
                  data={exp}
                  lng={lng}
                  onChange={(value) =>
                    handleExperienceChange(index, "responsibilities", value)
                  }
                />
              </div>
            </div>
          ))}
        <div className="flex justify-between items-center">
          <Button
            onClick={addExperience}
            className="mt-2 bg-[#3B51A3] hover:bg-white hover:text-black"
          >
            <Plus className="h-4 w-4 mr-2" />{" "}
            {t("workExperience.addExperience")}
          </Button>
          {experiences.length > 0 && (
            <Button
              onClick={() => deleteExperience(experiences.length - 1)}
              className="mt-2 bg-gray-200 hover:bg-white text-black"
            >
              <Minus className="h-4 w-4 mr-2" />{" "}
              {t("workExperience.removeExperience")}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
