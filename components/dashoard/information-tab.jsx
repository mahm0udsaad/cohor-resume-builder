"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useTransition,
} from "react";
import {
  Briefcase,
  GraduationCap,
  Code,
  Languages as LanguagesIcon,
  Book,
  Edit,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Calendar,
  Save,
  Phone,
  Mail,
  Globe,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useForm,
  useFieldArray,
  Controller,
  FieldValues,
} from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { saveOnboardingData } from "@/actions/userInfo/action";
import { useSession } from "next-auth/react";
import { formatDate } from "@/helper/date";
import { useEditingContext } from "@/context/edit-context";

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

export default function InformationTab({ initialData }) {
  const [userInfo, setUserInfo] = useState(initialData);
  const { isEditing, handleEdit, handleCancel } = useEditingContext();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const user = session?.user || {};
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: userInfo,
  });

  const onSubmit = (data) => {
    startTransition(async () => {
      setUserInfo(data);

      const result = await saveOnboardingData(user.email, data);
      if (result.success) {
        handleCancel();
        toast({
          title: "Profile Updated",
          description: "Your information has been successfully updated.",
          variant: "success",
        });
      } else {
        toast({
          title: "Profile Update Failed",
          description: "Something went wrong. Please try again.",
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
      <div dir="ltr" className="space-y-8">
        <PersonalInfo
          control={control}
          errors={errors}
          contacts={userInfo.personalInfo.contact}
        />
        <ExperienceSection control={control} errors={errors} />
        <EducationSection control={control} errors={errors} />
        <SkillsSection control={control} errors={errors} />
        <LanguagesSection control={control} errors={errors} />
        <CoursesSection control={control} errors={errors} />
      </div>
      <div className="sticky bottom-0 bg-background border-t border-border p-4 flex justify-between items-center">
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset Changes
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mx-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mx-2 h-4 w-4" />
              Save All Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function PersonalInfo({ control, contacts }) {
  const { isEditing, handleEdit, handleCancel } = useEditingContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "personalInfo.contact",
  });

  return (
    <Card className="overflow-hidden transition-all duration-300 ease-in-out">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 ">
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
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mt-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Controller
              name="personalInfo.imageUrl"
              control={control}
              render={({ field }) => (
                <img
                  src={field.value || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              )}
            />
          </div>
          <div className="space-y-2 text-center md:text-left">
            <Controller
              name="personalInfo.name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) =>
                isEditing ? (
                  <Input
                    {...field}
                    placeholder="Your Name"
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
              rules={{ required: "Job title is required" }}
              render={({ field }) =>
                isEditing ? (
                  <Input
                    {...field}
                    placeholder="Job Title"
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
          <Label className="text-lg font-semibold">Summary</Label>
          <Controller
            name="personalInfo.summary"
            control={control}
            rules={{ required: "Summary is required" }}
            render={({ field }) =>
              isEditing ? (
                <Textarea
                  {...field}
                  placeholder="A brief summary about yourself"
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
          <Label className="text-lg font-semibold">Contacts</Label>
          <div className="space-y-2 mt-2">
            <div className="flex items-center space-x-2">
              {isEditing
                ? fields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-2">
                      <Controller
                        name={`personalInfo.contact.${index}`}
                        control={control}
                        rules={{ required: "Contact is required" }}
                        render={({ field: contactField }) => (
                          <Input
                            {...contactField}
                            placeholder="Contact information"
                            className="flex-grow"
                          />
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
                        ) : contact.startsWith("+") ||
                          contact.match(/^\d{10}$/) ? (
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
                Add Contact
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ExperienceSection({ control, errors }) {
  const { isEditing } = useEditingContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  return (
    <Card className="border-t-4 border-t-blue-500 transition-all duration-300 ease-in-out">
      <SectionHeader icon={Briefcase} title="Work Experience" />
      <CardContent className="space-y-6">
        {fields.map((field, index) => (
          <Card key={field.id} className="bg-muted">
            <CardContent className="space-y-4 pt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  Work Experience {index + 1}
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
                  <Label>Job Title</Label>
                  <Controller
                    name={`experiences.${index}.jobTitle`}
                    control={control}
                    rules={{ required: "Job title is required" }}
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
                  <Label>Company</Label>
                  <Controller
                    name={`experiences.${index}.company`}
                    control={control}
                    rules={{ required: "Company is required" }}
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
                  rules={{ required: "Start date is required" }}
                  render={({ field }) => (
                    <DatePicker
                      label="Start Date"
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
                      label="End Date"
                      value={field.value}
                      onChange={field.onChange}
                      isEditing={isEditing}
                    />
                  )}
                />
              </div>

              <div>
                <Label>Responsibilities</Label>
                <Controller
                  name={`experiences.${index}.responsibilities`}
                  control={control}
                  rules={{ required: "Responsibilities are required" }}
                  render={({ field }) =>
                    isEditing ? (
                      <Textarea {...field} rows={3} className="mt-1" />
                    ) : (
                      <p className="mt-1">{field.value}</p>
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
            onClick={() =>
              append({
                jobTitle: "",
                company: "",
                startDate: "",
                endDate: "",
                responsibilities: "",
              })
            }
            className="w-full"
          >
            <Plus className="w-4 h-4 mx-2" />
            Add Work Experience
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function EducationSection({ control, errors }) {
  const { isEditing } = useEditingContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  return (
    <Card className="border-t-4 border-t-purple-500 transition-all duration-300 ease-in-out">
      <SectionHeader icon={GraduationCap} title="Education" />
      <CardContent className="space-y-6">
        {fields.map((field, index) => (
          <Card key={field.id} className="bg-muted">
            <CardContent className="space-y-4 pt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Education {index + 1}</h3>
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
                  <Label>Degree</Label>
                  <Controller
                    name={`educations.${index}.degree`}
                    control={control}
                    rules={{ required: "Degree is required" }}
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
                  <Label>Institution</Label>
                  <Controller
                    name={`educations.${index}.institution`}
                    control={control}
                    rules={{ required: "Institution is required" }}
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
                rules={{ required: "Graduation date is required" }}
                render={({ field }) => (
                  <DatePicker
                    label="Graduation Date"
                    value={field.value}
                    onChange={field.onChange}
                    isEditing={isEditing}
                  />
                )}
              />

              <div>
                <Label>GPA Type</Label>
                <Controller
                  name={`educations.${index}.gpaType`}
                  control={control}
                  render={({ field }) =>
                    isEditing ? (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select GPA type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="numeric">Numeric</SelectItem>
                          <SelectItem value="descriptive">
                            Descriptive
                          </SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="mt-1 capitalize">{field.value}</p>
                    )
                  }
                />
              </div>

              {field.gpaType === "numeric" && (
                <div>
                  <Label>Numeric GPA</Label>
                  <Controller
                    name={`educations.${index}.numericGpa`}
                    control={control}
                    rules={{ required: "Numeric GPA is required" }}
                    render={({ field }) =>
                      isEditing ? (
                        <Input
                          {...field}
                          type="number"
                          step="0.01"
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1">{field.value}</p>
                      )
                    }
                  />
                </div>
              )}

              {field.gpaType === "descriptive" && (
                <div>
                  <Label>Descriptive GPA</Label>
                  <Controller
                    name={`educations.${index}.descriptiveGpa`}
                    control={control}
                    rules={{ required: "Descriptive GPA is required" }}
                    render={({ field }) =>
                      isEditing ? (
                        <Input {...field} className="mt-1" />
                      ) : (
                        <p className="mt-1">{field.value}</p>
                      )
                    }
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}

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
            Add Education
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function SkillsSection({ control, errors }) {
  const { isEditing } = useEditingContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  return (
    <Card className="border-t-4 border-t-emerald-500 transition-all duration-300 ease-in-out">
      <SectionHeader icon={Code} title="Skills" />
      <CardContent>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <Controller
                    name={`skills.${index}.name`}
                    control={control}
                    rules={{ required: "Skill name is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Skill name"
                        className="flex-grow"
                      />
                    )}
                  />
                  <Controller
                    name={`skills.${index}.level`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Skill level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
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
          {isEditing && (
            <Button
              type="button"
              onClick={() => append({ name: "", level: "beginner" })}
              className="w-full"
            >
              <Plus className="w-4 h-4 mx-2" />
              Add Skill
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function LanguagesSection({ control, errors }) {
  const { isEditing } = useEditingContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  return (
    <Card className="border-t-4 border-t-yellow-500 transition-all duration-300 ease-in-out">
      <SectionHeader icon={LanguagesIcon} title="Languages" />
      <CardContent>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <Controller
                    name={`languages.${index}.name`}
                    control={control}
                    rules={{ required: "Language name is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Language name"
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
                          <SelectValue placeholder="Proficiency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="native">Native</SelectItem>
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
              Add Language
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function CoursesSection({ control, errors }) {
  const { isEditing } = useEditingContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });

  return (
    <Card className="border-t-4 border-t-orange-500 transition-all duration-300 ease-in-out">
      <SectionHeader icon={Book} title="Courses" />
      <CardContent className="space-y-6">
        {fields.map((field, index) => (
          <Card key={field.id} className="bg-muted">
            <CardContent className="space-y-4 pt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Course {index + 1}</h3>
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
                  <Label>Course Name</Label>
                  <Controller
                    name={`courses.${index}.name`}
                    control={control}
                    rules={{ required: "Course name is required" }}
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
                  <Label>Institution</Label>
                  <Controller
                    name={`courses.${index}.institution`}
                    control={control}
                    rules={{ required: "Institution is required" }}
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
                rules={{ required: "Completion date is required" }}
                render={({ field }) => (
                  <DatePicker
                    label="Completion Date"
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
            Add Course
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

const DatePicker = ({ label, value, onChange, isEditing }) => {
  const displayValue = formatDate(value);
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {isEditing ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${
                !value && "text-muted-foreground"
              }`}
            >
              <Calendar className="mx-2 h-4 w-4" />
              {value ? formatDate(value) : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={typeof value === "string" ? parseISO(value) : value}
              onSelect={(date) => onChange(date ? date.toISOString() : "")}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      ) : (
        <p className="mt-1">{displayValue}</p>
      )}
    </div>
  );
};
