"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  Languages,
  Award,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useTranslation } from "@/app/i18n/client";
import PersonalInfoForm from "./onboarding-forms/personal-info-form";
import WorkExperienceForm from "./onboarding-forms/experience-form";
import EducationForm from "./onboarding-forms/education-form";
import SkillsForm from "./onboarding-forms/skills-form";
import LanguagesForm from "./onboarding-forms/language-form";
import CoursesForm from "./onboarding-forms/courses-form";
import {
  completeOnboarding,
  saveOnboardingData,
} from "../actions/userInfo/action";
import { useRouter } from "next/navigation";

const steps = [
  { title: "personalInfo.title", icon: User },
  { title: "workExperience.title", icon: Briefcase },
  { title: "education.title", icon: GraduationCap },
  { title: "skills.title", icon: Code },
  { title: "languages.title", icon: Languages },
  { title: "courses.title", icon: Award },
];

export default function OnboardingFlow({ lng, user }) {
  const { t } = useTranslation(lng, "forms");
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: "",
      jobTitle: "",
      phoneNumber: "",
      summary: "",
      contact: [""],
      imageUrl: "",
    },
    experiences: [
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
      },
    ],
    educations: [
      {
        degree: "",
        institution: "",
        graduationDate: "",
        gpaType: "none",
        numericGpa: "",
        descriptiveGpa: "",
      },
    ],
    skills: [],
    languages: [{ name: "", proficiency: "" }],
    courses: [{ name: "", institution: "", completionDate: "" }],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let updatedFormData = { ...formData };
    switch (currentStep) {
      case 0:
        updatedFormData.personalInfo = data;
        break;
      case 1:
        updatedFormData.experiences = data.experiences;
        break;
      case 2:
        updatedFormData.educations = data.educations;
        break;
      case 3:
        updatedFormData.skills = data.skills;
        break;
      case 4:
        updatedFormData.languages = data.languages;
        break;
      case 5:
        updatedFormData.courses = data.courses;
        break;
    }
    setFormData(updatedFormData);

    if (currentStep < steps.length - 1) {
      goToNextStep();
    } else {
      setIsSubmitting(true);
      const result = await saveOnboardingData(user.email, formData);
      if (result.success) {
        completeOnboarding(user.email);
        setIsSubmitting(false);
        setIsCompleted(true);
      }
      setIsSubmitting(false);
      setIsCompleted(true);
    }
  };

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    if (isCompleted) {
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isCompleted, router]);

  const CurrentIcon = steps[currentStep]?.icon || User;
  const progressPercentage = Math.round(
    ((currentStep + 1) / steps.length) * 100,
  );

  return (
    <div className="sm:h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4 md:p-6 overflow-hidden">
      <div className="w-full max-w-3xl md:max-w-6xl overflow-y-auto h-[calc(100vh-2rem)] bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl sm:overflow-hidden flex flex-col md:flex-row">
        {/* Left Column - Timeline and Information */}
        <div className="w-full md:w-1/3 bg-gray-50 p-4 md:p-6 flex flex-col">
          <h1 className="x text-xl md:text-2xl font-bold text-[#3b51a3] sm:mb-2">
            {t("onboarding.title")}
          </h1>
          <p className="hidden sm:block text-sm text-gray-700 sm:mb-4 md:mb-6">
            {t("onboarding.subtitle")}
          </p>

          <div className="hidden sm:block flex-grow overflow-y-auto px-2 md:px-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex items-start mb-4 md:mb-6">
                <div className="flex flex-col items-center mx-2 md:mx-4">
                  <div
                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                      index === currentStep
                        ? "bg-[#3b51a3] text-white"
                        : index < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <step.icon className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-0.5 h-full ${
                        index < currentStep ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
                <div>
                  <h3
                    className={`font-semibold ${
                      index === currentStep
                        ? "text-[#3b51a3]"
                        : index < currentStep
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  >
                    {t(step.title)}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500">
                    {t("step", { number: index + 1, total: steps.length })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="sm:mt-4">
            <div className=" text-xs md:text-sm font-semibold text-[#3b51a3] mb-1">
              {progressPercentage}% {t("complete")}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <motion.div
                className="h-2 bg-[#3b51a3] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
          </div>
        </div>

        {/* Right Column - Form Display */}
        <div className="w-full md:w-2/3 p-4 md:p-6 flex flex-col">
          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-grow bg-white rounded-lg md:rounded-2xl border overflow-hidden flex flex-col overflow-y-auto"
              >
                <div className="bg-[#3b51a3] p-3 md:p-4 flex items-center justify-between">
                  <h2 className="text-white text-lg md:text-xl font-bold">
                    {t(steps[currentStep]?.title)}
                  </h2>
                  <div className="bg-white rounded-full p-2">
                    <CurrentIcon className="w-5 md:w-6 h-5 md:h-6 text-[#3b51a3]" />
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col h-full"
                >
                  <div className="p-4 md:p-6 flex-grow">
                    {currentStep === 0 && (
                      <PersonalInfoForm
                        t={t}
                        control={control}
                        formData={formData.personalInfo}
                        errors={errors}
                      />
                    )}
                    {currentStep === 1 && (
                      <WorkExperienceForm
                        t={t}
                        control={control}
                        formData={formData.experiences}
                        errors={errors}
                      />
                    )}
                    {currentStep === 2 && (
                      <EducationForm
                        t={t}
                        control={control}
                        formData={formData.educations}
                        errors={errors}
                      />
                    )}
                    {currentStep === 3 && (
                      <SkillsForm
                        t={t}
                        control={control}
                        formData={formData.skills}
                        errors={errors}
                      />
                    )}
                    {currentStep === 4 && (
                      <LanguagesForm
                        t={t}
                        control={control}
                        formData={formData.languages}
                        errors={errors}
                      />
                    )}
                    {currentStep === 5 && (
                      <CoursesForm
                        t={t}
                        control={control}
                        formData={formData.courses}
                        errors={errors}
                      />
                    )}
                  </div>

                  <div className="p-4 md:p-6 border-t flex items-center justify-between">
                    <button
                      type="button"
                      onClick={goToPreviousStep}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-semibold px-4 py-2 rounded-lg disabled:opacity-50"
                      disabled={currentStep === 0}
                    >
                      {t("buttons.previous")}
                    </button>
                    <button
                      type="submit"
                      className="bg-[#3b51a3] hover:bg-[#2c3b87] text-white font-semibold px-4 py-2 rounded-lg"
                    >
                      {isSubmitting ? (
                        <Loader2 className="animate-spin w-5 h-5 text-white" />
                      ) : currentStep === steps.length - 1 ? (
                        t("buttons.complete")
                      ) : (
                        t("buttons.next")
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full bg-white rounded-3xl overflow-hidden"
              >
                <div className="p-8 flex flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                    className="mb-6"
                  >
                    <CheckCircle className="w-20 h-20 text-green-500" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-[#3b51a3] mb-4">
                    {t("notifications.profileUpdate.success.title")}
                  </h2>
                  <p className="text-xl text-gray-700 mb-8">
                    {t("preparingDashboard")}
                  </p>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Loader2 className="w-8 h-8 text-[#3b51a3]" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
