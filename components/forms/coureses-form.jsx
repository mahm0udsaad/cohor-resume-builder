import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import DatePicker from "../component/datePicker";
import { useTranslation } from "@/app/i18n/client";

export default function CoursesForm({ courses, updateData, lng }) {
  const [showCourses, setShowCourses] = useState(!!courses?.length);
  const { t } = useTranslation(lng, "forms");

  const handleCourseChange = (index, field, value) => {
    updateData({
      type: "UPDATE",
      path: ["courses", index, field],
      value: value,
    });
  };

  const addCourse = () => {
    updateData({
      type: "ADD",
      path: ["courses"],
      value: { name: "", institution: "", completionDate: "" },
    });
  };

  const deleteCourse = (index) => {
    updateData({
      type: "REMOVE",
      path: ["courses"],
      index: index,
    });
  };

  return (
    <div>
      {/* <Button
        onClick={() => setShowCourses(!showCourses)}
        className="mr-2 bg-gray-50 text-black hover:bg-white "
      >
        {showCourses
          ? t("reviewResume.hideCourses")
          : t("reviewResume.addCourses")}
      </Button> */}
      {showCourses && (
        <div className="p-4">
          <h3 className="text-xl font-semibold text-black">
            {t("reviewResume.coursesTitle")}
          </h3>
          {courses.map((course, index) => (
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
                  <Label htmlFor={`courseName-${index}`} className="text-black">
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
                    className="text-black"
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
            className="mt-2 bg-gray-50 text-black hover:bg-white "
          >
            <Plus className="h-4 w-4 mr-2" /> {t("reviewResume.addCourse")}
          </Button>
        </div>
      )}
    </div>
  );
}
