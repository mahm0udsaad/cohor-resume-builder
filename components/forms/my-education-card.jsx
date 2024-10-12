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
import { useTranslation } from "@/app/i18n/client";
import {
  deleteEducation,
  updateEducation,
  addEducation,
} from "@/actions/userInfo/education";
import { formatDate } from "@/helper/date";
import Spinner from "../skeleton/spinner";
import { useToast } from "@/hooks/use-toast";
import FlatDatePicker from "../component/flat-date-picker";

export default function EducationCard({ user, lng }) {
  const { t } = useTranslation(lng, "forms");
  const [isSaving, startTransition] = useTransition();
  const [educations, setEducations] = useState(user.educations || []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();
  const [currentEducationIndex, setCurrentEducationIndex] = useState(null);
  const [currentEducation, setCurrentEducation] = useState({
    degree: "",
    institution: "",
    graduationDate: "",
  });

  const openDrawer = (index) => {
    if (index !== undefined) {
      setCurrentEducation(educations[index]);
      setCurrentEducationIndex(index);
    } else {
      setCurrentEducation({
        degree: "",
        institution: "",
        graduationDate: "",
      });
      setCurrentEducationIndex(null);
    }
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setCurrentEducation({
      degree: "",
      institution: "",
      graduationDate: null,
    });
  };

  const handleChange = (field, value) => {
    setCurrentEducation((prev) => ({ ...prev, [field]: value }));
  };

  const validateEducation = () => {
    if (!currentEducation.degree.trim()) {
      toast({
        title: "Error",
        description: "Degree is required",
        variant: "destructive",
      });
      return false;
    }
    if (!currentEducation.institution.trim()) {
      toast({
        title: "Error",
        description: "Institution is required",
        variant: "destructive",
      });
      return false;
    }
    if (!currentEducation.graduationDate) {
      toast({
        title: "Error",
        description: "Graduation date is required",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const saveEducation = async () => {
    if (!validateEducation()) return;

    startTransition(async () => {
      try {
        let result;
        if (currentEducationIndex === null) {
          result = await addEducation(user.id, currentEducation);
        } else {
          result = await updateEducation(
            user.id,
            currentEducationIndex,
            currentEducation,
          );
        }

        if (result.success) {
          setEducations(result.data);
          toast({
            title: "Success",
            description:
              currentEducationIndex === null
                ? "Education added successfully"
                : "Education updated successfully",
            variant: "success",
          });
          closeDrawer();
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error("Error saving education:", error);
        toast({
          title: "Error",
          description: "Failed to save education",
          variant: "destructive",
        });
      }
    });
  };

  const handleDelete = async (index) => {
    startTransition(async () => {
      try {
        const result = await deleteEducation(user.id, index);
        if (result.success) {
          setEducations(result.data);
          toast({
            title: "Success",
            description: "Education deleted successfully",
            variant: "success",
          });
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error("Error deleting education:", error);
        toast({
          title: "Error",
          description: "Failed to delete education",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div className="w-full flex justify-between items-center">
          <CardTitle className="text-start text-2xl font-semibold text-main">
            {t("education.title")}
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
              <DrawerHeader className={"w-11/12 mx-auto"}>
                <DrawerTitle>
                  {currentEducationIndex !== null
                    ? t("education.editEducation")
                    : t("education.addEducation")}
                </DrawerTitle>
              </DrawerHeader>
              <div className="p-2 w-11/12 mx-auto">
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div className="space-y-2 mt-3">
                    <div>
                      <Label className="text-main">
                        {t("education.degree")}
                      </Label>
                      <Input
                        value={currentEducation.degree}
                        onChange={(e) => handleChange("degree", e.target.value)}
                        placeholder={t("education.degreePlaceholder")}
                        className="border-[#3B51A3] focus:ring-[#3B51A3]"
                      />
                    </div>
                    <div>
                      <Label className="text-main">
                        {t("education.institution")}
                      </Label>
                      <Input
                        value={currentEducation.institution}
                        onChange={(e) =>
                          handleChange("institution", e.target.value)
                        }
                        placeholder={t("education.institutionPlaceholder")}
                        className="border-[#3B51A3] focus:ring-[#3B51A3]"
                      />
                    </div>
                  </div>
                  <FlatDatePicker
                    value={currentEducation.graduationDate}
                    onChange={(value) => handleChange("graduationDate", value)}
                    label={t("education.graduationDate")}
                  />
                </div>
              </div>
              <DrawerFooter className="pt-2">
                <div className="flex justify-end items-center gap-2">
                  <Button
                    onClick={saveEducation}
                    disabled={isSaving}
                    className="bg-[#3B51A3] hover:bg-white hover:text-black"
                  >
                    {isSaving ? <Spinner /> : t("education.save")}
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

      <CardContent className="p-3 ">
        {educations.length > 0 ? (
          educations.map((edu, index) => (
            <div
              key={index}
              className="space-y-4 relative border-b pb-2 last:border-b-0"
            >
              <h3 className="text-lg font-semibold text-main">
                {edu.degree} at {edu.institution}
              </h3>
              <p>
                {t("education.graduationDate")}:{" "}
                {formatDate(edu.graduationDate)}
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
          <p className="text-gray-500">{t("education.noEducation")}</p>
        )}
      </CardContent>
    </Card>
  );
}
