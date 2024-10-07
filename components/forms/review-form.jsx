import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import DatePicker from "../component/datePicker";
import { useTranslation } from "@/app/i18n/client";
import { useRouter } from "next/navigation";
import { updateUserResumeData } from "@/actions/resumes";
import { useSession } from "next-auth/react";
export default function ReviewForm({
  resumeData,
  updateData,
  resumeName,
  theme,
  lng,
}) {
  const [showLanguages, setShowLanguages] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const { t } = useTranslation(lng, "forms");
  const router = useRouter();
  const { data: session } = useSession();
  const user = session.user;
  const languageProficiencyOptions = ["Beginner", "Intermediate", "Advanced"];

  const handleLanguageChange = (index, field, value) => {
    updateData({
      type: "UPDATE",
      path: ["languages", index, field],
      value: value,
    });
  };

  const handleCourseChange = (index, field, value) => {
    updateData({
      type: "UPDATE",
      path: ["courses", index, field],
      value: value,
    });
  };

  const addLanguage = () => {
    updateData({
      type: "ADD",
      path: ["languages"],
      value: { name: "", proficiency: "" },
    });
  };

  const addCourse = () => {
    updateData({
      type: "ADD",
      path: ["courses"],
      value: { name: "", institution: "", completionDate: "" },
    });
  };

  const deleteLanguage = (index) => {
    updateData({
      type: "REMOVE",
      path: ["languages"],
      index: index,
    });
  };

  const deleteCourse = (index) => {
    updateData({
      type: "REMOVE",
      path: ["courses"],
      index: index,
    });
  };

  const handleReview = async () => {
    setLoading(true);
    try {
      // Construct the resume data, excluding the theme if it's null or undefined
      const updatedResumeData = {
        ...resumeData,
        ...(theme
          ? {
              theme: {
                name: theme.name,
                primaryColor: theme.primaryColor,
                backgroundColor: theme.backgroundColor,
              },
            }
          : {}), // Do not include theme if it's null or undefined
      };
  
      // Call the updateUserResumeData function with the updated resume data
      await updateUserResumeData(user.email, resumeName, updatedResumeData);
      setLoading(false);
    } finally {
      router.push(`/review/${resumeName}`);
    }
  };
  

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#20133E]">
          {t("reviewResume.title")}
        </h2>
        <div className="mb-4">
          <Button
            onClick={() => setShowLanguages(!showLanguages)}
            className="mr-2 bg-[#3B51A3] hover:bg-white hover:text-black"
          >
            {showLanguages
              ? t("reviewResume.hideLanguages")
              : t("reviewResume.addLanguages")}
          </Button>
          <Button
            onClick={() => setShowCourses(!showCourses)}
            className="mr-2 bg-[#3B51A3] hover:bg-white hover:text-black"
          >
            {showCourses
              ? t("reviewResume.hideCourses")
              : t("reviewResume.addCourses")}
          </Button>
        </div>
        {showLanguages && (
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4 text-[#20133E]">
              {t("reviewResume.languagesTitle")}
            </h3>
            {resumeData?.languages.map((lang, index) => (
              <div key={index} className="mb-4 rounded relative">
                <div className="flex gap-4 mb-2 mt-8">
                  <div className="flex w-full">
                    <div className="flex-1 pr-4 ">
                      <Label
                        htmlFor={`languageName-${index}`}
                        className="text-[#20133E]"
                      >
                        {t("reviewResume.language")}
                      </Label>
                      <Input
                        id={`languageName-${index}`}
                        value={lang.name}
                        onChange={(e) =>
                          handleLanguageChange(index, "name", e.target.value)
                        }
                        placeholder={t("reviewResume.languagePlaceholder")}
                        className="border-[#3B51A3] focus:ring-[#3B51A3]"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor={`languageProficiency-${index}`}
                        className="text-[#20133E]"
                      >
                        {t("reviewResume.proficiency")}
                      </Label>
                      <Select
                        value={lang.proficiency}
                        onValueChange={(value) =>
                          handleLanguageChange(index, "proficiency", value)
                        }
                      >
                        <SelectTrigger className="border-[#3B51A3] focus:ring-[#3B51A3]">
                          <SelectValue
                            placeholder={t("reviewResume.selectProficiency")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {languageProficiencyOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col h-full justify-center items-center mt-[1.3rem]">
                    <Button
                      onClick={() => deleteLanguage(index)}
                      size="icon"
                      variant="ghost"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button
              onClick={addLanguage}
              className="mt-2 bg-[#3B51A3] hover:bg-white hover:text-black"
            >
              <Plus className="h-4 w-4 mr-2" /> {t("reviewResume.addLanguage")}
            </Button>
          </div>
        )}

        {showCourses && (
          <>
            <h3 className="text-xl font-semibold text-[#20133E]">
              {t("reviewResume.coursesTitle")}
            </h3>
            {resumeData?.courses.map((course, index) => (
              <div key={index} className="flex flex-col mb-4 p-4 rounded ">
                <div className="flex w-full items-center justify-end ">
                  <Button
                    onClick={() => deleteCourse(index)}
                    size="icon"
                    variant="ghost"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor={`courseName-${index}`}
                      className="text-[#20133E]"
                    >
                      {t("reviewResume.courseName")}
                    </Label>
                    <Input
                      id={`courseName-${index}`}
                      value={course.name}
                      onChange={(e) =>
                        handleCourseChange(index, "name", e.target.value)
                      }
                      placeholder={t("reviewResume.courseNamePlaceholder")}
                      className="border-[#3B51A3] focus:ring-[#3B51A3]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor={`institution-${index}`}
                      className="text-[#20133E]"
                    >
                      {t("reviewResume.institution")}
                    </Label>
                    <Input
                      id={`institution-${index}`}
                      value={course.institution}
                      onChange={(e) =>
                        handleCourseChange(index, "institution", e.target.value)
                      }
                      placeholder={t("reviewResume.institutionPlaceholder")}
                      className="border-[#3B51A3] focus:ring-[#3B51A3]"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <Label
                    htmlFor={`completionDate-${index}`}
                    className="text-[#20133E]"
                  >
                    {t("reviewResume.completionDate")}
                  </Label>
                  <DatePicker
                    value={course.completionDate}
                    onChange={(value) =>
                      handleCourseChange(index, "completionDate", value)
                    }
                    label={t("reviewResume.graduationDate")}
                  />
                </div>
              </div>
            ))}
            <Button
              onClick={addCourse}
              className="mt-2 bg-[#3B51A3] hover:bg-white hover:text-black"
            >
              <Plus className="h-4 w-4 mr-2" /> {t("reviewResume.addCourse")}
            </Button>
          </>
        )}

        <div className="mt-6">
          <Button
            onClick={handleReview}
            disabled={isLoading}
            className="w-full bg-[#3B51A3] hover:bg-white hover:text-black"
          >
            {isLoading ? "Loading..." : t("reviewResume.downloadPDF")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
