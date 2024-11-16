"use client";

import React, { useRef, useState, useTransition } from "react";
import {
  Briefcase,
  GraduationCap,
  Code,
  Languages as LanguagesIcon,
  Book,
  Edit,
  Plus,
  Trash2,
  Save,
  Phone,
  Mail,
  Globe,
  X,
  Loader2,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { saveOnboardingData } from "@/actions/userInfo/action";
import { useSession } from "next-auth/react";
import { useEditingContext } from "@/context/edit-context";
import { uploadToCloud } from "@/lib/cloud";
import Spinner from "../skeleton/spinner";
import { allSkills } from "@/data/data";
import { useTranslation } from "@/app/i18n/client";
import DatePicker from "@/components/component/datePicker";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
function SectionHeader({ icon: Icon, title }) {
  return (
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-2xl font-bold flex items-center">
        <Icon className="mx-2 h-6 w-6" />
        {title}
      </CardTitle>
    </CardHeader>
  );
}

export default function InformationTab({ lng, initialData, user }) {
  const { t } = useTranslation(lng, "forms");
  const [userInfo, setUserInfo] = useState(initialData);
  const { handleCancel, isEditing, handleEdit } = useEditingContext();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ defaultValues: userInfo });
  console.log("initialData", initialData);

  const onSubmit = (data) => {
    startTransition(async () => {
      setUserInfo(data);

      const result = await saveOnboardingData(user.email, data);
      if (result.success) {
        handleCancel();
        toast({
          title: t("notifications.profileUpdate.success.title"),
          description: t("notifications.profileUpdate.success.description"),
          variant: "success",
        });
      } else {
        toast({
          title: t("notifications.profileUpdate.error.title"),
          description: t("notifications.profileUpdate.error.description"),
          variant: "destructive",
        });
      }
    });
  };

  const handleReset = () => {
    reset(userInfo);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto p-6 space-y-8"
    >
      <div className="space-y-8">
        <PersonalInfo
          t={t}
          control={control}
          setValue={setValue}
          errors={errors}
          contacts={userInfo.personalInfo?.contact || []}
        />
        <ExperienceSection t={t} control={control} errors={errors} />
        <EducationSection
          t={t}
          control={control}
          errors={errors}
          setValue={setValue}
        />
        <div className="lg:flex gap-2 w-full">
          <SkillsSection t={t} control={control} errors={errors} />
          <LanguagesSection t={t} control={control} errors={errors} />
        </div>
        <CoursesSection t={t} control={control} errors={errors} />
      </div>
      <div className="sticky bottom-0 bg-background border-t border-border p-4 flex justify-between items-center">
        {isEditing ? (
          <Button type="button" variant="outline" onClick={handleReset}>
            {t("buttons.resetChanges")}
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={isEditing ? handleCancel : handleEdit}
          >
            {isEditing ? (
              <X className="h-4 w-4 mx-2" />
            ) : (
              <Edit className="h-4 w-4 mx-2" />
            )}
            {isEditing ? t("buttons.cancel") : t("buttons.editProfile")}
          </Button>
        )}
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          disabled={isPending || !isEditing}
        >
          {isPending ? (
            <>
              <Loader2 className="mx-2 h-4 w-4 animate-spin" />
              {t("buttons.saving")}
            </>
          ) : (
            <>
              <Save className="mx-2 h-4 w-4" />
              {t("buttons.saveAllChanges")}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function PersonalInfo({ t, control, contacts, setValue }) {
  const { isEditing, handleEdit, handleCancel } = useEditingContext();
  const imageInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "personalInfo.contact",
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const localImageUrl = URL.createObjectURL(file);
    setValue("personalInfo.imageUrl", localImageUrl);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadToCloud(formData);
      setTimeout(() => {
        setValue("personalInfo.imageUrl", result.adImage);
      }, 10000);
    } catch (error) {
      console.error("Failed to upload image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerImageUpload = () => {
    imageInputRef.current?.click();
  };
  const defaultContacts = [
    { id: "phoneNumber", value: "", label: t("Phone Number") },
    { id: "email", value: "", label: t("Email") },
  ];
  const contactFields =
    fields.length < 2
      ? [...fields, ...defaultContacts.slice(fields.length)]
      : fields;

  return (
    <Card className="overflow-hidden transition-all duration-300 ease-in-out">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
        <div className="flex flex-row items-center justify-end space-y-0 pb-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={isEditing ? handleCancel : handleEdit}
            className="bg-secondary hover:bg-transparent hover:text-secondary transition-colors duration-200"
          >
            {isEditing ? (
              <X className="h-4 w-4 mx-2" />
            ) : (
              <Edit className="h-4 w-4 mx-2" />
            )}
            {isEditing ? t("cancel") : t("buttons.editProfile")}
          </Button>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 gap-4 space-x-8 mt-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Controller
              name="personalInfo.imageUrl"
              control={control}
              render={({ field }) => (
                <>
                  <img
                    src={field.value || "/placeholder.svg"}
                    alt={"Profile"}
                    className="w-full h-full object-cover"
                  />
                  {isEditing && (
                    <Button
                      className="h-full absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:opacity-100 transition-opacity"
                      type="button"
                      onClick={triggerImageUpload}
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <Spinner />
                      ) : (
                        <UploadCloud className="size-6 mx-2" />
                      )}
                    </Button>
                  )}
                </>
              )}
            />
            <Input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <div className="space-y-2 text-center md:text-left">
            <Controller
              name="personalInfo.name"
              control={control}
              rules={{ required: t("Name is required") }}
              render={({ field }) =>
                isEditing ? (
                  <Input
                    {...field}
                    placeholder={t("Your Name")}
                    className="text-3xl font-bold bg-white/20 border-white/40 text-white placeholder-white/60"
                  />
                ) : (
                  <h2 className="text-3xl font-bold text-white">
                    {field.value}
                  </h2>
                )
              }
            />
            <Controller
              name="personalInfo.jobTitle"
              control={control}
              rules={{ required: t("Job title is required") }}
              render={({ field }) =>
                isEditing ? (
                  <Input
                    {...field}
                    placeholder={t("Job Title")}
                    className="text-xl bg-white/20 border-white/40 text-white placeholder-white/60"
                  />
                ) : (
                  <p className="text-xl text-white/90">{field.value}</p>
                )
              }
            />
          </div>
        </div>
      </div>
      <CardContent className="space-y-6 mt-6 transition-all duration-300 ease-in-out">
        <div>
          <Label className="text-lg font-semibold">
            {t("personalInfo.summary")}
          </Label>
          <Controller
            name="personalInfo.summary"
            control={control}
            rules={{ required: t("Summary is required") }}
            render={({ field }) =>
              isEditing ? (
                <Textarea
                  {...field}
                  placeholder={t("A brief summary about yourself")}
                  className="mt-2"
                  rows={4}
                />
              ) : (
                <p className="mt-2 text-muted-foreground">{field.value}</p>
              )
            }
          />
        </div>
        <div>
          <Label className="text-lg font-semibold">
            {t("personalInfo.contacts")}
          </Label>
          <div className="space-y-2 mt-2">
            <div className="flex flex-wrap items-center gap-2">
              {isEditing
                ? fields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-2">
                      <Controller
                        name={`personalInfo.contact.${index}`}
                        control={control}
                        rules={{ required: t("Contact is required") }}
                        render={({ field: contactField }) => (
                          <Input
                            {...contactField}
                            placeholder={
                              index === 0
                                ? t("personalInfo.phonePlaceholder")
                                : index === 1
                                ? t("personalInfo.emailPlaceholder")
                                : t("personalInfo.contactPlaceholder")
                            }
                            className="flex-grow"
                          />
                        )}
                      />
                      {index > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))
                : contacts.map((contact) => (
                    <Badge
                      key={contact}
                      variant="secondary"
                      className="text-sm py-2 px-3"
                    >
                      <>
                        {contact.includes("@") ? (
                          <Mail className="h-3 w-3 mx-2" />
                        ) : contact.startsWith("+") || /\d/.test(contact) ? (
                          <Phone className="h-3 w-3 mx-2" />
                        ) : (
                          <Globe className="h-3 w-3 mx-2" />
                        )}
                        {contact}
                      </>
                    </Badge>
                  ))}
            </div>
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append("")}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mx-2" />
                {t("Add Contact")}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ExperienceSection({ t, control, errors }) {
  const { isEditing } = useEditingContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  return (
    <Card className="border-t-4 border-t-blue-500 transition-all duration-300 ease-in-out">
      <SectionHeader icon={Briefcase} title={t("workExperience.title")} />
      <CardContent className="space-y-6">
        {fields.map((field, index) => (
          <Card key={field.id} className="bg-muted">
            <CardContent className="space-y-4 pt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {t("workExperience.title")} {index + 1}
                </h3>
                {isEditing && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t("workExperience.jobTitle")}</Label>
                  <Controller
                    name={`experiences.${index}.jobTitle`}
                    control={control}
                    rules={{ required: t("Job title is required") }}
                    render={({ field }) =>
                      isEditing ? (
                        <Input {...field} className="mt-1" />
                      ) : (
                        <p className="mt-1 font-medium">{field.value}</p>
                      )
                    }
                  />
                </div>
                <div>
                  <Label>{t("workExperience.company")}</Label>
                  <Controller
                    name={`experiences.${index}.company`}
                    control={control}
                    rules={{ required: t("Company is required") }}
                    render={({ field }) =>
                      isEditing ? (
                        <Input {...field} className="mt-1" />
                      ) : (
                        <p className="mt-1">{field.value}</p>
                      )
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name={`experiences.${index}.startDate`}
                  control={control}
                  rules={{ required: t("Start date is required") }}
                  render={({ field }) => (
                    <DatePicker
                      label={t("workExperience.startDate")}
                      value={field.value}
                      onChange={field.onChange}
                      isEditing={isEditing}
                    />
                  )}
                />
                <Controller
                  name={`experiences.${index}.endDate`}
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label={t("workExperience.endDate")}
                      value={field.value}
                      onChange={field.onChange}
                      isEditing={isEditing}
                    />
                  )}
                />
              </div>

              <div>
                <Label>{t("workExperience.responsibilities")}</Label>
                <Controller
                  name={`experiences.${index}.responsibilities`}
                  control={control}
                  render={({ field }) =>
                    isEditing ? (
                      <Textarea {...field} rows={4} className="mt-1" />
                    ) : (
                      <p className="mt-1 text-muted-foreground">
                        {field.value}
                      </p>
                    )
                  }
                />
              </div>
            </CardContent>
          </Card>
        ))}
        {isEditing && (
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                jobTitle: "",
                company: "",
                startDate: "",
                endDate: "",
                responsibilities: "",
              })
            }
          >
            <Plus className="h-4 w-4 mx-2" />
            {t("Add Experience")}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function EducationSection({ t, control, errors, setValue }) {
  const { isEditing } = useEditingContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  const educations = useWatch({
    control,
    name: "educations",
  });

  const handleGpaTypeChange = (index, value) => {
    // Update the GPA type
    setValue(`educations.${index}.gpaType`, value);

    if (value === "outOf4" || value === "outOf5") {
      // Set descriptive GPA to the selected scale
      setValue(`educations.${index}.descriptiveGpa`, value);
      // Clear numeric GPA
      setValue(`educations.${index}.numericGpa`, "");
    } else if (value === "percentage") {
      // Clear descriptive GPA
      setValue(`educations.${index}.descriptiveGpa`, "");
    } else {
      // For "none", clear both
      setValue(`educations.${index}.numericGpa`, "");
      setValue(`educations.${index}.descriptiveGpa`, "");
    }
  };

  const renderGpaInput = (index, gpaType) => {
    if (!isEditing && gpaType === "none") return null;

    if (gpaType === "percentage") {
      return (
        <div>
          <Label>{t("education.gpaPercentage")}</Label>
          <Controller
            name={`educations.${index}.numericGpa`}
            control={control}
            rules={{
              required: t("numeric_gpa_required"),
              min: 0,
              max: 100,
            }}
            render={({ field }) =>
              isEditing ? (
                <div className="relative">
                  <Input
                    {...field}
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    className="mt-1 pr-8"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    %
                  </span>
                </div>
              ) : (
                <p className="mt-1">{field.value}%</p>
              )
            }
          />
        </div>
      );
    }

    if (gpaType === "descriptive") {
      return (
        <div>
          <Label>
            {t(
              educations[index]?.descriptiveGpa === "outOf4"
                ? "education.gpaOutOf4"
                : "education.gpaOutOf5",
            )}
          </Label>
          <Controller
            name={`educations.${index}.numericGpa`}
            control={control}
            rules={{
              required: t("descriptive_gpa_required"),
              min: 0,
              max: educations[index]?.descriptiveGpa === "outOf4" ? 4 : 5,
              validate: (value) =>
                !value ||
                (value >= 0 &&
                  value <=
                    (educations[index]?.descriptiveGpa === "outOf4" ? 4 : 5)),
            }}
            render={({ field }) =>
              isEditing ? (
                <Input
                  {...field}
                  type="number"
                  step="0.01"
                  min="0"
                  max={educations[index]?.descriptiveGpa === "outOf4" ? 4 : 5}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1">
                  {field.value} /{" "}
                  {educations[index]?.descriptiveGpa === "outOf4"
                    ? "4.0"
                    : "5.0"}
                </p>
              )
            }
          />
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="border-t-4 border-t-purple-500 transition-all duration-300 ease-in-out">
      <SectionHeader icon={GraduationCap} title={t("education.title")} />
      <CardContent className="space-y-6">
        {fields.map((field, index) => {
          const currentGpaType = educations?.[index]?.gpaType;

          return (
            <Card key={field.id} className="bg-muted">
              <CardContent className="space-y-4 pt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    {t("education.title")} {index + 1}
                  </h3>
                  {isEditing && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{t("education.degree")}</Label>
                    <Controller
                      name={`educations.${index}.degree`}
                      control={control}
                      rules={{ required: t("degree_required") }}
                      render={({ field }) =>
                        isEditing ? (
                          <Input {...field} className="mt-1" />
                        ) : (
                          <p className="mt-1 font-medium">{field.value}</p>
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>{t("institution")}</Label>
                    <Controller
                      name={`educations.${index}.institution`}
                      control={control}
                      rules={{ required: t("institution_required") }}
                      render={({ field }) =>
                        isEditing ? (
                          <Input {...field} className="mt-1" />
                        ) : (
                          <p className="mt-1">{field.value}</p>
                        )
                      }
                    />
                  </div>
                </div>

                <Controller
                  name={`educations.${index}.graduationDate`}
                  control={control}
                  rules={{ required: t("education.graduation_date") }}
                  render={({ field }) => (
                    <DatePicker
                      label={t("education.graduationDate")}
                      value={field.value}
                      onChange={field.onChange}
                      isEditing={isEditing}
                    />
                  )}
                />

                <div className="space-y-2">
                  <Label>
                    {t("education.GPA")} ({t("education.optional")})
                  </Label>
                  {isEditing ? (
                    <Controller
                      name={`educations.${index}.gpaType`}
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          className="flex gap-4 flex-wrap"
                          value={field.value}
                          onValueChange={(value) =>
                            handleGpaTypeChange(index, value)
                          }
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem
                              value="none"
                              id={`gpa-none-${index}`}
                            />
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
                            <RadioGroupItem
                              value="outOf4"
                              id={`gpa-outOf4-${index}`}
                            />
                            <Label htmlFor={`gpa-outOf4-${index}`}>
                              {t("education.gpaOutOf4")}
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem
                              value="outOf5"
                              id={`gpa-outOf5-${index}`}
                            />
                            <Label htmlFor={`gpa-outOf5-${index}`}>
                              {t("education.gpaOutOf5")}
                            </Label>
                          </div>
                        </RadioGroup>
                      )}
                    />
                  ) : (
                    currentGpaType !== "none" && (
                      <p className="mt-1">
                        {t(`education.${currentGpaType}Gpa`)}
                      </p>
                    )
                  )}
                </div>

                {renderGpaInput(index, currentGpaType)}
              </CardContent>
            </Card>
          );
        })}

        {isEditing && (
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
            className="w-full"
          >
            <Plus className="w-4 h-4 mx-2" />
            {t("education.add_education")}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
const skillLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "skillful", label: "Skillful" },
  { value: "experienced", label: "Experienced" },
  { value: "expert", label: "Expert" },
];
function SkillsSection({ t, control, errors }) {
  const { isEditing } = useEditingContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredSkills = allSkills.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddSkill = (skillName) => {
    if (!fields.some((field) => field.name === skillName)) {
      append({ name: skillName, level: "beginner" });
      setSearchTerm("");
      setIsDropdownOpen(false);
    }
  };

  return (
    <Card className="w-full border-t-4 border-t-emerald-500 transition-all duration-300 ease-in-out">
      <SectionHeader icon={Code} title={t("skills.title")} />
      <CardContent className="space-y-4">
        {isEditing && (
          <div className="space-y-2">
            <Label htmlFor="skill-search">{t("skills.addSkill")}</Label>
            <div className="relative">
              <Input
                type="text"
                id="skill-search"
                className="w-full"
                placeholder={t("skills.selectOrTypeSkill")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                autoComplete="off"
              />
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredSkills.map((skill) => (
                    <div
                      key={skill}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        fields.some((f) => f.name === skill)
                          ? "bg-gray-100"
                          : ""
                      }`}
                      onClick={() => handleAddSkill(skill)}
                    >
                      {t(`skills.availableSkills.${skill}`) || skill}
                    </div>
                  ))}
                  {searchTerm && !filteredSkills.includes(searchTerm) && (
                    <div
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleAddSkill(searchTerm)}
                    >
                      {t("skills.addSkill")} "{searchTerm}"{" "}
                      {t("skills.as_new_skill")}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-wrap">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className={`flex w-full items-center justify-between gap-1 p-1 ${
                isEditing ? "bg-gray-50 rounded-lg" : ""
              }`}
            >
              {isEditing ? (
                <>
                  <div className="font-medium min-w-[120px]">{field.name}</div>
                  <Controller
                    name={`skills.${index}.level`}
                    control={control}
                    render={({ field: levelField }) => (
                      <Select
                        value={levelField.value}
                        onValueChange={levelField.onChange}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder={t("skills.skillLevel")} />
                        </SelectTrigger>
                        <SelectContent>
                          {skillLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {t(`skills.${level.label.toLowerCase()}`)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Badge variant="outline" className="text-sm">
                  {field.name} - {field.level}
                </Badge>
              )}
            </div>
          ))}
          {fields.length === 0 && (
            <div className="text-gray-500">{t("skills.noSkillsSelected")}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function LanguagesSection({ t, control, errors }) {
  const { isEditing } = useEditingContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  return (
    <Card className="w-full border-t-4 border-t-yellow-500 transition-all duration-300 ease-in-out">
      <SectionHeader icon={LanguagesIcon} title={t("languages.title")} />
      <CardContent>
        <div className="flex flex-wrap items-center gap-2">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="w-full justify-between flex items-center gap-2"
            >
              {isEditing ? (
                <>
                  <Controller
                    name={`languages.${index}.name`}
                    control={control}
                    rules={{ required: t("languages.languageNameRequired") }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder={t("languages.language")}
                        className="flex-grow"
                      />
                    )}
                  />
                  <Controller
                    name={`languages.${index}.proficiency`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue
                            placeholder={t("languages.selectProficiency")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">
                            {t("languages.Beginner")}
                          </SelectItem>
                          <SelectItem value="intermediate">
                            {t("languages.Intermediate")}
                          </SelectItem>
                          <SelectItem value="advanced">
                            {t("languages.Advanced")}
                          </SelectItem>
                          <SelectItem value="native">
                            {t("languages.Native")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Badge variant="secondary" className="text-sm">
                  {field.name} - {field.proficiency}
                </Badge>
              )}
            </div>
          ))}
          {isEditing && (
            <Button
              type="button"
              onClick={() => append({ name: "", proficiency: "beginner" })}
              className="w-full"
            >
              <Plus className="w-4 h-4 mx-2" />
              {t("reviewResume.addLanguage")}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function CoursesSection({ t, control, errors }) {
  const { isEditing } = useEditingContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });

  return (
    <Card className="border-t-4 border-t-orange-500 transition-all duration-300 ease-in-out">
      <SectionHeader icon={Book} title={t("courses.title")} />
      <CardContent className="space-y-6">
        {fields.map((field, index) => (
          <Card key={field.id} className="bg-muted">
            <CardContent className="space-y-4 pt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {t("courses.title")} {index + 1}
                </h3>
                {isEditing && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t("reviewResume.courseName")}</Label>
                  <Controller
                    name={`courses.${index}.name`}
                    control={control}
                    rules={{ required: t("reviewResume.courseNameRequired") }}
                    render={({ field }) =>
                      isEditing ? (
                        <Input {...field} className="mt-1" />
                      ) : (
                        <p className="mt-1 font-medium">{field.value}</p>
                      )
                    }
                  />
                </div>
                <div>
                  <Label>{t("reviewResume.institution")}</Label>
                  <Controller
                    name={`courses.${index}.institution`}
                    control={control}
                    rules={{ required: t("reviewResume.institutionRequired") }}
                    render={({ field }) =>
                      isEditing ? (
                        <Input {...field} className="mt-1" />
                      ) : (
                        <p className="mt-1">{field.value}</p>
                      )
                    }
                  />
                </div>
              </div>

              <Controller
                name={`courses.${index}.completionDate`}
                control={control}
                rules={{ required: t("reviewResume.completionDateRequired") }}
                render={({ field }) => (
                  <DatePicker
                    label={t("reviewResume.completionDate")}
                    value={field.value}
                    onChange={field.onChange}
                    isEditing={isEditing}
                  />
                )}
              />
            </CardContent>
          </Card>
        ))}

        {isEditing && (
          <Button
            type="button"
            onClick={() =>
              append({
                name: "",
                institution: "",
                completionDate: "",
              })
            }
            className="w-full"
          >
            <Plus className="w-4 h-4 mx-2" />
            {t("reviewResume.addCourse")}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
