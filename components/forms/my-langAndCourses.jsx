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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Plus, Trash } from "lucide-react";
import { useTranslation } from "@/app/i18n/client";
import FlatDatePicker from "../component/flat-date-picker";
import {
  addLanguage,
  updateLanguage,
  deleteLanguage,
  addCourse,
  updateCourse,
  deleteCourse,
} from "@/actions/userInfo/languages-couses";
import Spinner from "../skeleton/spinner";

const languageProficiencyOptions = ["Beginner", "Intermediate", "Advanced"];

export default function LanguageAndCourseCard({ user, lng }) {
  const { t } = useTranslation(lng, "forms");
  const [isSaving, startTransition] = useTransition();
  const [languages, setLanguages] = useState(user.languages || []);
  const [courses, setCourses] = useState(user.courses || []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState(null); // 'language' or 'course'
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const openDrawer = (type, index) => {
    setDrawerType(type);
    if (index !== undefined) {
      setCurrentItem(type === "language" ? languages[index] : courses[index]);
      setCurrentIndex(index);
    } else {
      setCurrentItem(
        type === "language"
          ? { name: "", proficiency: "" }
          : { name: "", institution: "", completionDate: "" },
      );
      setCurrentIndex(null);
    }
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setCurrentItem(null);
    setCurrentIndex(null);
    setDrawerType(null);
  };

  const handleChange = (field, value) => {
    setCurrentItem((prev) => ({ ...prev, [field]: value }));
  };

  const saveItem = async () => {
    startTransition(async () => {
      try {
        if (drawerType === "language") {
          if (currentIndex === null) {
            const updatedLanguages = await addLanguage(user.id, currentItem);
            setLanguages(updatedLanguages);
          } else {
            const updatedLanguages = await updateLanguage(
              user.id,
              currentIndex,
              currentItem,
            );
            setLanguages(updatedLanguages);
          }
        } else {
          if (currentIndex === null) {
            const updatedCourses = await addCourse(user.id, currentItem);
            setCourses(updatedCourses);
          } else {
            const updatedCourses = await updateCourse(
              user.id,
              currentIndex,
              currentItem,
            );
            setCourses(updatedCourses);
          }
        }
        closeDrawer();
      } catch (error) {
        console.error("Error saving:", error);
      }
    });
  };

  const handleDelete = async (type, index) => {
    startTransition(async () => {
      try {
        if (type === "language") {
          const updatedLanguages = await deleteLanguage(user.id, index);
          setLanguages(updatedLanguages);
        } else {
          const updatedCourses = await deleteCourse(user.id, index);
          setCourses(updatedCourses);
        }
      } catch (error) {
        console.error("Error deleting:", error);
      }
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Languages Card */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-xl font-semibold text-main">
            {t("reviewResume.languagesTitle")}
          </CardTitle>
          <Button
            onClick={() => openDrawer("language")}
            variant="ghost"
            className="border"
          >
            <Plus className="size-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {languages.map((lang, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 border-b last:border-b-0"
            >
              <div>
                <h4 className="font-medium">{lang.name}</h4>
                <p className="text-sm text-gray-600">
                  t[lang.proficiency.toLowerCase()]
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => openDrawer("language", index)}
                  className="bg-[#3B51A3] hover:bg-white hover:text-black"
                >
                  <Edit className="size-4" />
                </Button>
                <Button
                  onClick={() => handleDelete("language", index)}
                  disabled={isSaving}
                  variant="ghost"
                  className="bg-rose-500 text-white hover:bg-white hover:text-rose-500"
                >
                  {isSaving ? <Spinner /> : <Trash className="size-4" />}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Courses Card */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-xl font-semibold text-main">
            {t("reviewResume.coursesTitle")}
          </CardTitle>
          <Button
            onClick={() => openDrawer("course")}
            variant="ghost"
            className="border"
          >
            <Plus className="size-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {courses.map((course, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 border-b last:border-b-0"
            >
              <div>
                <h4 className="font-medium">{course.name}</h4>
                <p className="text-sm text-gray-600">{course.institution}</p>
                <p className="text-sm text-gray-500">
                  {new Date(course.completionDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => openDrawer("course", index)}
                  className="bg-[#3B51A3] hover:bg-white hover:text-black"
                >
                  <Edit className="size-4" />
                </Button>
                <Button
                  onClick={() => handleDelete("course", index)}
                  disabled={isSaving}
                  variant="ghost"
                  className="bg-rose-500 text-white hover:bg-white hover:text-rose-500"
                >
                  {isSaving ? <Spinner /> : <Trash className="size-4" />}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {currentIndex !== null
                ? t(
                    drawerType === "language"
                      ? "reviewResume.editLanguage"
                      : "reviewResume.editCourse",
                  )
                : t(
                    drawerType === "language"
                      ? "reviewResume.addLanguage"
                      : "reviewResume.addCourse",
                  )}
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            {drawerType === "language" ? (
              <div className="flex gap-4">
                <div>
                  <Label className="text-main">
                    {t("reviewResume.language")}
                  </Label>
                  <Input
                    value={currentItem?.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder={t("reviewResume.languagePlaceholder")}
                    className="border-[#3B51A3] focus:ring-[#3B51A3]"
                  />
                </div>
                <div>
                  <Label className="text-main">
                    {t("reviewResume.proficiency")}
                  </Label>
                  <Select
                    value={currentItem?.proficiency}
                    onValueChange={(value) =>
                      handleChange("proficiency", value)
                    }
                  >
                    <SelectTrigger className="border-[#3B51A3] focus:ring-[#3B51A3]">
                      <SelectValue
                        placeholder={t("reviewResume.proficiency")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {languageProficiencyOptions.map((level, idx) => (
                        <SelectItem key={idx} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-main">
                    {t("reviewResume.completionDate")}
                  </Label>
                  <FlatDatePicker
                    value={currentItem?.completionDate}
                    onChange={(date) =>
                      handleChange("completionDate", date || null)
                    }
                  />
                </div>
                <div className="">
                  <div className="space-y-2">
                    <Label className="text-main">
                      {t("reviewResume.courseName")}
                    </Label>
                    <Input
                      value={currentItem?.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder={t("reviewResume.courseNamePlaceholder")}
                      className="border-[#3B51A3] focus:ring-[#3B51A3]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-main">
                      {t("reviewResume.institution")}
                    </Label>
                    <Input
                      value={currentItem?.institution}
                      onChange={(e) =>
                        handleChange("institution", e.target.value)
                      }
                      placeholder={t("reviewResume.institutionPlaceholder")}
                      className="border-[#3B51A3] focus:ring-[#3B51A3]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <DrawerFooter>
            <div className="flex justify-end gap-4">
              <Button
                className="bg-[#3B51A3] hover:bg-white hover:text-black"
                onClick={saveItem}
                disabled={isSaving}
              >
                {isSaving ? <Spinner /> : t("save")}
              </Button>
              <Button
                variant="outline"
                className="border-2 border-[#3B51A3] hover:bg-white"
                onClick={closeDrawer}
              >
                {t("cancel")}
              </Button>
            </div>
          </DrawerFooter>
          <DrawerClose />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
