import { Controller } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function PersonalInfoForm({ control, errors, t }) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">{t("personalInfo.fullName")}</Label>
          <Controller
            name="name"
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
        <div>
          <Label htmlFor="phoneNumber">{t("personalInfo.phone")}</Label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="phoneNumber"
                placeholder={t("personalInfo.phonePlaceholder")}
              />
            )}
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <Controller
          name="contact"
          control={control}
          defaultValue={[""]}
          render={({ field: { onChange, value } }) => (
            <>
              {value.map((contact, index) => (
                <>
                  <div key={index} className="flex items-end">
                    <div className="flex-1">
                      <Label>{t("personalInfo.contact")}</Label>
                      <Input
                        value={contact}
                        onChange={(e) => {
                          const newContacts = [...value];
                          newContacts[index] = e.target.value;
                          onChange(newContacts);
                        }}
                        placeholder={t("personalInfo.contactPlaceholder")}
                      />
                    </div>
                    {index > 0 && (
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
                </>
              ))}
              {value.length < 5 && (
                <Button
                  type="button"
                  onClick={() => onChange([...value, ""])}
                  variant="outline"
                  className="col-span-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t("personalInfo.addContact")}
                </Button>
              )}
            </>
          )}
        />
      </div>

      {/* Phone Number and Contact Fields in Two-Column Layout */}

      <div>
        <Label htmlFor="summary">{t("personalInfo.summary")}</Label>
        <Controller
          name="summary"
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
