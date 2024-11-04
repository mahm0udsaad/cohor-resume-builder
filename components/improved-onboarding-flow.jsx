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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const steps = [
  { title: "personalInfo.title", icon: User },
  { title: "workExperience.title", icon: Briefcase },
  { title: "education.title", icon: GraduationCap },
  { title: "skills.title", icon: Code },
  { title: "languages.title", icon: Languages },
  { title: "courses.title", icon: Award },
];

export default function OnboardingFlow({ lng }) {
  const { t } = useTranslation(lng, "forms");
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
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
  const { data: session } = useSession();
  const user = session?.user;
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
      console.log("Complete user data:", updatedFormData);
      // Here you would typically send the data to your backend
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
    <div className="h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-6xl h-[calc(100vh-2rem)] bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        {/* Left Column - Timeline and Information */}
        <div className="w-1/3 bg-gray-50 p-6 flex flex-col">
          <h1 className="text-2xl font-bold text-[#3b51a3] mb-2">
            {t("onboarding.title")}
          </h1>
          <p className="text-sm text-gray-700 mb-6">
            {t("onboarding.subtitle")}
          </p>

          <div className="flex-grow overflow-y-auto px-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start mb-6">
                <div className="flex flex-col items-center mx-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === currentStep
                        ? "bg-[#3b51a3] text-white"
                        : index < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
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
                  <p className="text-sm text-gray-500">
                    {t("step", { number: index + 1, total: steps.length })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div className="text-sm font-semibold text-[#3b51a3] mb-1">
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
        <div className="w-2/3 p-6 flex flex-col">
          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-grow bg-white rounded-2xl shadow-md overflow-hidden flex flex-col overflow-y-auto notfs"
              >
                <div className="bg-[#3b51a3] p-4 flex items-center justify-between">
                  <h2 className="text-white text-xl font-bold">
                    {t(steps[currentStep]?.title)}
                  </h2>
                  <div className="bg-white rounded-full p-2">
                    <CurrentIcon className="w-6 h-6 text-[#3b51a3]" />
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col h-full"
                >
                  <div className="p-6 flex-grow">
                    {currentStep === 0 && (
                      <PersonalInfoForm
                        control={control}
                        errors={errors}
                        t={t}
                        lng={lng}
                      />
                    )}
                    {currentStep === 1 && (
                      <WorkExperienceForm
                        control={control}
                        errors={errors}
                        t={t}
                        lng={lng}
                      />
                    )}
                    {currentStep === 2 && (
                      <EducationForm
                        control={control}
                        errors={errors}
                        t={t}
                        lng={lng}
                      />
                    )}
                    {currentStep === 3 && (
                      <SkillsForm
                        control={control}
                        errors={errors}
                        t={t}
                        lng={lng}
                      />
                    )}
                    {currentStep === 4 && (
                      <LanguagesForm
                        control={control}
                        errors={errors}
                        t={t}
                        lng={lng}
                      />
                    )}
                    {currentStep === 5 && (
                      <CoursesForm
                        control={control}
                        errors={errors}
                        t={t}
                        lng={lng}
                      />
                    )}
                  </div>
                  <div className="p-4 bg-white border-t flex justify-between mt-auto sticky bottom-0">
                    <button
                      type="button"
                      onClick={goToPreviousStep}
                      disabled={currentStep === 0}
                      className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 ${
                        currentStep === 0
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {t("buttons.previous")}
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 ${
                        isSubmitting
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-[#3b51a3] text-white hover:bg-[#2c3e7a]"
                      }`}
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : currentStep === steps.length - 1 ? (
                        t("buttons.Complete")
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
                className="flex-grow bg-white rounded-2xl shadow-md overflow-hidden flex items-center justify-center"
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
                    className="mb-4"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-[#3b51a3] mb-2">
                    {t("successTitle")}
                  </h2>
                  <p className="text-lg text-gray-700 mb-4">
                    {isRedirecting ? t("redirecting") : t("preparingDashboard")}
                  </p>
                  {isRedirecting && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Loader2 className="w-6 h-6 text-[#3b51a3]" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
