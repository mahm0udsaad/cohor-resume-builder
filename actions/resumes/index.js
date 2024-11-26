"use server";

import { parseDate } from "@/helper/date";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getUserWithDetails } from "../userInfo/action";
import { checkSubscriptionStatus } from "@/actions/subscriptions";
export async function getUserPlanTemplates(planName) {
  try {
    const userPlan = await prisma.plan.findUnique({
      where: {
        name: planName || "free",
      },
      select: {
        templates: true,
      },
    });
    return userPlan?.templates || [];
  } catch (error) {
    console.error("Error fetching user plan templates:", error);
    return [];
  }
}
export async function addResumeToUser(email, resumeName) {
  try {
    console.log("Adding resume:", email, resumeName);

    // Fetch the user's details, including their existing resumes
    const {
      user,
      personalInfo,
      experiences,
      educations,
      skills,
      languages,
      courses,
      resumes,
    } = await getUserWithDetails(email);

    // Check if the user already has a resume with the given name
    const existingResume = resumes.find((resume) => resume.name === resumeName);
    if (existingResume) {
      return { success: true, resume: existingResume };
    }

    // Create a new resume with the user's initial data
    const newResume = await prisma.resume.create({
      data: {
        name: resumeName,
        userId: user.id,
        personalInfo: {
          name: personalInfo?.name,
          jobTitle: personalInfo?.jobTitle,
          imageUrl: personalInfo?.imageUrl,
          phoneNumber: personalInfo?.phoneNumber,
          summary: personalInfo?.summary,
          contact: personalInfo?.contact || [],
        },
        experiences: experiences.map((exp) => ({
          jobTitle: exp.jobTitle,
          company: exp.company,
          startDate: exp.startDate,
          endDate: exp.endDate,
          responsibilities: exp.responsibilities,
        })),
        educations: educations.map((edu) => ({
          degree: edu.degree,
          institution: edu.institution,
          graduationDate: edu.graduationDate,
          gpaType: edu.gpaType,
          numericGpa: edu.numericGpa,
          descriptiveGpa: edu.descriptiveGpa,
        })),
        skills: skills.map((skill) => ({
          name: skill.name,
          level: skill.level,
        })),
        languages: languages.map((lang) => ({
          name: lang.name,
          proficiency: lang.proficiency,
        })),
        courses: courses.map((course) => ({
          name: course.name,
          institution: course.institution,
          completionDate: course.completionDate,
        })),
      },
    });

    return { success: true, resume: newResume };
  } catch (error) {
    console.error("Error adding resume:", error);
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}
export async function getUserResumes(email) {
  try {
    // First, let's verify we can find the user
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    const resumes = await prisma.resume.findMany({
      where: {
        userId: userExists.id,
      },
    });

    return resumes || [];
  } catch (error) {
    console.error("Error getting user resumes:", error);
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}
export async function getResume(email, resumeName) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const resume = await prisma.resume.findFirst({
      where: { userId: user.id, name: resumeName },
    });

    if (!resume) {
      return { success: false, error: "Resume not found" };
    }

    return { user: user, success: true, resume: resume };
  } catch (error) {
    console.error("Error getting resume:", error);
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}
export async function deleteResume(resumeId, email) {
  try {
    if (!resumeId || !email) {
      return { success: false, error: "Invalid form data" };
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { resumes: true },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const resumeToDelete = user.resumes.find(
      (resume) => resume.id === resumeId,
    );

    if (!resumeToDelete) {
      return { success: false, error: "Resume not found for this user" };
    }

    const deletedResume = await prisma.resume.delete({
      where: { id: resumeId },
    });

    return { success: true, deletedResume };
  } catch (error) {
    console.error("Error deleting resume:", error);
    return { success: false, error: error.message };
  } finally {
    revalidatePath("/dashboard");
    await prisma.$disconnect();
  }
}
// Validation helper
const validateResumeData = (data) => {
  if (!data) throw new Error("Resume data is required");
  console.log(data);

  // Validate experiences
  if (
    data.experiences?.some((exp) => exp.startDate && !parseDate(exp.startDate))
  ) {
    throw new Error("Invalid experience start date format");
  }

  data.experiences?.forEach((exp) => {
    if (!exp.isCurrentJob && !exp.endDate) {
      throw new Error("End date is required for past work experience");
    }
  });

  // Validate educations
  if (
    data.educations?.some(
      (edu) => edu.graduationDate && !parseDate(edu.graduationDate),
    )
  ) {
    throw new Error("Invalid graduation date format");
  }

  // Validate courses
  if (
    data.courses?.some(
      (course) => course.completionDate && !parseDate(course.completionDate),
    )
  ) {
    throw new Error("Invalid course completion date format");
  }
};
// Format resume data helper
const formatResumeData = (data) => {
  return {
    ...data,
    experiences: data.experiences?.map((experience) => ({
      ...experience,
      startDate: parseDate(experience.startDate),
      endDate: experience.isCurrentJob ? null : parseDate(experience.endDate),
      // Ensure isCurrentJob is a boolean
      isCurrentJob: Boolean(experience.isCurrentJob),
    })),
    educations: data.educations?.map((education) => ({
      ...education,
      graduationDate: parseDate(education.graduationDate),
      gpaType: education.gpaType || "none",
      numericGpa:
        education.gpaType === "none" ? null : parseFloat(education.numericGpa),
    })),
    courses: data.courses?.map((course) => ({
      ...course,
      completionDate: parseDate(course.completionDate),
    })),
  };
};
export const updateUserResumeData = async (
  userEmail,
  resumeName,
  updatedResumeData,
) => {
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 500;
  const subscriptionCheck = await checkSubscriptionStatus(userEmail);
  if (!subscriptionCheck.success) {
    return {
      success: false,
      error: subscriptionCheck.error,
      isSubscriptionError: true,
    };
  }
  const isRetryableError = (error) => {
    // Generic error detection strategy
    const retryableErrorPatterns = [
      "database is locked",
      "write conflict",
      "transaction",
      "connection",
      "timeout",
      "busy",
      "ECONNRESET",
      "already closed",
      "could not perform operation",
    ];

    const errorMessage = error.message.toLowerCase();

    return retryableErrorPatterns.some((pattern) =>
      errorMessage.includes(pattern),
    );
  };

  const getErrorType = (error) => {
    // Comprehensive error type detection
    if (error.name === "PrismaClientKnownRequestError") {
      return "Prisma Known Request Error";
    }

    if (error.name === "PrismaClientUnknownRequestError") {
      return "Prisma Unknown Request Error";
    }

    if (error.name === "PrismaClientInitializationError") {
      return "Prisma Initialization Error";
    }

    if (error.name === "PrismaClientValidationError") {
      return "Prisma Validation Error";
    }

    return "Unknown Error";
  };

  let lastError = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      // Input validation
      if (!userEmail) throw new Error("User email is required");
      if (!resumeName) throw new Error("Resume name is required");
      validateResumeData(updatedResumeData);

      // Format data upfront
      const formattedResumeData = formatResumeData(updatedResumeData);
      const themeData = updatedResumeData.theme;

      // Perform transaction
      const resume = await prisma.$transaction(
        async (prismaTransaction) => {
          // Get user in the transaction
          const user = await prismaTransaction.user.findUnique({
            where: { email: userEmail },
            select: { id: true },
          });

          if (!user) throw new Error("User not found");

          // Delete existing resume
          await prismaTransaction.resume.deleteMany({
            where: {
              userId: user.id,
              name: resumeName,
            },
          });

          // Create new resume
          return await prismaTransaction.resume.create({
            data: {
              name: resumeName,
              userId: user.id,
              ...formattedResumeData,
              theme: themeData,
              modifiedAt: new Date(),
            },
            include: {
              personalInfo: true,
              experiences: true,
              educations: true,
              skills: true,
              languages: true,
              courses: true,
              theme: true,
            },
          });
        },
        {
          maxWait: 10000, // 10 seconds
          timeout: 15000, // 15 seconds
        },
      );

      // Revalidate path after successful transaction
      revalidatePath("/dashboard");

      return {
        success: true,
        resume,
      };
    } catch (error) {
      // Enhanced error logging
      const errorType = getErrorType(error);
      const isRetryable = isRetryableError(error);

      console.error(`Resume update attempt ${attempt} failed:`, {
        message: error.message,
        name: error.name,
        type: errorType,
        isRetryable,
        stack: error.stack,
      });

      lastError = error;

      // Retry logic
      if (isRetryable && attempt < MAX_RETRIES) {
        // Exponential backoff with jitter
        const jitter = Math.random() * 200;
        const delay = RETRY_DELAY * Math.pow(2, attempt) + jitter;

        console.log(
          `Retrying due to ${errorType}. Attempt ${attempt}. Waiting ${delay}ms`,
        );

        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      // Detailed error response
      return {
        success: false,
        error: error.message || "Failed to update resume data",
        errorType,
        isRetryable,
        details: {
          name: error.name,
          stack: error.stack,
        },
      };
    }
  }

  // Fallback if all attempts fail
  return {
    success: false,
    error: "Maximum retry attempts exceeded",
    details: lastError
      ? {
          message: lastError.message,
          name: lastError.name,
          type: getErrorType(lastError),
        }
      : "Unknown error",
  };
};
export async function saveSkills(userId, skills) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        skills: skills, // Directly set the entire skills array
      },
    });

    revalidatePath("/dashboard");
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Error saving skills:", error);
    return { success: false, error: error.message };
  }
}
