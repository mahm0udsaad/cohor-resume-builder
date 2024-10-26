"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  GraduationCap,
  Code,
  Languages,
  CheckCircle,
} from "lucide-react";
import { useResumeData } from "@/hooks/use-resume-data";
import { Button } from "@/components/ui/button";
import PersonalInfoForm from "@/components/onboarding-forms/personal-info-form";
import ExperienceForm from "@/components/onboarding-forms/experience-form";
import EducationForm from "@/components/onboarding-forms/education-form";
import SkillsForm from "@/components/onboarding-forms/skills-form";
import ReviewForm from "@/components/forms/review-form";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { saveOnboardingData } from "@/actions/userInfo/action";
import { useToast } from "@/hooks/use-toast";
import RedirectingCard from "./redirecting-card";
import { useTranslation } from "@/app/i18n/client";

const OnboardingFlow = ({ lng }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { resumeData, updateResumeData, updateImageUrl } = useResumeData();
  const { t } = useTranslation(lng, "forms");
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  // Define steps outside the component
  const steps = [
    {
      title: t("personalInfo.title"),
      icon: User,
      component: () => (
        <PersonalInfoForm
          lng={lng}
          data={resumeData.personalInfo}
          updateData={updateResumeData}
          updateImageUrl={updateImageUrl}
        />
      ),
    },
    {
      title: t("workExperience.title"),
      icon: Briefcase,
      component: () => (
        <ExperienceForm
          lng={lng}
          experiences={resumeData.experiences}
          updateData={updateResumeData}
        />
      ),
    },
    {
      title: t("education.title"),
      icon: GraduationCap,
      component: () => (
        <EducationForm
          lng={lng}
          educations={resumeData.educations}
          updateData={updateResumeData}
        />
      ),
    },
    {
      title: t("skills.title"),
      icon: Code,
      component: () => (
        <SkillsForm
          lng={lng}
          skills={resumeData.skills}
          updateData={updateResumeData}
        />
      ),
    },
    {
      title: "Languages & Courses",
      icon: Languages,
      component: () => (
        <ReviewForm
          lng={lng}
          resumeData={resumeData}
          updateData={updateResumeData}
          theme={null}
          resumeName="onboarding"
        />
      ),
    },
  ];
  // Extract CurrentIcon and CurrentStepComponent
  const CurrentIcon = steps[currentStep].icon;
  const CurrentStepComponent = steps[currentStep].component;

  const progressPercentage = Math.round(
    ((currentStep + 1) / steps.length) * 100,
  );

  const goToNextStep = () =>
    currentStep < steps.length - 1 && setCurrentStep(currentStep + 1);
  const goToPreviousStep = () =>
    currentStep > 0 && setCurrentStep(currentStep - 1);

  // handleComplete function
  const handleComplete = async () => {
    if (!session?.user?.email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User not found",
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await saveOnboardingData(session.user.email, resumeData);
      if (result.success) {
        setIsCompleted(true);
        sessionStorage.removeItem("resumeData");
        router.push("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error || "Failed to save",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while saving your profile",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-6xl h-[calc(100vh-2rem)] bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        {/* Left Column - Steps and Progress */}
        <div className="w-1/3 bg-gray-50 p-6 flex flex-col">
          <h1 className="text-2xl font-bold text-[#3b51a3] mb-2">
            {t("onboarding.title")}
          </h1>
          <p className="text-sm text-gray-700 mb-6">
            {t("onboarding.subtitle")}
          </p>

          <div className="flex-grow overflow-y-auto pr-4">
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
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Step {index + 1} of {steps.length}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div className="text-sm font-semibold text-[#3b51a3] mb-1">
              {progressPercentage}% {t("buttons.complete")}
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

        {/* Right Column - Form */}
        <div className="w-2/3 p-3 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="flex-grow  bg-white rounded-2xl shadow-md overflow-auto notfs flex flex-col"
              >
                <div className="bg-[#3b51a3] p-4 flex items-center justify-between">
                  <h2 className="text-white text-xl font-bold">
                    {steps[currentStep].title}
                  </h2>
                  <div className="bg-white rounded-full p-2">
                    {currentStep === 0 && resumeData.personalInfo.imageUrl ? (
                      <Image
                        src={resumeData.personalInfo.imageUrl}
                        width={35}
                        height={35}
                      />
                    ) : (
                      <CurrentIcon className="w-6 h-6 text-[#3b51a3]" />
                    )}
                  </div>
                </div>
                <div className="p-2 flex-grow flex flex-col justify-between">
                  <CurrentStepComponent />
                  <div className="flex justify-between mt-8">
                    <Button
                      onClick={goToPreviousStep}
                      disabled={currentStep === 0}
                      className="bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100"
                    >
                      {t("buttons.previous")}
                    </Button>
                    <Button
                      disabled={isSubmitting}
                      onClick={
                        currentStep === steps.length - 1
                          ? handleComplete
                          : goToNextStep
                      }
                      className="bg-[#3b51a3] text-white hover:bg-[#2c3e7a]"
                    >
                      {currentStep === steps.length - 1
                        ? t("buttons.complete")
                        : t("buttons.next")}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center">
                <RedirectingCard />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
