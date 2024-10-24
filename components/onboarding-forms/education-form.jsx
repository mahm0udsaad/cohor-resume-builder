import { useTranslation } from "@/app/i18n/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import DatePicker from "../component/datePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function EducationForm({ educations, updateData, lng }) {
  const { t } = useTranslation(lng, "forms");

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
      value: {
        degree: "",
        institution: "",
        graduationDate: "",
        gpaType: "none",
        numericGpa: "",
        descriptiveGpa: "",
      },
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
    <div className="p-4">
      {educations.map((edu, index) => (
        <div
          style={{ direction: lng === "ar" ? "rtl" : "ltr" }}
          key={index}
          className="mb-4 p-4 rounded relative"
        >
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
              <Label htmlFor={`degree-${index}`} className="text-main">
                {t("degree")}
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
              <Label htmlFor={`institution-${index}`} className="text-main">
                {t("institution")}
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
          <div className="mb-4">
            <DatePicker
              value={edu.graduationDate}
              onChange={(value) =>
                handleEducationChange(index, "graduationDate", value)
              }
              label={t("graduationDate")}
            />
          </div>
          <div className="space-y-2">
            <Label>
              {t("education.gpa")} ({t("education.optional")})
            </Label>
            <RadioGroup
              style={{ direction: lng === "ar" ? "rtl" : "ltr" }}
              className={`flex gap-4`}
              value={edu.gpaType}
              onValueChange={(value) =>
                handleEducationChange(index, "gpaType", value)
              }
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="none" id={`gpa-none-${index}`} />
                <Label htmlFor={`gpa-none-${index}`}>
                  {t("education.noGpa")}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="numeric" id={`gpa-numeric-${index}`} />
                <Label htmlFor={`gpa-numeric-${index}`}>
                  {t("education.numericGpa")}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="descriptive"
                  id={`gpa-descriptive-${index}`}
                />
                <Label htmlFor={`gpa-descriptive-${index}`}>
                  {t("education.descriptiveGpa")}
                </Label>
              </div>
            </RadioGroup>
          </div>
          {edu.gpaType === "numeric" && (
            <div className="space-y-2 mt-2">
              <Label htmlFor={`numericGpa-${index}`}>
                {t("education.numericGpa")}
              </Label>
              <Input
                id={`numericGpa-${index}`}
                type="number"
                step="0.1"
                min="0"
                max="4.0"
                placeholder={t("education.numericGpaPlaceholder")}
                value={edu.numericGpa}
                onChange={(e) =>
                  handleEducationChange(index, "numericGpa", e.target.value)
                }
                className="border-[#3B51A3] focus:ring-[#3B51A3]"
              />
            </div>
          )}
          {edu.gpaType === "descriptive" && (
            <div className="space-y-2 mt-2">
              <Label htmlFor={`descriptiveGpa-${index}`}>
                {t("education.descriptiveGpa")}
              </Label>
              <Select
                value={edu.descriptiveGpa}
                onValueChange={(value) =>
                  handleEducationChange(index, "descriptiveGpa", value)
                }
              >
                <SelectTrigger
                  id={`descriptiveGpa-${index}`}
                  className="border-[#3B51A3] focus:ring-[#3B51A3]"
                >
                  <SelectValue placeholder={t("education.selectGpa")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">
                    {t("education.excellent")}
                  </SelectItem>
                  <SelectItem value="very-good">
                    {t("education.veryGood")}
                  </SelectItem>
                  <SelectItem value="good">{t("education.good")}</SelectItem>
                  <SelectItem value="average">
                    {t("education.average")}
                  </SelectItem>
                  <SelectItem value="below-average">
                    {t("education.belowAverage")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      ))}
      <Button
        onClick={addEducation}
        className="mt-2 bg-[#3B51A3] hover:bg-white hover:text-black"
      >
        <Plus className="h-4 w-4 mr-2" /> {t("addEducation")}
      </Button>
    </div>
  );
}
