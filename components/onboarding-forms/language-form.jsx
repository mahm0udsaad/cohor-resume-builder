import { useFieldArray, Controller } from "react-hook-form";
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

const proficiencyLevels = ["Beginner", "Intermediate", "Advanced", "Native"];

export default function LanguagesForm({ control, errors, t }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });
  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 bg-gray-50 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-[#3b51a3]">
              {t("reviewResume.languagesTitle")} {index + 1}
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
          <div>
            <Label htmlFor={`languageName-${index}`}>
              {t("reviewResume.language")}
            </Label>
            <Controller
              name={`languages.${index}.name`}
              control={control}
              rules={{ required: t("reviewResume.required") }}
              render={({ field }) => (
                <Input
                  {...field}
                  id={`languageName-${index}`}
                  placeholder={t("reviewResume.languagePlaceholder")}
                  className="mt-1"
                />
              )}
            />
            {errors.languages?.[index]?.name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.languages[index].name.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor={`proficiency-${index}`}>
              {t("reviewResume.proficiency")}
            </Label>
            <Controller
              name={`languages.${index}.proficiency`}
              control={control}
              rules={{ required: t("reviewResume.required") }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id={`proficiency-${index}`} className="mt-1">
                    <SelectValue
                      placeholder={t("reviewResume.selectProficiency")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {proficiencyLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {t(`languages.${level}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.languages?.[index]?.proficiency && (
              <p className="mt-1 text-sm text-red-600">
                {errors.languages[index].proficiency.message}
              </p>
            )}
          </div>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => append({ name: "", proficiency: "" })}
        className="w-full mt-4 bg-main"
      >
        <Plus className="w-5 h-5 mr-2" />
        {t("reviewResume.addLanguage")}
      </Button>
    </div>
  );
}
