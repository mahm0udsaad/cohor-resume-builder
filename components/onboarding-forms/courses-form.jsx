import { useFieldArray, Controller } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/component/datePicker";

export default function CoursesForm({ control, errors, t }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });
  if (fields.length === 0) {
    append({ name: "", institution: "", completionDate: "" });
  }
  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 bg-gray-50 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-[#3b51a3]">
              {t("reviewResume.coursesTitle")} {index + 1}
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
            <Label htmlFor={`courseName-${index}`}>
              {t("reviewResume.courseName")}
            </Label>
            <Controller
              name={`reviewResume.${index}.name`}
              control={control}
              rules={{ required: t("required") }}
              render={({ field }) => (
                <Input
                  {...field}
                  id={`courseName-${index}`}
                  placeholder={t("reviewResume.courseNamePlaceholder")}
                  className="mt-1"
                />
              )}
            />
            {errors.courses?.[index]?.name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.courses[index].name.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor={`institution-${index}`}>
              {t("reviewResume.institution")}
            </Label>
            <Controller
              name={`reviewResume.${index}.institution`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id={`institution-${index}`}
                  placeholder={t("reviewResume.institutionPlaceholder")}
                  className="mt-1"
                />
              )}
            />
          </div>
          <Controller
            name={`reviewResume.${index}.completionDate`}
            control={control}
            render={({ field }) => (
              <DatePicker label={t("reviewResume.completionDate")} {...field} />
            )}
          />
        </div>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({ name: "", institution: "", completionDate: "" })
        }
        className="w-full mt-4 bg-main"
      >
        <Plus className="w-5 h-5 mr-2" />
        {t("reviewResume.addCourse")}
      </Button>
    </div>
  );
}
