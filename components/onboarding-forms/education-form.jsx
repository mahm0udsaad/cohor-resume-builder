import { useFieldArray, Controller, useWatch } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DatePicker from "@/components/component/datePicker";

export default function EducationForm({ control, formData, errors, t }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  const watchedEducations = useWatch({ control, name: "educations" }) || [];

  if (fields.length === 0) {
    formData.forEach((experience) => {
      append({
        degree: experience.degree,
        institution: experience.institution,
        graduationDate: experience.graduationDate,
        gpaType: experience.gpaType,
        numericGpa: experience.numericGpa,
        descriptiveGpa: experience.descriptiveGpa,
      });
    });
  }

  // Custom handler for GPA type changes
  const handleGpaTypeChange = (index, onChange, value) => {
    onChange(value);
    // Clear both GPA fields when changing type
    const updatedEducations = [...control._formValues.educations];
    updatedEducations[index] = {
      ...updatedEducations[index],
      numericGpa: "",
      descriptiveGpa: "",
    };
    control._formValues.educations = updatedEducations;
  };

  const renderGpaInput = (index, gpaType) => {
    if (gpaType === "percentage") {
      return (
        <div className="space-y-2">
          <Label htmlFor={`numericGpa-${index}`}>
            {t("education.gpaPercentage")}
          </Label>
          <div className="relative">
            <Controller
              name={`educations.${index}.numericGpa`}
              control={control}
              defaultValue={formData?.[index]?.numericGpa || ""}
              render={({ field }) => (
                <Input
                  {...field}
                  id={`numericGpa-${index}`}
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  placeholder={t("education.gpaPercentagePlaceholder")}
                  className="pr-8"
                />
              )}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              %
            </span>
          </div>
        </div>
      );
    } else if (gpaType === "outOf4" || gpaType === "outOf5") {
      const maxValue = gpaType === "outOf4" ? 4 : 5;
      return (
        <div className="space-y-2">
          <Label htmlFor={`numericGpa-${index}`}>
            {t(`education.${gpaType}`)}
          </Label>
          <div className="relative">
            <Controller
              name={`educations.${index}.numericGpa`}
              control={control}
              defaultValue={formData?.[index]?.numericGpa || ""}
              render={({ field }) => (
                <Input
                  {...field}
                  id={`numericGpa-${index}`}
                  type="number"
                  step="0.1"
                  min="0"
                  max={maxValue}
                  placeholder={`Enter GPA (0-${maxValue})`}
                  className="pr-12"
                />
              )}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              /{maxValue}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 bg-gray-50 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-[#3b51a3]">
              {t("education.title")} {index + 1}
            </h3>
            <Button
              type="button"
              onClick={() => remove(index)}
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700"
              disabled={fields.length === 1}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`degree-${index}`}>{t("education.degree")}</Label>
              <Controller
                name={`educations.${index}.degree`}
                control={control}
                defaultValue={formData?.[index]?.degree || ""}
                rules={{ required: t("required") }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id={`degree-${index}`}
                    placeholder={t("education.degreePlaceholder")}
                    className="mt-1"
                  />
                )}
              />
              {errors.educations?.[index]?.degree && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.educations[index].degree.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor={`institution-${index}`}>
                {t("education.institution")}
              </Label>
              <Controller
                name={`educations.${index}.institution`}
                control={control}
                defaultValue={formData?.[index]?.institution || ""}
                rules={{ required: t("required") }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id={`institution-${index}`}
                    placeholder={t("education.institutionPlaceholder")}
                    className="mt-1"
                  />
                )}
              />
              {errors.educations?.[index]?.institution && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.educations[index].institution.message}
                </p>
              )}
            </div>
          </div>

          <Controller
            name={`educations.${index}.graduationDate`}
            control={control}
            defaultValue={formData?.[index]?.graduationDate || ""}
            render={({ field }) => (
              <DatePicker label={t("education.graduationDate")} {...field} />
            )}
          />

          <div className="space-y-2">
            <Label>
              {t("education.gpa")} ({t("education.optional")})
            </Label>
            <Controller
              name={`educations.${index}.gpaType`}
              control={control}
              defaultValue={formData?.[index]?.gpaType || "none"}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={(value) =>
                    handleGpaTypeChange(index, field.onChange, value)
                  }
                  defaultValue={field.value}
                  className="flex gap-4 flex-wrap"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="none" id={`gpa-none-${index}`} />
                    <Label htmlFor={`gpa-none-${index}`}>
                      {t("education.noGpa")}
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem
                      value="percentage"
                      id={`gpa-percentage-${index}`}
                    />
                    <Label htmlFor={`gpa-percentage-${index}`}>
                      {t("education.gpaPercentage")}
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="outOf4" id={`gpa-outOf4-${index}`} />
                    <Label htmlFor={`gpa-outOf4-${index}`}>
                      {t("education.gpaOutOf4")}
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="outOf5" id={`gpa-outOf5-${index}`} />
                    <Label htmlFor={`gpa-outOf5-${index}`}>
                      {t("education.gpaOutOf5")}
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          {renderGpaInput(index, watchedEducations[index]?.gpaType)}
        </div>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({
            degree: "",
            institution: "",
            graduationDate: "",
            gpaType: "none",
            numericGpa: "",
            descriptiveGpa: "",
          })
        }
        className="w-full mt-4 bg-main"
      >
        <Plus className="w-5 h-5 mr-2" />
        {t("education.addEducation")}
      </Button>
    </div>
  );
}
