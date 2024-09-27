"use client";
import { useTranslation } from "@/app/i18n/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import DatePicker from "../component/datePicker";

export default function EducationForm({ educations, updateData, lng }) {
  const { t } = useTranslation(lng, "forms"); // Initialize the translation hook

  const handleEducationChange = (index, field, value) => {
    updateData({
      type: "UPDATE",
      path: ["educations", index, field],
      value: value,
    });
  };

  const addEducation = () => {
    updateData({
      type: "ADD",
      path: ["educations"],
      value: { degree: "", institution: "", graduationDate: "" },
    });
  };

  const deleteEducation = (index) => {
    updateData({
      type: "REMOVE",
      path: ["educations"],
      index: index,
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#20133E]">
          {t("education")} {/* Translation for 'Education' */}
        </h2>
        {educations.map((edu, index) => (
          <div key={index} className="mb-4 p-4 rounded relative">
            <div className="absolute top-0 right-0 mt-2 mr-2">
              <Button
                onClick={() => deleteEducation(index)}
                size="icon"
                variant="ghost"
                className="ml-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-2 mt-8">
              <div>
                <Label htmlFor={`degree-${index}`} className="text-[#20133E]">
                  {t("degree")} {/* Translation for 'Degree' */}
                </Label>
                <Input
                  id={`degree-${index}`}
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(index, "degree", e.target.value)
                  }
                  placeholder={t("degreePlaceholder")}
                  className="border-[#3B51A3] focus:ring-[#3B51A3]"
                />
              </div>
              <div>
                <Label
                  htmlFor={`institution-${index}`}
                  className="text-[#20133E]"
                >
                  {t("institution")} {/* Translation for 'Institution' */}
                </Label>
                <Input
                  id={`institution-${index}`}
                  value={edu.institution}
                  onChange={(e) =>
                    handleEducationChange(index, "institution", e.target.value)
                  }
                  placeholder={t("institutionPlaceholder")}
                  className="border-[#3B51A3] focus:ring-[#3B51A3]"
                />
              </div>
            </div>
            <div>
              <DatePicker
                value={edu.graduationDate}
                onChange={(value) =>
                  handleEducationChange(index, "graduationDate", value)
                }
                label={t("graduationDate")}
              />
            </div>
          </div>
        ))}
        <Button
          onClick={addEducation}
          className="mt-2 bg-[#3B51A3] hover:bg-white hover:text-black"
        >
          <Plus className="h-4 w-4 mr-2" /> {t("addEducation")}
        </Button>
      </CardContent>
    </Card>
  );
}
