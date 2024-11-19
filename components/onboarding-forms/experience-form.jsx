import { useFieldArray, Controller, useWatch } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "@/components/component/datePicker";

export default function WorkExperienceForm({ control, formData, errors, t }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });
  console.log(fields);

  if (fields.length === 0) {
    formData.forEach((experience) => {
      append({
        jobTitle: experience.jobTitle || "",
        company: experience.company || "",
        startDate: experience.startDate || "",
        endDate: experience.endDate || "",
        isCurrentJob: experience.isCurrentJob || false,
        responsibilities: experience.responsibilities || "",
      });
    });
  }

  const watchedExperiences = useWatch({
    control,
    name: "experiences",
    defaultValue: formData,
  });

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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`jobTitle-${index}`}>
                {t("workExperience.jobTitle")}
              </Label>
              <Controller
                name={`experiences.${index}.jobTitle`}
                control={control}
                defaultValue={formData?.[index]?.jobTitle}
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
                defaultValue={formData?.[index]?.company}
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
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name={`experiences.${index}.startDate`}
              control={control}
              defaultValue={formData?.[index]?.startDate || ""}
              render={({ field }) => (
                <DatePicker
                  label={t("workExperience.startDate")}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {!watchedExperiences[index]?.isCurrentJob && (
              <Controller
                name={`experiences.${index}.endDate`}
                control={control}
                defaultValue={formData?.[index]?.endDate || ""}
                render={({ field }) => (
                  <DatePicker
                    label={t("workExperience.endDate")}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={watchedExperiences[index]?.isCurrentJob}
                  />
                )}
              />
            )}
          </div>
          <div>
            <Controller
              name={`experiences.${index}.isCurrentJob`}
              control={control}
              defaultValue={formData?.[index]?.isCurrentJob || false}
              render={({ field: { onChange, value } }) => (
                <div className="flex items-center gap-2 mt-6">
                  <Checkbox
                    id={`isCurrentJob-${index}`}
                    checked={value}
                    onCheckedChange={(checked) => {
                      onChange(checked);
                      if (checked) {
                        const fieldName = `experiences.${index}.endDate`;
                        const fieldValue = "";
                        control._fields[fieldName]?.onChange(fieldValue);
                      }
                    }}
                  />
                  <Label htmlFor={`isCurrentJob-${index}`}>
                    {t("workExperience.endDatePresent")}
                  </Label>
                </div>
              )}
            />
          </div>
          <div>
            <Label htmlFor={`responsibilities-${index}`}>
              {t("workExperience.responsibilities")}
            </Label>
            <Controller
              name={`experiences.${index}.responsibilities`}
              control={control}
              defaultValue={formData?.[index]?.responsibilities || ""}
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
            isCurrentJob: false,
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
