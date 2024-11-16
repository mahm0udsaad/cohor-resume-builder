import { useFieldArray, Controller, useWatch, useForm } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "../component/flat-date-picker";
import { parseISO, format } from "date-fns";

export default function WorkExperienceForm({ control, errors, t }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const { setValue } = useForm({ control });

  if (fields.length === 0) {
    append({
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      responsibilities: "",
    });
  }

  const watchedExperiences = useWatch({
    control,
    name: "experiences",
    defaultValue: [],
  });

  const handleDateChange = (index, field, value) => {
    // If value is empty or "Present", set it directly
    if (!value || value === "Present") {
      setValue(`experiences.${index}.${field}`, value);
      return;
    }

    try {
      // Ensure the value is a valid date string in ISO format
      const date = typeof value === "string" ? parseISO(value) : value;
      const formattedDate = format(date, "yyyy-MM-dd");
      setValue(`experiences.${index}.${field}`, formattedDate);
    } catch (error) {
      console.error(`Error formatting date for ${field}:`, error);
      setValue(`experiences.${index}.${field}`, "");
    }
  };

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 bg-gray-50 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-[#3b51a3]">
              {t("workExperience.title")} {index + 1}
            </h3>
            <Button
              type="button"
              onClick={() => remove(index)}
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Job Title and Company fields remain the same */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`jobTitle-${index}`}>
                {t("workExperience.jobTitle")}
              </Label>
              <Controller
                name={`experiences.${index}.jobTitle`}
                control={control}
                rules={{ required: t("required") }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id={`jobTitle-${index}`}
                    placeholder={t("workExperience.jobTitlePlaceholder")}
                    className="mt-1"
                  />
                )}
              />
              {errors.experiences?.[index]?.jobTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.experiences[index].jobTitle.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor={`company-${index}`}>
                {t("workExperience.company")}
              </Label>
              <Controller
                name={`experiences.${index}.company`}
                control={control}
                rules={{ required: t("required") }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id={`company-${index}`}
                    placeholder={t("workExperience.companyPlaceholder")}
                    className="mt-1"
                  />
                )}
              />
              {errors.experiences?.[index]?.company && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.experiences[index].company.message}
                </p>
              )}
            </div>
          </div>

          {/* Updated Date fields */}
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name={`experiences.${index}.startDate`}
              control={control}
              render={({ field }) => (
                <DatePicker
                  label={t("workExperience.startDate")}
                  value={field.value}
                  onChange={(date) =>
                    handleDateChange(index, "startDate", date)
                  }
                />
              )}
            />
            {!watchedExperiences[index]?.currentlyWorking && (
              <Controller
                name={`experiences.${index}.endDate`}
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label={t("workExperience.endDate")}
                    value={field.value}
                    onChange={(date) =>
                      handleDateChange(index, "endDate", date)
                    }
                  />
                )}
              />
            )}
          </div>

          {/* Currently Working checkbox */}
          <div>
            <Controller
              name={`experiences.${index}.currentlyWorking`}
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-2 mt-6">
                  <Checkbox
                    id={`currentlyWorking-${index}`}
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      if (checked) {
                        handleDateChange(index, "endDate", "Present");
                      } else {
                        handleDateChange(index, "endDate", "");
                      }
                    }}
                  />
                  <Label htmlFor={`currentlyWorking-${index}`}>
                    {t("workExperience.endDatePresent")}
                  </Label>
                </div>
              )}
            />
          </div>

          {/* Responsibilities field */}
          <div>
            <Label htmlFor={`responsibilities-${index}`}>
              {t("workExperience.responsibilities")}
            </Label>
            <Controller
              name={`experiences.${index}.responsibilities`}
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id={`responsibilities-${index}`}
                  placeholder={t("workExperience.responsibilitiesPlaceholder")}
                  className="mt-1"
                  rows={4}
                />
              )}
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        onClick={() =>
          append({
            jobTitle: "",
            company: "",
            startDate: "",
            endDate: "",
            responsibilities: "",
            currentlyWorking: false,
          })
        }
        className="w-full mt-4"
      >
        <Plus className="w-5 h-5 mr-2" />
        {t("workExperience.addExperience")}
      </Button>
    </div>
  );
}
