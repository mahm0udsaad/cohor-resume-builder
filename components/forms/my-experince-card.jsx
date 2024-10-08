"use client";
import React, { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Plus } from "lucide-react";
import { AiSuggestionTextarea } from "../ai-suggestion-textarea";
import { useTranslation } from "@/app/i18n/client";
import DatePicker from "../component/datePicker";
import { addOrUpdateExperience } from "@/actions/userInfo/action";
import { formatDate } from "@/helper/date";

export default function ExperienceCard({ user, lng }) {
  const { t } = useTranslation(lng, "forms");
  const [isSaving, startTransition] = useTransition();
  const [experiences, setExperiences] = useState(user.experiences || []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(null);
  const [currentExperience, setCurrentExperience] = useState({
    jobTitle: "",
    company: "",
    startDate: null,
    endDate: null,
    responsibilities: "",
  });

  // Open Dialog to add or edit an experience
  const openDialog = (index) => {
    if (index !== undefined) {
      setCurrentExperience(experiences[index]); // Load experience for editing
      setCurrentExperienceIndex(index);
    } else {
      setCurrentExperience({
        jobTitle: "",
        company: "",
        startDate: null,
        endDate: null,
        responsibilities: "",
      }); // Reset for new experience
      setCurrentExperienceIndex(null);
    }
    setIsDialogOpen(true);
  };

  // Close dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  // Handle input changes
  const handleChange = (field, value) => {
    setCurrentExperience((prev) => ({ ...prev, [field]: value }));
  };

  // Save or update the experience (Server action)
  const saveExperience = async () => {
    startTransition(async () => {
      try {
        await addOrUpdateExperience(user.id, currentExperience);
        closeDialog();
      } catch (error) {
        console.error("Error saving experience:", error);
      }
    });
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div className="w-full flex justify-between items-center">
            <CardTitle className="text-start text-2xl font-semibold text-[#20133E]">
              {t("workExperience.title")}
            </CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
              <Button
                onClick={() => openDialog(undefined)}
                variant="ghost"
                className="border"
              >
                <Plus className="size-5" />
              </Button>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {currentExperienceIndex !== null
                      ? t("workExperience.editExperience")
                      : t("workExperience.addExperience")}
                  </DialogTitle>
                </DialogHeader>
                <div className="p-4">
                  <Label className="text-[#20133E]">
                    {t("workExperience.jobTitle")}
                  </Label>
                  <Input
                    value={currentExperience.jobTitle}
                    onChange={(e) => handleChange("jobTitle", e.target.value)}
                    placeholder={t("workExperience.jobTitlePlaceholder")}
                    className="border-[#3B51A3] focus:ring-[#3B51A3] mb-4"
                  />
                  <Label className="text-[#20133E]">
                    {t("workExperience.company")}
                  </Label>
                  <Input
                    value={currentExperience.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder={t("workExperience.companyPlaceholder")}
                    className="border-[#3B51A3] focus:ring-[#3B51A3] mb-4"
                  />
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <DatePicker
                      value={currentExperience.startDate}
                      onChange={(value) => handleChange("startDate", value)}
                      label={t("workExperience.startDate")}
                    />
                    <DatePicker
                      value={currentExperience.endDate}
                      onChange={(value) => handleChange("endDate", value)}
                      label={t("workExperience.endDate")}
                    />
                  </div>
                  <Label className="text-[#20133E]">
                    {t("workExperience.responsibilities")}
                  </Label>
                  <AiSuggestionTextarea
                    isExperience
                    data={currentExperience}
                    lng={lng}
                    onChange={(value) =>
                      handleChange("responsibilities", value)
                    }
                  />
                  <Button
                    onClick={saveExperience}
                    disabled={isSaving}
                    className="mt-4 bg-[#3B51A3] hover:bg-white hover:text-black"
                  >
                    {isSaving ? "saving..." : t("workExperience.save")}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <div key={index} className="space-y-4 relative border-b pb-4">
                <h3 className="text-lg font-semibold text-[#20133E]">
                  {exp.jobTitle} at {exp.company}
                </h3>
                <p>
                  {t("workExperience.startDate")}: {formatDate(exp.startDate)}
                </p>
                <p>
                  {t("workExperience.endDate")}: {formatDate(exp.endDate)}
                </p>
                <p>
                  {t("workExperience.responsibilities")}: {exp.responsibilities}
                </p>
                <Button
                  onClick={() => openDialog(index)}
                  className="mt-2 bg-[#3B51A3] hover:bg-white hover:text-black"
                >
                  <Edit className="h-4 w-4 " />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">{t("workExperience.noExperience")}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
