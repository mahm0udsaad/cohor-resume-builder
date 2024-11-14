import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import DatePicker from "../component/datePicker";
import { useTranslation } from "@/app/i18n/client";
import { Card, CardContent } from "@/components/ui/card";

export default function CoursesForm({ courses, updateData, lng }) {
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
    <Card className="">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-main">
          {t("reviewResume.coursesTitle")}
        </h3>

        {/* List of courses */}
        {courses.map((course, index) => (
          <div key={index} className="mb-6 p-4 ">
            <div className="flex justify-end">
              <Button
                onClick={() => deleteCourse(index)}
                size="icon"
                variant="ghost"
                className="text-gray-500 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Course Name Input */}
              <div>
                <Label htmlFor={`courseName-${index}`} className="text-main">
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

              {/* Institution Input */}
              <div>
                <Label htmlFor={`institution-${index}`} className="text-main">
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

            {/* Completion Date Picker */}
            <div className="mt-4">
              <DatePicker
                value={course.completionDate}
                onChange={(value) =>
                  handleCourseChange(index, "completionDate", value)
                }
                label={t("reviewResume.graduationDate")}
                className="w-full"
              />
            </div>
          </div>
        ))}

        {/* Button to Add New Course */}
        <Button
          onClick={addCourse}
          className="mt-4 bg-gray-50 text-black hover:bg-white"
        >
          <Plus className="h-4 w-4 mr-2" /> {t("reviewResume.addCourse")}
        </Button>
      </CardContent>
    </Card>
  );
}
