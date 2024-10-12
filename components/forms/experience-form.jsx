"use client";

import * as React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "../component/datePicker";
import { useTranslation } from "@/app/i18n/client";
import { AiSuggestionTextarea } from "../ai-suggestion-textarea";

const INITIAL_EXPERIENCE = {
  jobTitle: "",
  company: "",
  startDate: "",
  endDate: "",
  responsibilities: "",
};

const ExperienceFields = ({ experience, index, onDelete, onChange, lng }) => {
  const handleFieldChange = (field, value) => {
    onChange(index, field, value);
  };
  const { t } = useTranslation(lng, "forms");
  const handlePresentToggle = (checked) => {
    handleFieldChange("endDate", checked ? "Present" : "");
  };

  return (
    <div className="flex flex-col mb-4 p-4 rounded">
      <div className="flex w-full items-center justify-end">
        <Button onClick={() => onDelete(index)} size="icon" variant="ghost">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Job Title Field */}
        <div>
          <Label htmlFor={`jobTitle-${index}`} className="text-black">
            {t("workExperience.jobTitle")}
          </Label>
          <Input
            id={`jobTitle-${index}`}
            value={experience.jobTitle}
            onChange={(e) => handleFieldChange("jobTitle", e.target.value)}
            placeholder={t("workExperience.jobTitlePlaceholder")}
            className="border-[#3B51A3] focus:ring-[#3B51A3]"
          />
        </div>

        {/* Company Field */}
        <div>
          <Label htmlFor={`company-${index}`} className="text-black">
            {t("workExperience.company")}
          </Label>
          <Input
            id={`company-${index}`}
            value={experience.company}
            onChange={(e) => handleFieldChange("company", e.target.value)}
            placeholder={t("workExperience.companyPlaceholder")}
            className="border-[#3B51A3] focus:ring-[#3B51A3]"
          />
        </div>
      </div>

      {/* Date Fields */}
      <div className="grid grid-cols-2 gap-4 mb-2">
        <DatePicker
          value={experience.startDate}
          onChange={(value) => handleFieldChange("startDate", value)}
          label={t("workExperience.startDate")}
        />
        <DatePicker
          disabled={experience.endDate === "Present"}
          value={experience.endDate}
          onChange={(value) => handleFieldChange("endDate", value)}
          label={t("workExperience.endDate")}
        />
      </div>

      {/* Present Checkbox */}
      <div className="flex justify-end">
        <div className="flex items-center w-[47%] justify-start gap-3 mb-2">
          <Checkbox
            id={`endDatePresent-${index}`}
            checked={experience.endDate === "Present"}
            onCheckedChange={handlePresentToggle}
          />
          <label htmlFor={`endDatePresent-${index}`}>
            {t("workExperience.endDatePresent")}
          </label>
        </div>
      </div>

      {/* Responsibilities Field */}
      <AiSuggestionTextarea
        lng={lng}
        isExperince
        data={experience.responsibilities}
        jobTitle={experience.jobTitle}
        onChange={(value) => handleFieldChange("responsibilities", value)}
      />
    </div>
  );
};

export default function ExperienceForm({ experiences, updateData, lng }) {
  const { t } = useTranslation(lng, "forms");

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
      value: INITIAL_EXPERIENCE,
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
        <h2 className="text-2xl font-semibold mb-4 text-main pb-2 border-b">
          {t("workExperience.title")}
        </h2>

        {experiences.map((exp, index) => (
          <ExperienceFields
            key={index}
            experience={exp}
            index={index}
            onDelete={deleteExperience}
            onChange={handleExperienceChange}
            lng={lng}
          />
        ))}

        <div className="flex justify-between items-center">
          <Button
            onClick={addExperience}
            className="mt-2 bg-[#3B51A3] hover:bg-white hover:text-black"
          >
            <Plus className="h-4 w-4 mx-2" />
            {t("workExperience.addExperience")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
