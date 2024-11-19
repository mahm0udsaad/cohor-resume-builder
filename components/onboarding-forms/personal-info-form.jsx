import { Controller } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function PersonalInfoForm({ control, formData, errors, t }) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">{t("personalInfo.fullName")}</Label>
          <Controller
            name="name"
            defaultValue={formData?.name || ""}
            control={control}
            rules={{ required: t("required") }}
            render={({ field }) => (
              <Input
                {...field}
                id="name"
                placeholder={t("personalInfo.fullNamePlaceholder")}
                className="mt-1"
              />
            )}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="jobTitle">{t("personalInfo.jobTitle")}</Label>
          <Controller
            name="jobTitle"
            defaultValue={formData?.jobTitle || ""}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="jobTitle"
                placeholder={t("personalInfo.jobTitlePlaceholder")}
                className="mt-1"
              />
            )}
          />
        </div>

        <Controller
          name="contact"
          control={control}
          defaultValue={formData?.contact}
          render={({ field: { onChange, value } }) => (
            <>
              {value.map((contact, index) => (
                <div
                  key={index}
                  className={
                    index === value.length - 1 && index % 2 === 0
                      ? "col-span-2"
                      : ""
                  }
                >
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Label>
                        {index === 0
                          ? t("personalInfo.phone")
                          : index === 1
                          ? t("personalInfo.email")
                          : t("personalInfo.contact")}
                      </Label>
                      <Input
                        value={contact}
                        onChange={(e) => {
                          const newContacts = [...value];
                          newContacts[index] = e.target.value;
                          onChange(newContacts);
                        }}
                        name={index === 1 ? "email" : undefined}
                        type={index === 1 ? "email" : "text"}
                        placeholder={
                          index === 0
                            ? t("personalInfo.phonePlaceholder")
                            : index === 1
                            ? t("personalInfo.emailPlaceholder")
                            : t("personalInfo.contactPlaceholder")
                        }
                      />
                    </div>
                    {index > 1 && (
                      <Button
                        type="button"
                        onClick={() => {
                          const newContacts = value.filter(
                            (_, i) => i !== index,
                          );
                          onChange(newContacts);
                        }}
                        variant="ghost"
                        size="icon"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">
                          {t("personalInfo.removeContact")}
                        </span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              {value.length < 5 && (
                <div className={value.length % 2 === 0 ? "col-span-2" : ""}>
                  <Button
                    type="button"
                    onClick={() => onChange([...value, ""])}
                    variant="outline"
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t("personalInfo.addContact")}
                  </Button>
                </div>
              )}
            </>
          )}
        />
      </div>

      <div>
        <Label htmlFor="summary">{t("personalInfo.summary")}</Label>
        <Controller
          name="summary"
          defaultValue={formData?.summary || ""}
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              id="summary"
              rows={4}
              placeholder={t("personalInfo.summaryPlaceholder")}
              className="mt-1"
            />
          )}
        />
      </div>
    </div>
  );
}
