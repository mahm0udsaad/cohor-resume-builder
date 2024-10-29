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
import { User, Edit } from "lucide-react";
import { updatePersonalInfo } from "@/actions/userInfo/action";
import { AiSuggestionTextarea } from "../ai-suggestion-textarea";
import { useTranslation } from "@/app/i18n/client";

export default function MyPersonalInfoForm({ user, lng }) {
  const { t } = useTranslation(lng, "forms");
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: user.name,
    jobTitle: user.personalInfo?.jobTitle || "",
    contact: user.personalInfo?.contact || [],
    summary: user.personalInfo?.summary || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSummaryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      summary: value, // Directly update the summary without destructuring the event
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        // Optimistically update the UI
        setOpen(false);

        // Call the server action
        await updatePersonalInfo(user.id, formData);
      } catch (error) {
        // Handle error (you might want to show a toast notification)
        console.error("Failed to update:", error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-[#3b51a3] p-2 rounded-full hover:bg-gray-200 transition-colors">
          <Edit size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("personalInformation.editTitle")}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          aria-labelledby="update-user-information"
          aria-describedby="update-user-personal-information"
        >
          <div className="grid gap-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <div>
                <Label htmlFor="name" className="text-right text-main">
                  {t("personalInformation.form.name")}
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div>
                <Label htmlFor="jobTitle" className="text-right text-main">
                  {t("personalInformation.form.jobTitle")}
                </Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            </div>

            <AiSuggestionTextarea
              lng={lng}
              data={user.summary}
              jobTitle={user.personalInfo?.jobTitle}
              onChange={handleSummaryChange}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-[#3b51a3] text-white"
              disabled={isPending}
            >
              {isPending
                ? t("personalInformation.form.saving")
                : t("personalInformation.form.saveChanges")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
