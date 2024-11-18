"use client";
import React, { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Plus, Trash } from "lucide-react";
import { AiSuggestionTextarea } from "../ai-suggestion-textarea";
import { useTranslation } from "@/app/i18n/client";
import DatePicker from "../component/datePicker";
import {
  addOrUpdateExperience,
  deleteExperience,
  updateExperience,
} from "@/actions/userInfo/action";
import { formatDate } from "@/helper/date";
import Spinner from "../skeleton/spinner";
import FlatDatePicker from "../component/flat-date-picker";

export default function ExperienceCard({ user, lng }) {
  const { t } = useTranslation(lng, "forms");
  const [isSaving, startTransition] = useTransition();
  const [experiences, setExperiences] = useState(user.experiences || []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(null);
  const [currentExperience, setCurrentExperience] = useState({
    jobTitle: "",
    company: "",
    startDate: null,
    endDate: null,
    responsibilities: "",
  });

  const openDrawer = (index) => {
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
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setCurrentExperience({
      jobTitle: "",
      company: "",
      startDate: null,
      endDate: null,
      responsibilities: "",
    });
  };

  const handleChange = (field, value) => {
    setCurrentExperience((prev) => ({ ...prev, [field]: value }));
  };

  const saveExperience = async () => {
    startTransition(async () => {
      try {
        if (currentExperienceIndex === null) {
          await addOrUpdateExperience(user.id, currentExperience);
          setExperiences([...experiences, currentExperience]);
        } else {
          const updatedExperiences = experiences.map((exp, i) =>
            i === currentExperienceIndex ? currentExperience : exp,
          );
          setExperiences(updatedExperiences);
          await updateExperience(
            user.id,
            currentExperienceIndex,
            currentExperience,
          );
        }
        closeDrawer();
      } catch (error) {
        console.error("Error saving experience:", error);
      }
    });
  };

  const handleDelete = async (index) => {
    startTransition(async () => {
      try {
        await deleteExperience(user.id, index);
        setExperiences(experiences.filter((_, i) => i !== index));
      } catch (error) {
        console.error("Error deleting experience:", error);
      }
    });
  };

  return (
    <Card>
      <CardHeader className="w-full">
        <div className="w-full flex justify-between items-center">
          <CardTitle className="text-start text-2xl font-semibold text-main">
            {t("workExperience.title")}
          </CardTitle>
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <Button
              onClick={() => openDrawer(undefined)}
              variant="ghost"
              className="border"
            >
              <Plus className="size-5" />
            </Button>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>
                  {currentExperienceIndex !== null
                    ? t("workExperience.editExperience")
                    : t("workExperience.addExperience")}
                </DrawerTitle>
              </DrawerHeader>
              <div className="grid grid-cols-3 w-11/12 mx-auto gap-4 mt-4">
                <FlatDatePicker
                  value={currentExperience.startDate}
                  onChange={(date) => handleChange("startDate", date)}
                  label={t("workExperience.startDate")}
                />
                <FlatDatePicker
                  value={currentExperience.endDate}
                  onChange={(date) => handleChange("endDate", date)}
                  label={t("workExperience.endDate")}
                />
                <div className="space-y-6 mt-3">
                  <div className="">
                    <Label className="text-main">
                      {t("workExperience.jobTitle")}
                    </Label>
                    <Input
                      value={currentExperience.jobTitle}
                      onChange={(e) => handleChange("jobTitle", e.target.value)}
                      placeholder={t("workExperience.jobTitlePlaceholder")}
                      className="border-[#3B51A3] focus:ring-[#3B51A3]"
                    />
                  </div>
                  <div className="">
                    <Label className="text-main mt-4">
                      {t("workExperience.company")}
                    </Label>
                    <Input
                      value={currentExperience.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      placeholder={t("workExperience.companyPlaceholder")}
                      className="border-[#3B51A3] focus:ring-[#3B51A3]"
                    />
                  </div>
                  <AiSuggestionTextarea
                    data={currentExperience.responsibilities}
                    lng={lng}
                    isExperince
                    jobTitle={currentExperience.jobTitle}
                    onChange={(value) =>
                      handleChange("responsibilities", value)
                    }
                  />
                </div>
              </div>
              <DrawerFooter>
                <div className="flex justify-end">
                  <Button
                    onClick={saveExperience}
                    disabled={isSaving}
                    className="bg-[#3B51A3] hover:bg-white hover:text-black"
                  >
                    {isSaving ? <Spinner /> : t("save")}
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline" onClick={closeDrawer}>
                      {t("cancel")}
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </CardHeader>

      <CardContent className="p-3 space-y-2">
        {experiences.length > 0 ? (
          experiences.map((exp, index) => (
            <div
              key={index}
              className="space-y-4 relative border-b pb-2 last:border-b-0"
            >
              <h3 className="text-lg font-semibold text-main">
                {exp.jobTitle} at {exp.company}
              </h3>
              <p>
                {t("workExperience.dates")}: {formatDate(exp.startDate)} -{" "}
                {exp.isCurrentJob
                  ? t.present
                  : formatDate(exp.endDate, resumeData.lng)}
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => openDrawer(index)}
                  className="bg-[#3B51A3] hover:bg-white hover:text-black"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleDelete(index)}
                  disabled={isSaving}
                  variant="ghost"
                  className="bg-rose-500 text-white hover:bg-white hover:text-rose-500"
                >
                  {isSaving ? <Spinner /> : <Trash className="size-4" />}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">{t("workExperience.noExperience")}</p>
        )}
      </CardContent>
    </Card>
  );
}
