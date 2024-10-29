import { useFieldArray, Controller, useWatch } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DatePicker from "@/components/component/datePicker";

export default function EducationForm({ control, errors, t }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });
  const watchedEducations = useWatch({ control, name: "educations" }) || [];
  if (fields.length === 0) {
    append({
      degree: "",
      institution: "",
      graduationDate: "",
      gpaType: "none",
      numericGpa: "",
      descriptiveGpa: "",
    });
  }
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
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id={`gpa-none-${index}`} />
                    <Label htmlFor={`gpa-none-${index}`}>
                      {t("education.noGpa")}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="numeric"
                      id={`gpa-numeric-${index}`}
                    />
                    <Label htmlFor={`gpa-numeric-${index}`}>
                      {t("education.numericGpa")}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="descriptive"
                      id={`gpa-descriptive-${index}`}
                    />
                    <Label htmlFor={`gpa-descriptive-${index}`}>
                      {t("education.descriptiveGpa")}
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>
          {watchedEducations[index]?.gpaType === "numeric" && (
            <div className="space-y-2">
              <Label htmlFor={`numericGpa-${index}`}>
                {t("education.numericGpa")}
              </Label>
              <Controller
                name={`educations.${index}.numericGpa`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id={`numericGpa-${index}`}
                    type="number"
                    step="0.1"
                    min="0"
                    max="4.0"
                    placeholder={t("education.numericGpaPlaceholder")}
                    className="mt-1"
                  />
                )}
              />
            </div>
          )}
          {watchedEducations[index]?.gpaType === "descriptive" && (
            <div className="space-y-2">
              <Label htmlFor={`descriptiveGpa-${index}`}>
                {t("education.descriptiveGpa")}
              </Label>
              <Controller
                name={`educations.${index}.descriptiveGpa`}
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id={`descriptiveGpa-${index}`}>
                      <SelectValue placeholder={t("education.selectGpa")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">
                        {t("education.excellent")}
                      </SelectItem>
                      <SelectItem value="veryGood">
                        {t("education.veryGood")}
                      </SelectItem>
                      <SelectItem value="good">
                        {t("education.good")}
                      </SelectItem>
                      <SelectItem value="average">
                        {t("education.average")}
                      </SelectItem>
                      <SelectItem value="belowAverage">
                        {t("education.belowAverage")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          )}
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
